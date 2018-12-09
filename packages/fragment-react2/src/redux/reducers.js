import { SET_LISTING } from './actions'

const initialState = {
  listing: []
}

const reducer = (state = initialState, { type, payload }) => ({
  [SET_LISTING]: { ...state, ...payload }
}[type] || state)

export default reducer
