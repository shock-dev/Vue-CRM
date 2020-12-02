import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from "firebase/app";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {auth: true},
    component: () => import('../views/Home')
  },
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'empty'},
    component: () => import('../views/Login')
  },
  {
    path: '/register',
    name: 'register',
    meta: {layout: 'empty'},
    component: () => import('../views/Register')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {auth: true},
    component: () => import('../views/Categories')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {auth: true},
    component: () => import('../views/Profile')
  },
  {
    path: '/history',
    name: 'history',
    meta: {auth: true},
    component: () => import('../views/History')
  },
  {
    path: '/planning',
    name: 'planning',
    meta: {auth: true},
    component: () => import('../views/Planning')
  },
  {
    path: '/record',
    name: 'record',
    meta: {auth: true},
    component: () => import('../views/Record')
  },
  {
    path: '/detail-record',
    name: 'detail-record',
    meta: {auth: true},
    component: () => import('../views/DetailRecord')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router
