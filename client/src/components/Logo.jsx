const Logo = () => {
  return (
    <section className="bg-neutral-10 dark:bg-neutral-1 hidden h-16 w-80 items-center rounded-2xl select-none md:flex">
      <img
        src="/hannahListLabIcon.png"
        alt="icon"
        className="ml-3 size-14 rounded-full object-cover object-center"
      />

      <h1 className="text-default-text my-auto text-center text-lg font-bold dark:text-white">
        HANNAH&apos;S LIST LAB
      </h1>
    </section>
  );
};
export default Logo;
