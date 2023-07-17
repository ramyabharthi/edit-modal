import { createRouter, createWebHistory } from 'vue-router';
import FormList from '../components/FormList.vue';
import FormModal from '../components/FormModal.vue';
import DeleteModal from '../components/DeleteModal.vue';
import NotFound from '../components/NotFound.vue'

const routes = [
  {
    path: '/',
    redirect: '/formlist', 
  },
  {
    path: '/formlist',
    name: 'FormList',
    component: FormList,
  children: [
  {
    path: 'add',
    name: 'AddForm',
    component: FormModal,
    props: {
      editIndex: null,
    },
  },
  {
    path: 'edit/:index',
    name: 'EditForm',
    component: FormModal,
    props: true,
  },
  {
    path: 'delete/:index',
    name: 'DeleteForm',
    component: DeleteModal,
    props: true,
  },
  
  
]


  },
  {
    path: '/:pathMatch(.*)*', 
    name: 'NotFound',
    component: NotFound,
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
