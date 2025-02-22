import BannerImage from '../components/BannerImage';
import GetStarted from '../components/GetStarted';

const StartPage = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center gap-8 bg-white p-8">
      <BannerImage />
      <GetStarted />
    </div>
  );
};
export default StartPage;
