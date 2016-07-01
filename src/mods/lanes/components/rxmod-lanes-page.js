import * as d3 from 'd3.v4.0.0';
import modRefChart from './rxmod-lanes-chart';

// ---------------------------
const src = "../data/messages.csv"


export default function page (elem, props = {}, ownProps = {}) {
		let el = elem
		let elid = (typeof (el) === 'object') ? '#'+ el.id : '#'+ el
	
        var msg_seq = modRefChart().fade(5000);

         d3.select(el)
           .call(msg_seq)

         function delay_add(messages) {
           var msg = messages.shift();
           if (msg) {
             msg_seq.addMessage(msg);
             setTimeout(function() { delay_add(messages)}, 500);
           }
         }
		 
		 var msgs = [
           {from: "customer", to: "barrista1", msg: "place order"},
           {from: "barrista1", to: "register", msg: "enter order"},
           {from: "register", to: "barrista1", msg: "give total"},
           {from: "barrista1", to: "barrista1", msg: "get cup making sure that it is fine for purpose"},
           {from: "barrista1", to: "barrista2", msg: "give cup"},
           {from: "barrista1", to: "customer", msg: "request money"},
           {from: "customer", to: "barrista1", msg: "pay order"},
           {from: "barrista2", to: "barrista2", msg: "get chai mix"},
           {from: "barrista2", to: "barrista2", msg: "add flavor"},
           {from: "barrista2", to: "barrista2", msg: "add milk"},
           {from: "barrista2", to: "barrista2", msg: "add ice"},
           {from: "barrista2", to: "barrista2", msg: "swirl"},
           {from: "barrista2", to: "customer", msg: "give tasty beverage"},
           {from: "customer", to: "tasty beverage", msg: "sip"},
           {from: "tasty beverage", to: "customer", msg: "burn"},
           {from: "customer", to: "customer", msg: "cry"},
           {from: "customer", to: "manager", msg: "complain"},
           {from: "manager", to: "barrista1", msg: "fire"},
           {from: "manager", to: "barrista2", msg: "fire"},
         ];

		if (typeof msgs !== 'undefined' && msgs !== null) {
			 delay_add(msgs);
		} else {
			d3.queue()
				.defer(d3.csv, src, processRecord)
				.await(processData)

			function processRecord(d) {
			  return {
				from: d.from,
				to: d.to,
				msg: d.msg,
			  };
			}
			function processData(error, dataCsv) {
				delay_add(dataCsv);
			}
		}
}




