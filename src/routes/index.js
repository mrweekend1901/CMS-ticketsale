import DefaultLayout from '../components/Layout/DefaultLayout';
import Home from '../pages/Home';
import Service from '../pages/Service';
import TicketControl from '../pages/TicketControl';
import TicketManagement from '../pages/TicketManagement';

//Public Routes
const publicRoutes = [
  { path: '/', component: Home, layout: DefaultLayout },
  { path: '/control', component: TicketControl, layout: DefaultLayout },
  { path: '/management', component: TicketManagement, layout: DefaultLayout },
  { path: '/setting/service', component: Service, layout: DefaultLayout },
];

//Private Routes

const privateRoutes = [];

export { publicRoutes, privateRoutes };
