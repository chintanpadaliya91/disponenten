import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import ThemeProvider from 'react-toolbox/lib/ThemeProvider'
import theme from './assets/react-toolbox/theme.js'
import './assets/react-toolbox/theme.css'

import DeliveryList from './container/DeliveryList'
import DeliveryDetails from './components/DeliveryDetails'

import './styles/App.css'

const routes = (
  <div>
    <Route exact path='/' component={DeliveryList} />
    <Route exact path='/delivery-list' component={DeliveryList} />
    <Route exact path='/delivery-details/:contractId/:customerId' component={DeliveryDetails} />
  </div>
)

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
