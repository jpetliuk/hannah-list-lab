import { Outlet } from 'react-router-dom';

import Logo from '../components/Logo';
import Navbar from '../components/Navbar';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <div className="fixed flex h-full w-80 flex-col gap-4 p-5 pr-3">
        <Logo />
        <Navbar />
      </div>
      <div className="ml-80 flex-1 p-5 pl-3">
        <Outlet />
      </div>
    </div>
  );
};
export default DashboardLayout;
