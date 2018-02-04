import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './Reducers/index'
import App from './App'
import { HashRouter } from 'react-router-dom'
let store = createStore(reducer)
render(
  <Provider store={store}>
    <HashRouter basename='/'>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
)