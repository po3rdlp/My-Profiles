import { type RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('~/src/pages/index/index.vue'), name: 'Home' },
  { path: '/dashboard', component: () => import('~/pages/dashboard/index.vue'), name: 'Dashboard' },
  { path: '/about', component: () => import('~/pages/about/index.vue'), name: 'About' },
  { path: '/contact', component: () => import('~/pages/contact/index.vue'), name: 'Contact' },
  { path: '/comments', component: () => import('~/pages/comments/index.vue'), name: 'Comments' },
  {
    path: '/playgrounds',
    component: () => import('~/pages/playgrounds/index.vue'),
    name: 'Playgrounds',
  }
];

export default routes;
