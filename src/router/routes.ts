import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/test',
    component: () => import('layouts/TestDesign.vue'),
  },
  {
    path: '/landing',
    component: () => import('pages/LandingPage.vue'),
  },
  {
    path: '/widget-jobs',
    component: () => import('pages/Widget.vue'),
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/jobs', component: () => import('pages/JobPosts.vue') },
      { path: '/new-job', component: () => import('pages/NewJob.vue') },
      { path: '/applicants', component: () => import('pages/Applicant.vue') },
      { path: '/profile', component: () => import('pages/Profile.vue') },
      { path: '/cv', component: () => import('pages/CV.vue') },
      { path: '/settings', component: () => import('pages/Settings.vue') },
      { path: '/chats', component: () => import('pages/ChatPage.vue') },
    ],
  },
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/jobs', component: () => import('pages/JobPosts.vue') },
      { path: '/new-job', component: () => import('pages/NewJob.vue') },
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

// Añadir la funcionalidad de loginWithRedirect a rutas específicas

export default routes;
