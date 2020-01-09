import ActiveThreads from './components/threads/activeThreads/component';
import AllThreads from './components/threads/allThreads/component';
import HomePage from './pages/home/page';
import DptStats from './components/dpt-stats/component';
import AboutPage from './pages/about/page';
import HistoryPage from './pages/history/page';

export const routes = [
  {
    path: '/dpt-stats',
    component: DptStats,

    children: [
      {
        path: 'active-threads',
        component: ActiveThreads,
        name: 'active-threads'
      },
      {
        path: 'all-threads',
        component: AllThreads,
        name: 'all-threads'
      }
    ]
  },

  {
    path: '/',
    component: HomePage,
    name: 'home',
    redirect: 'dpt-stats/active-threads'
  },
  { path: '/about', component: AboutPage, name: 'about' },
  { path: '/history', component: HistoryPage, name: 'history' }
];
