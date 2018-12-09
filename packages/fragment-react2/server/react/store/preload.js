const { loadListing } = require('../../../src/redux/actions.js')

module.exports = async function preloadData({ store, name }) {
  await store.dispatch(loadListing())

	return { store, name }
}
