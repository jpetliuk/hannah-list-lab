import { Outlet } from 'react-router-dom';

import BannerImage from '../components/BannerImage';

const WelcomeLayout = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center gap-8 bg-custom-white p-8">
      <BannerImage />

      <Outlet />
    </div>
  );
};
export default WelcomeLayout;
