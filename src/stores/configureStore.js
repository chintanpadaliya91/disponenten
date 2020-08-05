import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
 import { createLogger } from 'redux-logger'
import handleTransitions from 'redux-history-transitions'
import createHistory from 'history/createBrowserHistory'

import rootReducer from '../reducers/index'

const history = createHistory()
const enhancer = handleTransitions(history)

const loggerMiddleware = createLogger()
const middleware = applyMiddleware(thunkMiddleware, loggerMiddleware)
const createStoreWithMiddleware = middleware(createStore)

export default function configureStore (initialState) {
  return createStoreWithMiddleware(rootReducer, initialState, enhancer)
}
