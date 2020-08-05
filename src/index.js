import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import configureStore from './stores/configureStore'
import initialState from './stores/initialState'

import App from './App'
import './styles/index.css'

console.log(process.env)

const store = configureStore(initialState)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
