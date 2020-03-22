import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const commonRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../components/Login.vue')
    },
    {path: '/', redirect: '/home'},
] 

// 需要通过后台数据来生成的组件
export const asyncRoutes = {
    'login': {
        path: 'login',
        name: 'login',
        component: () => import('../components/Login.vue')
    },
    'home': {
        path: 'home',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    'teachermanger':{
        path: 'teachermanger',
        name: 'teachermanger',
        component: () => import('../views/Teachermanger.vue')
    },
    'usermanger':{
        path: 'usermanger',
        name: 'usermanger',
        component: () => import('../views/Usermanger.vue')
    },
    'partyorgmanger':{
        path: 'partyorgmanger',
        name: 'partyorgmanger',
        component: () => import('../views/Partyorgmanger.vue')
    },
    'thinkmanger':{
        path: 'thinkmanger',
        name: 'thinkmanger',
        component: () => import('../views/Thinkmanger.vue')
    },
    'workmanger':{
        path: 'workmanger',
        name: 'workmanger',
        component: () => import('../views/Workmanger.vue')
    },
    'paymanger':{
        path: 'paymanger',
        name: 'paymanger',
        component: () => import('../views/Paymanger.vue')
    },
    'menumanger':{
        path: 'menumanger',
        name: 'menumanger',
        component: () => import('../views/Menumanger.vue')
    },
    'userinfo':{
        path: 'userinfo',
        name: 'userinfo',
        component: () => import('../views/Userinfo.vue')
    }
}

const createRouter = () => new Router({
    routes: commonRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher 
}

export default router