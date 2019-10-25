import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home'
import Room from './views/Room'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: 'Home'
      },
      component: Home
    },
    {
      path: '/r/:id',
      name: 'Room',
      meta: {
        title: 'Room'
      },
      component: Room
    }
  ]
})
