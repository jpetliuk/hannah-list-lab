import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import useUserStore from '../store/userStore';
import useAppStates from '../store/appStates';

import {
  House,
  Calendar,
  Sticker,
  ChartLine,
  Settings,
  LogOut,
} from 'lucide-react';

const tools = [
  {
    label: 'Home',
    Icon: House,
    path: '/dashboard',
  },
  {
    label: 'Calendar',
    Icon: Calendar,
    path: '/dashboard/calendar',
  },
  {
    label: 'Sticky notes',
    Icon: Sticker,
    path: '/dashboard/sticky-notes',
  },
  {
    label: 'Task progress',
    Icon: ChartLine,
    path: '/dashboard/task-progress',
  },
];

const Navbar = () => {
  const { projects, user, logout, createNewProject } = useUserStore();
  const { handleModalUserSettings } = useAppStates();

  const location = useLocation();
  const { id } = useParams();

  const [selected, setSelected] = useState(location.pathname);

  useEffect(() => {
    if (id) {
      setSelected(id);
    } else {
      setSelected(location.pathname);
    }
  }, [location.pathname, id]);

  return (
    <div className="border-outline bg-custom-white relative flex h-full min-h-full w-full flex-1 flex-col justify-between rounded-3xl border p-3">
      <div>
        <div className="border-white-gray flex w-full items-center gap-3 border-b pb-4">
          <img
            src={user.profilePicture}
            alt="user icon photo"
            className="h-10 w-10 rounded-full object-cover"
          />
          <h2 className="text-default-text text- h-6 w-38 overflow-hidden font-semibold">
            Welcome Back!
          </h2>
        </div>

        {/* Tools builder */}
        <div className="border-white-gray mt-2 flex w-full flex-col gap-1 border-b pb-4">
          <h2 className="text-default-text text-base font-semibold">Tools</h2>

          {tools.map(({ label, path, Icon }) => (
            <Link to={path} key={label}>
              <div
                className={`hover:bg-navbar-select-button flex w-full cursor-pointer items-center gap-2 rounded-3xl py-1.5 pl-4 duration-200 ${selected === path ? 'bg-navbar-select-button' : 'bg-none'}`}
              >
                <Icon
                  className={`h-[22px] w-[22px] ${selected === path ? 'text-orange-text' : 'text-light-text'}`}
                />
                <h3
                  className={`${selected === path ? 'text-orange-text font-semibold' : 'text-light-text font-light'} text-[15px]`}
                >
                  {label}
                </h3>
              </div>
            </Link>
          ))}
        </div>
        {/* Tools builder */}

        {/* Projects builder */}
        <div className="border-white-gray mt-2 flex w-full flex-col gap-1 border-b pb-1.5">
          <h2 className="text-default-text text-base font-semibold">
            Projects
          </h2>

          {projects.map(({ _id, iconColor, projectName }) => (
            <Link key={_id} to={`/dashboard/project/${_id}`}>
              <div
                className={`hover:bg-navbar-select-button flex w-full cursor-pointer items-center gap-2 rounded-3xl py-1.5 pl-4 duration-200 ${selected === _id ? 'bg-navbar-select-button' : 'bg-none'}`}
              >
                <p className="font-bold" style={{ color: iconColor }}>
                  #
                </p>
                <h3
                  className={`${selected === _id ? 'text-orange-text font-semibold' : 'text-light-text font-light'} text-[15px] duration-100`}
                >
                  {projectName}
                </h3>
              </div>
            </Link>
          ))}
          <div className="hover:text-default-text h-4 overflow-hidden text-transparent duration-200 hover:h-9">
            <div
              onClick={() => createNewProject('new project')}
              className="hover:bg-navbar-create-button flex w-full cursor-pointer items-center justify-center gap-2 rounded-3xl py-1.5 duration-200"
            >
              <h3 className="mr-5 text-center text-[15px] font-light select-none">
                Create new Project
              </h3>
            </div>
          </div>
        </div>
        {/* Projects builder */}
      </div>

      {/* Settings section */}
      <div className="border-white-gray flex w-full flex-col gap-1 border-t pt-2">
        <div
          onClick={handleModalUserSettings}
          className="hover:bg-white-gray flex w-full cursor-pointer items-center justify-center gap-2 rounded-3xl py-1"
        >
          <Settings className="h-5 w-5" />
          <h3 className="text-light-text text-[15px] font-light">Settings</h3>
        </div>
        <div
          className="hover:bg-white-gray flex w-full cursor-pointer items-center justify-center gap-2 rounded-3xl py-1"
          onClick={logout}
        >
          <LogOut className="h-5 w-5" />
          <h3 className="text-light-text text-[15px] font-light">Sign-out</h3>
        </div>
      </div>
      {/* Settings section */}
    </div>
  );
};
export default Navbar;
