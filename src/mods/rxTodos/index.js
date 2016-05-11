import Ner from './containers'
import Cer from './reducers'

const e = {
			Ner: Ner,
			Cer: Cer,
			Route: {container: Ner,
							path: '/'}
		}

export default e