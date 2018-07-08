import {
    shape,
    string
} from 'prop-types'

export default shape({
    id: string,
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