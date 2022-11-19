import { Outlet } from 'react-router';
import Header from '@/format/Header';

const Layout = () => (
  <div>
    <Header />
    <Outlet />
  </div>
);

export default Layout;
