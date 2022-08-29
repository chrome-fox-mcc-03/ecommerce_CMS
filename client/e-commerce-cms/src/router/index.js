import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from './../views/Login.vue'
import Dashboard from './../views/Dashboard.vue'
import ContainerProducts from './../components/ContainerProducts.vue'
import AddProduct from './../components/AddProduct'
import Update from './../views/Update.vue'
import Register from './../views/Register.vue'
import Store from './../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: { name: 'ContainerProducts' }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/products',
    redirect: { name: 'ContainerProducts' },
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'ContainerProducts',
        component: ContainerProducts
      },
      {
        path: 'add',
        name: 'AddProduct',
        component: AddProduct
      },
      {
        path: 'update/:id',
        name: 'UpdateProduct',
        component: Update
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log(Store)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (Store.state.isLogin) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

export default router
