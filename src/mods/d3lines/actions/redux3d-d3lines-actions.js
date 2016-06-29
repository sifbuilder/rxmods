import * as ctts from '../constants';
let __modRefCtt = (ctts.default) ? __modRefCtt = ctts.default : __modRefCtt = ctts

export function addItem(fields) {
  return {
    type: __modRefCtt.ADD_ITEM,
    fields,
  };
}

export function delItem(index) {
  return {
    type: __modRefCtt.DELETE_ITEM,
    index,
  };
}
