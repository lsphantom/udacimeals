import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'
import { loadState, saveState } from './utils/helper'


const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const persistedState = loadState();
const store = createStore(
	reducer,
  persistedState,
	composeEnhancers(applyMiddleware(logger))
)

store.subscribe( () => {
  saveState(store.getState());
})


ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, document.getElementById('root'))
registerServiceWorker()