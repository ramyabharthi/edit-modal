import { createRouter, createWebHistory } from 'vue-router';
import FormList from '../components/FormList.vue';
import NotFound from '../components/NotFound.vue';

const routes = [
  {
    path: '/',
    component: FormList,
    children: [
      { path: 'add', component: FormList },
      { path: 'edit/:id', component: FormList },
      { path: 'delete/:id', component: FormList },
    ],
  },
  { path: '/:pathMatch(.*)', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
