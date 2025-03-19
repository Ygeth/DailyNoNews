import { createRouter, createWebHistory } from 'vue-router';
import PostList from '../components/PostList.vue';
import PostDetail from '../components/PostDetail.vue'; // We'll create this next

const routes = [
  {
    path: '/',
    name: 'Home',
    component: PostList,
  },
  {
    path: '/post/:id', // Dynamic route parameter for post ID
    name: 'PostDetail',
    component: PostDetail,
    props: true, // Pass route params as props to the component
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
