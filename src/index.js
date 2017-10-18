import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk'
import { applyMiddleware, compose, createStore as createReduxStore } from 'redux'

export const createStore = (initialState = {}) => {
  const middleware = [thunk]
  const enhancers = []
  let composeEnhancers = compose
  // This allows us to use the redux dev tools		
  if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  }
  const store = createReduxStore(
    reducer,
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  return store
}

render(
  <Provider store={createStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
