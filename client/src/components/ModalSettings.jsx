import { useState } from 'react';
import useUserStore from '../store/userStore';
import useAppStates from '../store/appStates';

import { UserPen, Lightbulb, Wrench } from 'lucide-react';

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
          <h2 className="text-xl font-semibold">Profile picture</h2>
          <div className="p-5">
            <button className="bg-blue-button h-10 w-35 cursor-pointer rounded-2xl text-sm font-semibold text-white">
              Upload picture
            </button>
            <button className="ml-4 h-10 w-35 cursor-pointer rounded-2xl border border-[#D9D9D9] bg-[#F6F6F6] text-sm font-semibold text-[#BD3D3D] hover:bg-[#ebebeb] active:bg-[#F6F6F6]">
              Delete picture
            </button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Username</h2>
        <div className="flex">
          <input
            type="text"
            autoComplete="off"
            name="username"
            defaultValue={user.name}
            placeholder="..."
            className="text-light-text border-light-gray focus:text-default-text focus:outline-light-gray w-80 resize-none rounded-2xl border py-2 pl-6 font-light"
            maxLength="24"
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold">About me</h2>
        <textarea
          name="description"
          defaultValue={user.description}
          className="text-light-text border-light-gray focus:outline-light-gray focus:text-default-text h-30 w-full resize-none rounded-2xl border py-2 pl-6 font-light whitespace-pre-line"
          maxLength="500"
          onChange={(e) => setNewDescription(e.target.value)}
        />
      </div>

      <button
        onClick={saveChanges}
        className="bg-button-yellow text-default-text hover:bg-button-yellow-hover active:bg-button-yellow mt-15 ml-auto h-11 w-40 cursor-pointer rounded-2xl font-semibold"
      >
        Save Changes
      </button>
    </div>
  );
};

export const Appearance = () => {
  return <div>Appearance</div>;
};

export const Account = () => {
  return <div>Account</div>;
};

const ModalSettings = () => {
  const [selected, setSelected] = useState('profile');
  const { handleModal } = useAppStates();

  return (
    <div className="bg-transparency-modal fixed top-0 left-0 z-50 flex min-h-screen w-screen items-center justify-center">
      <div className="bg-custom-white m-10 grid h-[650px] w-5xl grid-rows-[80px_auto] overflow-hidden rounded-3xl shadow-lg">
        <div className="border-light-gray flex h-[80px] w-full justify-between border-b">
          <h1 className="border-light-gray flex w-48 items-center justify-center border-r text-xl font-bold">
            Settings
          </h1>
          <button
            className="text-light-text hover:text-default-text w-20 cursor-pointer text-3xl font-bold duration-300"
            onClick={handleModal}
          >
            X
          </button>
        </div>

        <div className="grid h-full grid-cols-[192px_auto] overflow-hidden">
          <div className="border-light-gray h-full w-48 border-r">
            <div
              onClick={() => setSelected('profile')}
              className={`flex h-12 cursor-pointer items-center gap-3 pl-5 font-semibold duration-200 ${selected === 'profile' ? 'bg-navbar-select-button-active border-navbar-select-button-orange-active text-orange-text border-r-2 shadow-inner' : 'text-light-text border-r-transparent'}`}
            >
              <UserPen />
              <h1>Profile</h1>
            </div>
            <div
              onClick={() => setSelected('appearance')}
              className={`flex h-12 cursor-pointer items-center gap-3 pl-5 font-semibold duration-200 ${selected === 'appearance' ? 'bg-navbar-select-button-active border-navbar-select-button-orange-active text-orange-text border-r-2 shadow-inner' : 'text-light-text border-r-transparent'}`}
            >
              <Lightbulb />
              <h1>Appearance</h1>
            </div>
            <div
              onClick={() => setSelected('account')}
              className={`flex h-12 cursor-pointer items-center gap-3 pl-5 font-semibold duration-200 ${selected === 'account' ? 'bg-navbar-select-button-active border-navbar-select-button-orange-active text-orange-text border-r-2 shadow-inner' : 'text-light-text border-r-transparent'}`}
            >
              <Wrench />
              <h1>Account</h1>
            </div>
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

export default ModalSettings;
