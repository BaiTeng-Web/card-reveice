import { RouteRecordRaw } from 'vue-router';
import ReceivePage from '@/views/receive/index.vue';

const HomeRoute: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/receive',
  },
  {
    path: '/receive',
    name: 'Receive',
    component: ReceivePage,
    meta: {
      title: '活动页',
    },
  },
];

export default HomeRoute;
