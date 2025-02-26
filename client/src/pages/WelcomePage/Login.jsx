import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="border-light-gray flex h-full w-full items-center justify-center rounded-3xl border p-8">
      <div className="w-[450px]">
        <h1 className="text-default-text mb-3 text-left text-4xl font-bold">
          Sign in
        </h1>

        <input
          className="text-light-text border-light-gray mb-3 w-full rounded-2xl border p-2.5"
          placeholder="email@example.com"
        ></input>
        <input
          className="text-light-text border-light-gray mb-6 w-full rounded-2xl border p-2.5"
          placeholder="**********"
        ></input>

        <Link to="/dashboard">
          <button className="text-default-text bg-button-yellow hover:bg-button-yellow-hover active:bg-button-yellow-active mb-3 w-full cursor-pointer rounded-2xl py-3.5 text-xl font-bold">
            Sign in
          </button>
        </Link>

        <div className="relative mb-3 w-full">
          <h3 className="text-light-text bg-custom-white relative z-10 mx-auto w-fit px-4 text-center text-sm font-semibold">
            or
          </h3>
          <hr className="border-light-gray absolute top-1/2 z-0 w-full" />
        </div>

        <div className="flex w-full gap-10">
          <Link
            to={'http://localhost:4000/auth/google'}
            className="text-default-text bg-button-gray hover:bg-button-gray-hover active:bg-button-gray-active mb-3 w-full cursor-pointer rounded-2xl py-3.5 text-center text-xl font-bold"
          >
            Google
          </Link>
          <Link
            to={'/login'}
            className="text-default-text bg-button-gray hover:bg-button-gray-hover active:bg-button-gray-active mb-3 w-full cursor-pointer rounded-2xl py-3.5 text-center text-xl font-bold"
          >
            Facebook
          </Link>
        </div>

        <h3 className="text-default-text mx-auto w-fit cursor-pointer text-center text-sm font-medium">
          Already have an account? Sign in
        </h3>
      </div>
    </div>
  );
};
export default Login;
