import { Outlet } from 'react-router-dom';

import Logo from '../components/Logo';
import Navbar from '../components/Navbar';
import ModalSettings from '../components/ModalSettings';

import useAppStates from '../store/appStates';

const DashboardLayout = () => {
  const { modal } = useAppStates();

  return (
    <div className="flex min-h-screen w-full">
      <div className="fixed flex h-full w-75 flex-col gap-4 p-5 pr-3">
        <Logo />
        <Navbar />
      </div>
      <div className="ml-75 flex-1 p-5 pl-3">
        <Outlet />
      </div>

      {modal ? <ModalSettings /> : null}
    </div>
  );
};
export default DashboardLayout;
