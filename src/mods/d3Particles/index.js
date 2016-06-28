import createLogger from 'redux-logger';

import {ActionTypes, ActionCreators} from './actions';
import * as config from './config';
import Ner from './containers'
import Cer from './reducers'


const logger = createLogger({
  collapsed: true,
  predicate: (getState, action) => config.debug && ((action.type !== ActionTypes.TIME_TICK) && (action.type !== ActionTypes.UPDATE_MOUSE_POS))
});

const e = {Ner: Ner,
			Cer: Cer,
			MW: logger,
			}


export default e