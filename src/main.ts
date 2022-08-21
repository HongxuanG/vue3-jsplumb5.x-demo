import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import '@/assets/scss/BaseNode.scss'
import App from './App.vue'
import route from '@/route/index'
import { createRouter, createWebHistory } from 'vue-router'
import '@jsplumb/browser-ui/css/jsplumbtoolkit.css'
import { mouseDownSpace, mousewheelAlt } from './utils/customDirectives'

// 导入 font-awesome 图标
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

const router = createRouter({
  history: createWebHistory(),
  routes: route,
})

const app = createApp(App)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.use(router)

app.directive('mousedownspace', mouseDownSpace)
app.directive('mousewheelalt', mousewheelAlt)

app.mount('#app')
