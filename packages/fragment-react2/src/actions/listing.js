const SET_LISTING = 'SET_LISTING'
const LOAD_LISTING = 'LOAD_LISTING'

const setListing = (listing) => ({
  type: SET_LISTING,
  payload: {
    listing
  }
})

const loadListing = (listing) => ({
  type: LOAD_LISTING,
  payload: {
    listing
  }
})

export {
  LOAD_LISTING,
  SET_LISTING,
  setListing,
  loadListing
}
