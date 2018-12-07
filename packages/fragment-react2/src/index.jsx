import React from 'react'
import ReactDOM from 'react-dom'

import styles from './index.scss'


const code = <div className={styles.test} onClick={() => console.log(23131)}>asdasdas</div>
if (typeof window !== 'undefined') ReactDOM.hydrate(document.getElementsByTagName('div')[0], code)
const store = {
	getState() {
		return []
	}
}

export {
	code,
	store
}
