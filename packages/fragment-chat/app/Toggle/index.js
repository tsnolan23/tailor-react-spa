import { Component } from 'react'
import PropTypes from 'prop-types'

class Toggle extends Component {
    constructor(props) {
        super(props)
        this.state = { on: false }
        this.toggle = this.toggle.bind(this)
    }

    toggle() {
        this.setState(prevState => ({ on: !prevState.on }))
    }

    render() {
        return this.props.children({
            on: this.state.on,
            toggle: this.toggle
        })
    }
}

Toggle.propTypes = {
    children: PropTypes.func.isRequired
}

export default Toggle