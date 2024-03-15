import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'home',
    component: ()=>import('../views/home.vue')
  },
  {
    path: '/videoplayer',
    name: 'videoplayer',
    component: ()=>import('../views/videoplayer.vue')
  },
  {
    path: '/video1',
    name: 'video1',
    component: ()=>import('../views/videoplayer1.vue')
  },
  {
    path: '/filemanager',
    name: 'filemanager',
    component: ()=>import('../views/filemanager.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: ()=>import('../views/test.vue')
  }
  
 
]



const router = new VueRouter({
  routes
})

export default router
