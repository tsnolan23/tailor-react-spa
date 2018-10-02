import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { readFileSync } from 'fs';


Vue.use(Vuex)

export default function createStore() {
	return new Vuex.Store({
		state: {
			items: []
		},
		actions: {
			fetchItems({ commit }) {
				return new Promise((res) => {
					const data = readFileSync('/response.json', 'utf-8');
					commit('setItems', data)
					
					res();
				});
			}
		},
		mutations: {
			setItems(state, items) {
				state.items = items
			}
		}
	})
}
