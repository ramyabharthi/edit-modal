import { createRouter, createWebHistory } from 'vue-router';
import FormList from '../components/FormList.vue';
import NotFound from '../components/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'FormList',
    component: FormList,
  },
 
  {
    path: '/users/add',
    name: 'AddForm',
    component: FormList,
  },
  {
    path: '/users/edit/:id',
    name: 'EditForm',
    component: FormList,
  },
  {
    path: '/users/delete/:id',
    name: 'DeleteForm',
    component: FormList,
  },
  {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
