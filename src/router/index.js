import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../views/Home.vue'
import getotp from '../views/getotp.vue'
import register from '../views/register.vue'
import login from '../views/login.vue'
import createitem from '../views/createitem.vue'
import listitem from '../views/listitem.vue'
import getitem from '../views/getitem.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'App',
    component: App,
    //默认跳转到的路由
    redirect: login
  },
  {
    path: '/getotp',
    name: 'getotp',
    component: getotp
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/createitem',
    name: 'createitem',
    component: createitem
  },
  {
    path: '/listgoods',
    name: 'listitem',
    component: listitem
  },
  {
    path: '/getitem',
    name: 'getitem',
    component: getitem
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
