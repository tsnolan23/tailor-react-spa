import React from 'react'
import { connect } from 'react-redux'

import styles from './SomeContainer.scss'

class Sample extends React.Component {
  render() {

    return (
      <div className={styles.test} onClick={() => console.log(23131)}>
        { this.props.listing.length }
      </div>
    )
  }
}

export default connect((state) => ({ listing: state.listing }))(Sample)
