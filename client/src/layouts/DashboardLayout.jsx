import { Outlet } from 'react-router-dom';

import Logo from '../components/Logo';
import Navbar from '../components/Navbar';
import ModalUserSettings from '../components/ModalUserSettings';

import useAppStates from '../store/appStates';

const DashboardLayout = () => {
  const { modalUserSettings } = useAppStates();

  return (
    <div className="flex min-h-screen w-full">
      <div className="fixed flex min-h-screen flex-1 w-75 flex-col gap-4 p-5 pr-3">
        <Logo />
        <Navbar />
      </div>
      <div className="ml-75 min-h-screen flex-1 p-5 pl-3">
        <Outlet />
      </div>

      {modalUserSettings ? <ModalUserSettings /> : null}
    </div>
  );
};
export default DashboardLayout;
