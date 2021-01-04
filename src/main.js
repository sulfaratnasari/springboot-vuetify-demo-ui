import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import login from './components/login.vue'
import dashboard from './components/dashboard.vue'
import navigation from './components/navigation.vue'
import vuetify from '@/plugins/vuetify'
import store from './store'
import userList from './components/userList.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
	routes: [
		{ path: '/login', component: login },
		{
			path: '', component: navigation, props: true,
			children: [
				{ path: '/dashboard', component: dashboard, props: true , meta: {
					auth: true
				}},
				{ path: '/user', component: userList, props: true,meta: {
					auth: true
				} }
			]
		}
	]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.auth)) {    
        if (store.getters.isLoggedIn) {
            next();
        } else {
            next({
                path: "/login",
            });
        }
    } else {
        next();
    }
}); 

new Vue({
	router,
	store,
	vuetify,
  render: h => h(App),
}).$mount('#app')
