import BannerImage from '../components/BannerImage';
import Login from '../components/Login';

const LoginPage = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center gap-8 bg-white p-8">
      <BannerImage />
      <Login />
    </div>
  );
};
export default LoginPage;
