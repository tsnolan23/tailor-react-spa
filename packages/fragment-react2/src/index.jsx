import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import styles from './index.scss'
import reducers from './redux/reducers'


const code = <div className={styles.test} onClick={() => console.log(23131)}>asdasdas</div>

if (typeof window !== 'undefined') {
  const c =document.getElementsByTagName('div')
  ReactDOM.hydrate(code, c[1])
}


const store = createStore(
  reducers,
  applyMiddleware(thunk)
)

export {
	code,
	store
}
