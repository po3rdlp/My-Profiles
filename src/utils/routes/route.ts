// src/utils/routes/routes.ts
import { type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../../pages/index/index.vue'),
  },
  {
    path: '/git',
    name: 'PersonalGithub',
    component: () => import('../../pages/git/git.vue'),
  },
]

export default routes
