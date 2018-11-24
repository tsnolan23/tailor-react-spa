const SET_DATA = 'SET_DATA';

const setData = (data) => ({
	type: SET_DATA,
	payload: {
		data
	}
});

export {
	SET_DATA,
	setData
}
