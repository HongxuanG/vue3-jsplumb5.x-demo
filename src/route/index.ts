import { RouteRecordRaw } from "vue-router"
import Layout from '@/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: '/',
    redirect: {
      name: 'JSPlumbIndex'
    },
  },
  {
    path: '/home',
    name: 'Home',
    component: Layout,
  },
  {
    path: '/JSPlumb',
    name: 'JSPlumb',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'JSPlumbIndex',
        component: () => import('@/views/JSPlumbBoard/index.vue'),
      },
    ],
  },
  {
    path: '/G6',
    name: 'G6',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'G6Index',
        component: () => import('@/views/G6Board/index.vue'),
      },
    ],
  },
]
export default routes
