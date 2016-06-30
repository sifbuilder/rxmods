/* ---------------------------			*/
/* redux3d-d3circles-actions.js   		*/
/* ---------------------------			*/

import rxmodPackage from '../package.js'
let rxmodPackageName = rxmodPackage.name

// https://github.com/STRML/keyMirror
var keyMirror = function(obj, prefix='') {
  var ret = {};
  var key;
  if (!(obj instanceof Object && !Array.isArray(obj))) {
    throw new Error('keyMirror(...): Argument must be an object.');
  }
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      ret[key] = prefix + key;
    }
  }
  return ret;
};

const actionConstants = {
}

const ActionTypes = keyMirror(actionConstants, '')

const ActionCreators = {
}

export default {ActionTypes, ActionCreators};