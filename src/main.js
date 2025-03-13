import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Antd from 'ant-design-vue'
import App from './App.vue'
import 'ant-design-vue/dist/reset.css'

// 路由配置
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/match',
      component: () => import('./views/Match.vue')
    },
    {
      path: '/result',
      component: () => import('./views/Result.vue')
    },
    {
      path: '/activity',
      component: () => import('./views/Activity.vue')
    },
    {
      path: '/success',
      component: () => import('./views/Success.vue')
    }
  ]
})

const app = createApp(App)

// 使用插件
app.use(router)
app.use(Antd)

app.mount('#app')