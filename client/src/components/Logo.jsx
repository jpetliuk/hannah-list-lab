import { useState } from 'react';

const Logo = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <section
      onClick={() => setIsDarkMode(!isDarkMode)}
      className={`border-outline hidden h-14 w-65 items-center rounded-3xl border select-none md:flex ${isDarkMode ? 'bg-black' : 'bg-custom-white'}`}
    >
      {isDarkMode ? (
        <img
          src="/hannahListLabIcon-dark.png"
          alt="icon"
          className="ml-3 size-14 rounded-full object-cover object-center"
        />
      ) : (
        <img
          src="/hannahListLabIcon.png"
          alt="icon"
          className="ml-3 size-14 rounded-full object-cover object-center"
        />
      )}
      <h1
        className={`my-auto text-center text-lg font-bold ${isDarkMode ? 'text-white' : 'text-default-text'}`}
      >
        HANNAH&apos;S LIST LAB
      </h1>
    </section>
  );
};
export default Logo;
