import { useState } from 'react';
import useUserStore from '../store/userStore';
import useAppStates from '../store/appStates';
import { useDarkMode } from '../utils/useDarkMode';

import { UserPen, Lightbulb, Wrench, X, Check } from 'lucide-react';

export const Profile = () => {
  const { user, changeNameAndDescription } = useUserStore();
  const [newName, setNewName] = useState(false);
  const [newDescription, setNewDescription] = useState(false);

  const saveChanges = () => {
    if (newName && newDescription) return;

    changeNameAndDescription(newName, newDescription);
    setNewName(false);
    setNewDescription(false);
  };

  return (
    <div className="flex min-h-full flex-col gap-5 px-10 py-5">
      <div className="flex gap-5">
        <img
          src={user.profilePicture}
          alt="user profile photo"
          className="bg-white-gray border-light-gray h-25 w-25 rounded-full border object-cover"
        />
        <div>
          <h2 className="text-neutral-1 dark:text-neutral-8 text-xl font-semibold">
            Profile Picture
          </h2>
          <div className="p-5">
            <button className="bg-primary-3 hover:bg-primary-2 active:bg-primary-2 text-neutral-10 shadow-drop-1 active:shadow-inner-1 h-11 w-38 cursor-pointer rounded-2xl text-base font-medium duration-100">
              Upload picture
            </button>
            <button className="bg-neutral-10 text-semantics-red-1 shadow-drop-1 hover:bg-neutral-9 active:bg-neutral-9 active:shadow-inner-1 ml-4 h-11 w-38 cursor-pointer rounded-2xl border border-transparent text-base font-medium duration-100">
              Delete picture
            </button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-neutral-1 dark:text-neutral-8 text-xl font-semibold">
          Username
        </h2>
        <div className="flex">
          <input
            type="text"
            autoComplete="off"
            name="username"
            defaultValue={user.name}
            placeholder="Name"
            className="text-neutral-4 border-neutral-6 dark:border-neutral-3 focus:text-neutral-1 focus:dark:text-neutral-8 focus:ring-primary-3 w-80 resize-none rounded-2xl border py-2 pl-6 font-light focus:ring-1 focus:outline-none"
            maxLength="24"
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
      </div>

      <div>
        <h2 className="text-neutral-1 dark:text-neutral-8 text-xl font-semibold">
          About me
        </h2>
        <textarea
          name="description"
          defaultValue={user.description}
          className="focus:outline-light-gray text-neutral-4 border-neutral-6 dark:border-neutral-3 focus:text-neutral-1 focus:dark:text-neutral-8 focus:ring-primary-3 whitespace-pre-lin h-30 w-full resize-none rounded-2xl border py-2 pl-6 font-light focus:ring-1 focus:outline-none"
          maxLength="500"
          onChange={(e) => setNewDescription(e.target.value)}
        />
      </div>

      <button
        onClick={saveChanges}
        className="bg-secondary-4 text-default-text hover:bg-secondary-3 active:bg-secondary-3 shadow-drop-1 active:shadow-inner-1 mt-15 ml-auto h-11 w-40 cursor-pointer rounded-2xl font-semibold duration-100"
      >
        Save Changes
      </button>
    </div>
  );
};

export const Appearance = () => {
  const { setSystem, setLight, setDark, theme } = useDarkMode();

  return (
    <div className="pt-8">
      <div className="px-20 pb-5">
        <h1 className="text-neutral-1 dark:text-neutral-8 text-2xl font-semibold">
          Theme
        </h1>
        <h2 className="text-neutral-4 dark:text-neutral-5 text-base font-light">
          Change how your UI looks and feels in your browser.
        </h2>
      </div>

      <div className="flex justify-center gap-8">
        {/* System */}
        <div className="cursor-pointer" onClick={setSystem}>
          <div>
            <img
              src="/images/Visualizer-system.png"
              alt="light mode"
              className="h-auto w-55 select-none"
            />
            <div className="text-neutral-1 dark:text-neutral-8 flex flex-row gap-2 p-3">
              <div
                className={`border-neutral-6 dark:border-neutral-4 flex h-6 w-6 items-center justify-center rounded-full border-1 ${theme === 'system' ? 'bg-primary-3' : 'bg-neutral-9 dark:bg-neutral-2'}`}
              >
                <Check
                  className="text-neutral-9 dark:text-neutral-2 mt-0.5 h-4 w-4.5"
                  strokeWidth={5}
                />
              </div>
              System
            </div>
          </div>
        </div>

        {/* Light */}
        <div className="cursor-pointer" onClick={setLight}>
          <img
            src="/images/Visualizer-light.png"
            alt="light mode"
            className="h-auto w-55 select-none"
          />
          <div className="text-neutral-1 dark:text-neutral-8 flex flex-row gap-2 p-3">
            <div
              className={`border-neutral-6 dark:border-neutral-4 flex h-6 w-6 items-center justify-center rounded-full border-1 ${theme === 'light' ? 'bg-primary-3' : 'bg-neutral-9 dark:bg-neutral-2'}`}
            >
              <Check
                className="text-neutral-9 dark:text-neutral-2 mt-0.5 h-4 w-4.5"
                strokeWidth={5}
              />
            </div>
            Light
          </div>
        </div>

        {/* Dark */}
        <div className="cursor-pointer" onClick={setDark}>
          <div>
            <img
              src="/images/Visualizer-dark.png"
              alt="light mode"
              className="h-auto w-55 select-none"
            />
            <div className="text-neutral-1 dark:text-neutral-8 flex flex-row gap-2 p-3">
              <div
                className={`border-neutral-6 dark:border-neutral-4 flex h-6 w-6 items-center justify-center rounded-full border-1 ${theme === 'dark' ? 'bg-primary-3' : 'bg-neutral-9 dark:bg-neutral-2'}`}
              >
                <Check
                  className="text-neutral-9 dark:text-neutral-2 mt-0.5 h-4 w-4.5"
                  strokeWidth={5}
                />
              </div>
              Dark
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Account = () => {
  return (
    <div className="pt-8">
      <div className="px-20 pb-5">
        <h1 className="text-neutral-1 dark:text-neutral-8 text-2xl font-semibold">
          Email Address
        </h1>
        <h2 className="text-neutral-4 dark:text-neutral-5 text-base font-light">
          Change how your UI looks and feels in your browser.
        </h2>
      </div>
    </div>
  );
};

const ModalUserSettings = () => {
  const [selected, setSelected] = useState('profile');
  const { handleModalUserSettings } = useAppStates();

  const navItems = [
    { key: 'profile', icon: UserPen, label: 'Profile' },
    { key: 'appearance', icon: Lightbulb, label: 'Appearance' },
    { key: 'account', icon: Wrench, label: 'Account' },
  ];

  return (
    <div className="fixed top-0 left-0 z-50 flex min-h-screen w-screen items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div className="bg-neutral-10 dark:bg-neutral-1 m-10 grid h-[650px] w-5xl grid-rows-[80px_auto] overflow-hidden rounded-3xl shadow-lg">
        <div className="border-neutral-6 dark:border-neutral-3 flex h-[80px] w-full items-center justify-between border-b">
          <h1 className="border-neutral-6 dark:border-neutral-3 text-neutral-1 dark:text-neutral-8 flex h-full w-48 items-center justify-center border-r text-2xl font-bold">
            Settings
          </h1>
          <X
            className="text-neutral-5 hover:text-neutral-4 dark:hover:text-neutral-6 mr-3 h-12 w-12 cursor-pointer duration-300"
            onClick={handleModalUserSettings}
          />
        </div>

        <div className="grid h-full grid-cols-[192px_auto] overflow-hidden">
          <div className="border-neutral-6 dark:border-neutral-3 h-full w-48 border-r">
            {navItems.map(({ key, icon: Icon, label }) => (
              <div
                key={key}
                onClick={() => setSelected(key)}
                className={`flex h-16 cursor-pointer items-center gap-3 pl-5 font-bold duration-200 ${selected === key ? 'bg-neutral-9 dark:bg-neutral-2 shadow-drop-1 border-primary-3 text-primary-3 border-r-3' : 'text-neutral-2 dark:text-neutral-7 border-r-transparent'}`}
              >
                <Icon />
                <h1>{label}</h1>
              </div>
            ))}
          </div>

          <div className="h-full w-full overflow-y-auto">
            {selected === 'profile' ? (
              <Profile />
            ) : selected === 'appearance' ? (
              <Appearance />
            ) : selected === 'account' ? (
              <Account />
            ) : (
              <h1>error</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalUserSettings;
