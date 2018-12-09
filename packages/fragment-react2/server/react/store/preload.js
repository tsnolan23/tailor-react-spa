const { loadListing } = require('../../../src/redux/actions.js')

module.exports = async function preloadData(store) {
  await store.dispatch(loadListing())

	return store
}
