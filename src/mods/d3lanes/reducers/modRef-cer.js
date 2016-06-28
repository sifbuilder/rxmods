import {ActionTypes as modRefActionTypes,
		ActionCreators as modRefActionCreators} from '../actions';

const initialState = {
  __modRefItems: [{
    text: 'React',
    done: true,
  }, {
    text: 'Redux',
    done: true,
  }],
};

export default function __modRefItems(state = initialState, action) {
  switch (action.type) {
  case modRefActionTypes.ADD_ITEM:
    return {
      ...state,
      __modRefItems: [
        ...state.__modRefItems, {
          text: action.fields.name.value,
        },
      ],
    };

  case modRefActionTypes.DELETE_ITEM:
    return {
      ...state,
      __modRefItems: [
        ...state.__modRefItems.slice(0, action.index),
        ...state.__modRefItems.slice(+action.index + 1),
      ],
    };

  default:
    return state;
  }
}
