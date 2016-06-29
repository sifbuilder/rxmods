import * as d3 from 'd3.v4.0.0'

export default function modRefChart() {
  var actor_box_offset = 2,
      fade_time = 2000,
      animation_time = 250;

  var data = [];
  var actor_names = [];
  var update;

  var animation_in_progress,
      update_pending;

  // lots of O(n) here, move to a map at some point
  function remove_free_actors() {
    var busy = data.reduce(function(actors, d) {
      if (actors.indexOf(d.from) < 0)
        actors.push(d.from);

      if (actors.indexOf(d.to) < 0)
        actors.push(d.to);

      return actors;
    }, []);

    actor_names = actor_names.filter(function(a) {
      return busy.indexOf(a) > -1;
    });
  }

  // http://stackoverflow.com/questions/10692100/invoke-a-callback-at-the-end-of-a-transition
  function endall(transition, callback) {
    if (transition.size() === 0) { callback() }
    var n = 0;
    transition
      .each(function() { ++n; })
      .each("end", function() { if (!--n) callback.apply(this, arguments); });
  }

  function chart(selection) {
    selection.each(function() {
		
	  var dom = d3.select(this)	
      var svg = dom.append('svg')  
		.attr("width", "100%")
        .attr("height", "100%")

      svg.append("marker")
        .attr("id", "msg-arrow")
        .attr("viewBox", "0 0 10 10")
        .attr("refX", "10")
        .attr("refY", "5")
        .attr("markerWidth", "5")
        .attr("markerHeight", "4")
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M 0 0 L 10 5 L 0 10 z");

      svg.append("g").classed("actors", true);

      update = function() {
        if (animation_in_progress) {
          update_pending = true;
          return;
        }

        animation_in_progress = true;

        function index_horizontal_center_percent(_d, index) {
          return (index+1) * (100/(actor_names.length+1)) + "%";
        }

        // this could be memoized, if speed became a concern
        function actor_horizontal_center_percent(actor_name) {
          return index_horizontal_center_percent(null, actor_names.indexOf(actor_name));
        }

        function horizontal_center(x1, x2) {
          if (x1 > x2)
            return (x2 - x1)/2 + x1 + "%";
          else
            return (x1 - x2)/2 + x2 + "%";
        }

        function horizontal_percent_to_coord(percent) {
		  if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
				// https://bugzilla.mozilla.org/show_bug.cgi?id=874811 // _e_
				var xScrollWidth = svg[0].parentNode.scrollWidth;
			} else {
				var xScrollWidth = svg.property("scrollWidth");
			}
          //return svg.property("scrollWidth") * Number.parseFloat(percent)/100;
          return xScrollWidth * Number.parseFloat(percent)/100;
        }

        function arc_to_self(d, i) {
          var ry = 20;

          var x_percent = actor_horizontal_center_percent(d.from),
              x = horizontal_percent_to_coord(x_percent),
              y = (i+1)*50 - ry,
              sweep_flag = actor_names.indexOf(d.from) == 0 ? 0 : 1;

          return "M "+ x + " " + y + " " +
                 "a 40 " + ry + " 0 1 " + sweep_flag + " 0 " + ry*2;
        }

        function update_message_elements(messages) {
          messages.select("line")
            .transition()
              .ease(d3.easeLinear)
              .duration(animation_time)
              .attr("x1", function(d) { return actor_horizontal_center_percent(d.from) })
              .attr("y1", function(d, i) { return (i+1)*50 })
              .attr("x2", function(d) { return actor_horizontal_center_percent(d.to) })
              .attr("y2", function(d, i) { return (i+1)*50 });

          messages.select("path")
            .transition()
            .ease(d3.easeLinear)
            .duration(animation_time)
            .attr("d", arc_to_self);

          messages.select("text")
            .transition()
            .ease(d3.easeLinear)
            .duration(animation_time)
            .attr("x", function(d) {
              var x1 = Number.parseFloat(actor_horizontal_center_percent(d.from)),
                  x2 = Number.parseFloat(actor_horizontal_center_percent(d.to));

              return horizontal_center(x1, x2);
            })
            .attr("y", function(d, i) { return (i+1)*50 - 5 });

        }

        var messages = svg.selectAll("g.message").data(data);

        update_message_elements(messages);
        update_message_elements(messages.exit());

        var actors = svg.select("g.actors").selectAll("g.actor").data(actor_names, function(d) { return d });

        actors.exit()
          .transition()
            .ease(d3.easeLinear)
            .duration(animation_time)
            .style("opacity", 0)
            .remove();

        var new_actors = actors.enter().append("g");
        new_actors.classed("actor", true)
          .append("text");

        new_actors.append("line");

        actors.select("text")
          .attr("text-anchor", "middle")
          .attr("alignment-baseline", "middle")
          .style("font-size", function(d, i) { return 1 + 10/(10 + d.length) + "vw" })
          .text(function(d) { return d })
          .attr("dy", "20")
          .transition()
            .ease(d3.easeLinear)
            .duration(animation_time)
            .attr("x", index_horizontal_center_percent);

        actors.select("line")
          .attr("data-actor", function(d) { return d })
          .attr("y1", function(_d, i) {
            var text_bbox = this.parentNode.querySelector("text").getBBox();
            return text_bbox.y + text_bbox.height;
          })
          .attr("y2", "100%")
          .transition()
            .ease(d3.easeLinear)
            .duration(animation_time)
            .attr("x1", index_horizontal_center_percent)
            .attr("x2", index_horizontal_center_percent)
            .call(endall, function() {
              var new_messages = messages.enter().append("g")
                    .classed("message", true);

              // this is a really bootleg approach, but it's necessary to maintain ordering
              new_messages.each(function(d, i) {
                var new_message = d3.select(this);

                if (d.from == d.to) {
                  new_message.append("path")
                    .attr("marker-end", "url(#msg-arrow)")
                    .attr("fill-opacity", 0)
                    .attr("d", function() { return arc_to_self(d, i) });
                }
                else {
                  new_message.append("line")
                    .attr("marker-end", "url(#msg-arrow)")
                    .attr("x1", svg.select("line[data-actor='" + d.from + "']").attr("x1"))
                    .attr("y1", (i+1)*50)
                    .attr("x2", svg.select("line[data-actor='" + d.to + "']").attr("x1"))
                    .attr("y2", (i+1)*50);
                }

                new_message.append("text")
                  .attr("text-anchor", d.from == d.to ? "end" : "middle")
                  .attr("alignment-baseline", d.from == d.to ? "middle" : "auto")
                  .text(d.msg)
                  .attr("x", function() {
                    var x1 = Number.parseFloat(svg.select("line[data-actor='" + d.from + "']").attr("x1")),
                        x2 = Number.parseFloat(svg.select("line[data-actor='" + d.to + "']").attr("x1"));

                    return horizontal_center(x1, x2);
                  })
                  .attr("y", (i+1)*50 - 5);
              });

              if (fade_time > 0) {
                new_messages
                  .transition()
                  .ease(d3.easeLinear)
                  .duration(fade_time)
                  .style("opacity", 0)
                  .remove()
                  .each("end", function() {
                    data.shift();
                    remove_free_actors();
                    update();
                  });
              }

              animation_in_progress = false;
              if (update_pending) {
                update_pending = false;
                update();
              }
            });
      };
    });
  };

  chart.fade = function(time) {
    if (!arguments.length)
      return fade_time;

    fade_time = time;

    return chart;
  };

  chart.addMessage = function(msg) {
    data.push(msg);

    if (actor_names.indexOf(msg.from) < 0)
      actor_names.push(msg.from);

    if (actor_names.indexOf(msg.to) < 0)
      actor_names.push(msg.to);

    update();

    return chart;
  };

  return chart;
}