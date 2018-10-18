import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';


Vue.use(Vuex)

export default function createStore() {
	return new Vuex.Store({
		state: {
			items: []
		},
		actions: {
			fetchItems({ commit }) {
				return axios.get('/mock')
					.then(({ data }) => {
						commit('setItems', data)
					})
			}
		},
		mutations: {
			setItems(state, items) {
				state.items = items
			}
		}
	})
}
