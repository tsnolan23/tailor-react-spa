import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import reducers from './redux/reducers'
import SomeContainer from './containers/SomeContainer.jsx'


const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

const buildStore = (state = null) => createStore(
  reducers,
  state,
  applyMiddleware(thunk)
)

const buildApplication = (store) => (
  <Provider store={store}>
    <SomeContainer />
  </Provider>
)

const applicationAndStore = pipe(
  buildStore,
  (store) => ({ store, application: buildApplication(store) })
)

const serverSideApplication = pipe(
  applicationAndStore,
  ({ application, store }) => ({
    store,
    application: React.createElement(
      'div',
      // @todo pass name
      {id: 'aaa'},
      application
    )
  })
)

const clientSideApplication = pipe(
  applicationAndStore,
  ({ application }) => (
    ReactDOM.hydrate(
      application,
      // @todo pass name
      document.getElementById('aaa')
    )
  )
)

if (typeof window !== 'undefined') {
  // @todo pass name
  clientSideApplication(window['fragment-react2'])
}

export {
  serverSideApplication
}
