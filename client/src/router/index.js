import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeAdmin',
    component: () => import('../views/Home'),
    children: [
      {
        path: '',
        name: 'ListProduct',
        component: () => import('../views/Home/components/RightPanel/components/TableList')
      },
      {
        path: 'create',
        name: 'CreateProduct',
        component: () => import('../views/Home/components/RightPanel/components/FormCreate.vue')
      }
    ],
    meta: {
      auth: true
    }
  },
  {
    path: '/login',
    name: 'LoginAdmin',
    component: () => import('../views/Login'),
    meta: {
      auth: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({
        name: 'LoginAdmin'
      })
    }
  } else {
    store.commit('SET_ISMESSAGE')
    localStorage.clear()
    next()
  }
})

export default router
