import * as ctts from '../constants';
let __refModelCtt = (ctts.default) ? __refModelCtt = ctts.default : __refModelCtt = ctts

export function addItem(fields) {
  return {
    type: __refModelCtt.REFMODEL_ADD_ITEM,
    fields,
  };
}

export function delItem(index) {
  return {
    type: __refModelCtt.REFMODEL_DELETE_ITEM,
    index,
  };
}
