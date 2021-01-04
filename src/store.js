import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'
 
Vue.use(Vuex);

if (localStorage.getItem("principal") && JSON.parse(localStorage.getItem("principal")).token) {
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem("principal")).token;
}
 
export default new Vuex.Store({
	state: {
		principal: (localStorage.getItem("principal") && JSON.parse(localStorage.getItem("principal"))) || {},
		notification: {
			title: null,
			content: {},
			show: false
		},
		toggleLiveNotification: null
	},
	mutations: {
		login(state, principal) {
			console.log("login");
			state.principal = principal;
			console.log(JSON.stringify(principal));
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + principal.token;
			localStorage.setItem("principal", JSON.stringify(principal));
		},
		logout(state) {
			console.log('mutation: logout before state: ' + JSON.stringify(state));
			state.principal = {};
			delete axios.defaults.headers.common['Authorization'];
			localStorage.removeItem("principal");
			console.log('mutation: logout after state: ' + JSON.stringify(state));
		},
		showNotification(state, { title, content }) {
			state.notification.title = title;
			state.notification.content = content;
			state.notification.show = true;
		},
		debug(state) {
			console.log("localStorage principal: " + localStorage.getItem("principal") + " state: " + JSON.stringify(state, null, 4));
		}
	},
	actions: {
		login({ commit }, principal) {
			console.log('action: login');
			return new Promise((resolve, reject) => {
				axios.post(
					"http://localhost:8082/demo/public/token",
					{
						username: principal.username,
						password: principal.password,
					}
				).then(response => {
					let principal = response.data;
					//principal.image = principal.image + (principal.image ? '?' + new Date().getSeconds() : '');
					if (principal && principal.token) {
						commit('login', principal);
						resolve({response:response, principal:principal});
					}
				}).catch(error => reject(error));
			});
		},
		logout({ commit }) {
			console.log('action: logout');
			commit('logout');
			/* return new Promise((resolve, reject) => {
				axios.post(
					"http://localhost:8082/demo/public/logout",
					{}
				).then(response => { 
					commit('logout');
					resolve(response);
				}).catch(error => reject(error));
			}); */
		},
		debug({ commit }) {
			console.log('action: debug');
			commit('debug');
		}
	},
	getters: {
		isLoggedIn: state => (state.principal && state.principal.token)
	},
})