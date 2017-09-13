import {createStore, applyMiddleware} from 'redux'
import { mainReducer } from './reducers'

import thunk from 'redux-thunk'

console.log(mainReducer)

// const store = createStore(mainReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
// applyMiddleware(thunk))
const store = createStore(mainReducer)

export default store;