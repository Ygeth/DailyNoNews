import { createRouter, createWebHistory } from 'vue-router';
import PostList from '@/components/posts/PostList.vue';
import PostDetail from '@/components/posts/PostDetail.vue'; 
import AdminPanel from '@/components/adminPanel/AdminPanel.vue'; 
import Home from '@/components/Home.vue';
import StockAnalysis from '@/components/stockAnalysis/StockAnalysis.vue'; 
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/ultimas-noticias',
    name: 'UltimasNoticias',
    component: PostList,
  },
  {
    path: '/post/:id', // Dynamic route parameter for post ID
    name: 'PostDetail',
    component: PostDetail,
    props: true, // Pass route params as props to the component
  },
  {
    path: '/category/:category',
    name: 'Category',
    component: () => import('@/components/Category.vue'),
  },
  {
    path: '/admin-panel',
    name: 'AdminPanel',
    component: AdminPanel,
  },
  {
    path: '/StockAnalysis',
    name: 'StockAnalysis',
    component: StockAnalysis,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
