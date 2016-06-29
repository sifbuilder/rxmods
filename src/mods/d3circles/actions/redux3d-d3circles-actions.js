import ModPackage from '../package.js'
let modName = ModPackage.name

const ctts = {
}

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
}


export const ActionTypes = keyMirror(ctts, '')

export const ActionCreators = {

};
