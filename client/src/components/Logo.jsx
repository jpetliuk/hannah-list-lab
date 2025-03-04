import { useState } from 'react';

const Logo = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return isDarkMode ? (
    <div
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="border-outline flex h-14 w-full items-center rounded-3xl border bg-black"
    >
      <img
        src="/hannahListLabIcon-dark.png"
        alt="icon"
        className="ml-3 w-14 rounded-full object-cover object-center"
      />
      <h1 className="my-auto text-center text-lg font-bold text-white">
        HANNAH&apos;S LIST LAB
      </h1>
    </div>
  ) : (
    <div
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="border-outline bg-custom-white flex h-14 w-full items-center rounded-3xl border"
    >
      <img
        src="/hannahListLabIcon.png"
        alt="icon"
        className="ml-3 w-14 rounded-full object-cover object-center"
      />
      <h1 className="text-default-text my-auto text-center text-lg font-bold">
        HANNAH&apos;S LIST LAB
      </h1>
    </div>
  );
};
export default Logo;
