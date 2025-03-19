import { Link } from 'react-router-dom';

const GetStarted = () => {
  return (
    <section className="border-light-gray flex h-full w-full items-center justify-center rounded-3xl border p-8">
      <div className="w-[450px]">
        <h1 className="text-default-text mb-3 text-center text-4xl font-bold">
          Get Started
        </h1>
        <h2 className="text-light-text mb-16 text-center text-lg font-light">
          Your ultimate to-do list app for staying organized, tracking progress,
          and achieving your goals effortlessly. Plan smarter, work faster, and
          make every task count!
        </h2>
        <Link to="/login">
          <button className="text-default-text bg-button-yellow hover:bg-button-yellow-hover active:bg-button-yellow-active mb-3 w-full cursor-pointer rounded-2xl py-3.5 text-xl font-bold">
            Get Started
          </button>
        </Link>
        <h3 className="text-default-text mx-auto w-fit cursor-pointer text-center text-sm font-medium">
          Already have an account? Sign in
        </h3>
      </div>
    </section>
  );
};
export default GetStarted;
