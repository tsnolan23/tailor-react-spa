import { loadListing } from '../../../src/actions/listing.js'


module.exports = function preloadData(store) {
  loadListing(1231)
	// makeRequest()
	// 	.then(() => store.dispatch(setData));

	return store;
}
