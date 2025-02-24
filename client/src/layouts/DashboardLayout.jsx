import { Outlet } from 'react-router-dom';

import Logo from '../components/Logo';
import Navbar from '../components/Navbar';

const DashboardLayout = () => {
  return (
    <div className="bg-light-gray flex h-screen w-full items-center justify-center gap-5 p-5">
      <div className="flex h-full w-96 flex-col gap-4">
        <Logo />
        <Navbar />
      </div>
      <Outlet />
    </div>
  );
};
export default DashboardLayout;
