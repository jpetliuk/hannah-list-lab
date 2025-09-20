import { Outlet } from 'react-router-dom';

import Logo from '../components/Logo';
import Navbar from '../components/Navbar';
import ModalUserSettings from '../components/ModalUserSettings';

import useAppStates from '../store/appStates';

const DashboardLayout = () => {
  const { modalUserSettings } = useAppStates();

  return (
    <div className="bg-neutral-8 dark:bg-neutral-2 relative block min-h-screen w-full md:grid md:grid-cols-[360px_1fr]">
      <div>
        <div className="fixed hidden min-h-screen flex-col gap-4 p-5 md:flex">
          <Logo />
          <Navbar />
        </div>
      </div>
      <div className="min-h-screen w-full md:p-5 md:pl-0">
        <Outlet />
      </div>

      <div className="fixed">
        {modalUserSettings ? <ModalUserSettings /> : null}
      </div>
    </div>
  );
};
export default DashboardLayout;
