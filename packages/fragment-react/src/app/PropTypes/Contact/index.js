import {
    shape,
    string
} from 'prop-types'

export default shape({
    id: shape({
        name: string,
        value: string
    }),
    email: string,
    name: shape({
        title: string,
        first: string,
        last: string
    }),
    picture: shape({
        large: string,
        medium: string,
        small: string
    })
})