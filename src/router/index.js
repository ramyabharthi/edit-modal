import { createRouter, createWebHistory } from 'vue-router';
import FormList from '../components/FormList.vue';
import AddForm from '../components/AddForm.vue';
import EditForm from '../components/EditForm.vue';
import DeleteForm from '../components/DeleteForm.vue';
import NotFound from '../components/NotFound.vue';

const routes = [
  { path: '/users/list', component: FormList },
  { path: '/users/add', component: AddForm },
  { path: '/users/edit/:index', component: EditForm },
  { path: '/users/delete/:index', component: DeleteForm },
  { path: '/:pathMatch(.*)*', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
