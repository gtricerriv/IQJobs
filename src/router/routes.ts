import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/jobs', component: () => import('pages/JobPosts.vue') },
      { path: '/applicants', component: () => import('pages/Applicant.vue') },
      { path: '/profiles', component: () => import('pages/Profile.vue') },
      { path: '/cv', component: () => import('pages/CV.vue') },
      { path: '/settings', component: () => import('pages/Settings.vue') },
    ],
  },
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/jobs', component: () => import('pages/JobPosts.vue') },
      { path: '/applicants', component: () => import('pages/Applicant.vue') },
      { path: '/recruiters', component: () => import('pages/Recruiter.vue') },
      { path: '/settings', component: () => import('pages/Settings.vue') },
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
