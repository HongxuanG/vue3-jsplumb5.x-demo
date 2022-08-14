import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import route from '@/route/index'
import { createRouter, createWebHistory } from 'vue-router'
import '@jsplumb/browser-ui/css/jsplumbtoolkit.css'

const router = createRouter({
  history: createWebHistory(),
  routes: route,
})

const app = createApp(App)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.use(router)
app.mount('#app')