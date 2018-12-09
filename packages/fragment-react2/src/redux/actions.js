const axios = require('axios')


const SET_LISTING = 'SET_LISTING'
const LOAD_LISTING = 'LOAD_LISTING'

const setListing = (listing) => ({
  type: SET_LISTING,
  payload: {
    listing
  }
})

const loadListing = () => {
  return (dispatch) => axios
    .get('https://jsonplaceholder.typicode.com/users')
    .then(
      ({ data }) => dispatch(setListing(data)),
      (error) => undefined
    )
}

module.exports = {
  LOAD_LISTING,
  SET_LISTING,
  setListing,
  loadListing
}
