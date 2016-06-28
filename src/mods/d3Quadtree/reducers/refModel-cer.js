import * as ctts from '../constants';
let __refModelCtt = (ctts.default) ? __refModelCtt = ctts.default : __refModelCtt = ctts

const initialState = {
  refModelItems: [{
    text: 'React',
    done: true,
  }, {
    text: 'Redux',
    done: true,
  }, {
    text: 'React router',
    done: true,
  }, {
    text: 'Babel 6',
    done: true,
  }, {
    text: 'Bootstrap webpack',
    done: true,
  }, {
    text: 'Sass modules (sass-loader css-loader style-loader)',
    done: true,
  }, {
    text: 'React transform',
    done: true,
  }, {
    text: 'Redux logger',
    done: true,
  }, {
    text: 'React document meta',
    done: true,
  }, {
    text: 'Redux form',
    done: true,
  }, {
    text: 'Redux simple router',
    done: true,
  }, {
    text: 'Karma',
    done: true,
  }, {
    text: 'Mocha',
    done: true,
  }, {
    text: 'Server-side rendering',
    done: false,
  }],
};

export default function refModelItems(state = initialState, action) {
  switch (action.type) {
  case __refModelCtt.REFMODEL_ADD_ITEM:
    return {
      ...state,
      refModelItems: [
        ...state.refModelItems, {
          text: action.fields.name.value,
        },
      ],
    };

  case __refModelCtt.REFMODEL_DELETE_ITEM:
    return {
      ...state,
      refModelItems: [
        ...state.refModelItems.slice(0, action.index),
        ...state.refModelItems.slice(+action.index + 1),
      ],
    };

  default:
    return state;
  }
}
