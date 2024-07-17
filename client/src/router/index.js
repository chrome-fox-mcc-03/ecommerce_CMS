import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import AddAdmin from '../views/AddAdmin.vue'
import ListProducts from '../views/ListProducts'
import ImportProduct from '../views/ImportProduct'
import LokalProduct from '../views/LokalProduct'
import OtherProduct from '../views/OtherProduct'
import AddProduct from '../views/AddProduct'
import EditProduct from '../components/EditProduct.vue'
import DetailProduct from '../components/DetailProduct.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'Home',
  component: Home,
  redirect: '/products'
}, {
  path: '/login',
  name: 'Login',
  component: Login
}, {
  path: '/addadmin',
  name: 'AddAdmin',
  component: AddAdmin,
  meta: {
    requiresAuth: true
  }
},
{
  path: '/products',
  component: Dashboard,
  meta: {
    requiresAuth: true
  },
  children: [
    {
      path: '',
      name: 'ListProducts',
      component: ListProducts
    },
    {
      path: 'edit/:id',
      name: 'EditProduct',
      component: EditProduct
    }, {
      path: 'add',
      name: 'AddProduct',
      component: AddProduct
    }, {
      path: 'detail/:id',
      name: 'DetailProduct',
      component: DetailProduct
    }, {
      path: 'lokal',
      name: 'LokalProduct',
      component: LokalProduct
    }, {
      path: 'import',
      name: 'ImportProduct',
      component: ImportProduct
    }, {
      path: 'other',
      name: 'OtherProduct',
      component: OtherProduct
    }
  ]
}

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // console.log(to.matched.some(record => record.meta.requiresAuth))
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (localStorage.getItem('token')) {
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
