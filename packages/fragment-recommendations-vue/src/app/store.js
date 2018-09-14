import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';


Vue.use(Vuex);

export default function createStore() {
	return new Vuex.Store({
		state: {
			items: []
		},
		actions: {
			fetchItems({ commit }) {
				return axios.get('https://randomuser.me/api/?results=15')
					.catch(() => ({
						data: {
							results: []
						}
					}))
					.then(({ data }) => data.results)
					.then((results) => commit('setItems', results))
			}
		},
		mutations: {
			setItems(state, items) {
				state.items = items;
			}
		}
	});
}
