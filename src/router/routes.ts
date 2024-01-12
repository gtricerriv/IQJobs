import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/CommingSoon.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/jobs', component: () => import('pages/JobPosts.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
