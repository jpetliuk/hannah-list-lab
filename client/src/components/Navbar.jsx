import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import useUserStore from '../store/userStore';
import useAppStates from '../store/appStates';

import {
  House,
  // Calendar,
  Sticker,
  // ChartLine,
  Settings,
  LogOut,
} from 'lucide-react';

const tools = [
  {
    label: 'Home',
    Icon: House,
    path: '/dashboard',
  },
  // {
  //   label: 'Calendar',
  //   Icon: Calendar,
  //   path: '/dashboard/calendar',
  // },
  {
    label: 'Sticky notes',
    Icon: Sticker,
    path: '/dashboard/sticky-notes',
  },
  // {
  //   label: 'Task progress',
  //   Icon: ChartLine,
  //   path: '/dashboard/task-progress',
  // },
];

const Navbar = () => {
  const { projects, user, logout } = useUserStore();
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
    <nav className="bg-neutral-10 dark:bg-neutral-1 relative hidden h-full min-h-full w-80 flex-1 flex-col justify-between rounded-2xl p-4 md:flex">
      <div>
        <section className="border-neutral-6 dark:border-neutral-4 flex w-full items-center gap-3 border-b pb-4">
          <img
            src={user.profilePicture}
            alt="user icon photo"
            className="h-10 w-10 rounded-full object-cover"
          />
          <h2 className="text-neutral-2 dark:text-neutral-9 truncate overflow-hidden text-xl font-semibold">
            {user.name}
          </h2>
        </section>

        {/* Tools */}
        <section className="mt-2 flex w-full flex-col gap-1 pb-4">
          <h2 className="text-neutral-2 dark:text-neutral-9 overflow-hidden text-xl font-semibold">
            Tools
          </h2>

          {tools.map(({ label, path, Icon }) => (
            <Link to={path} key={label}>
              <div className="hover:bg-neutral-8 hover:dark:bg-neutral-2 flex w-full cursor-pointer items-center gap-2 rounded-3xl py-1.5 pl-4 duration-200">
                <Icon
                  className={`h-[22px] w-[22px] duration-200 ${selected === path ? 'text-primary-3' : 'text-neutral-3 dark:text-neutral-6'}`}
                />
                <h3
                  className={`${selected === path ? 'text-primary-3' : 'text-neutral-3 dark:text-neutral-6'} text-[16px] duration-200`}
                >
                  {label}
                </h3>
              </div>
            </Link>
          ))}
        </section>
        {/* Tools */}

        {/* Projects */}
        <section className="mt-2 flex w-full flex-col gap-1 pb-1.5">
          <h2 className="text-neutral-2 dark:text-neutral-9 overflow-hidden text-xl font-semibold">
            Projects
          </h2>

          {projects.map(({ _id, iconColor, projectName }) => (
            <Link key={_id} to={`/dashboard/project/${_id}`}>
              <div className="hover:bg-neutral-8 hover:dark:bg-neutral-2 flex w-full cursor-pointer items-center gap-2 rounded-3xl py-1.5 pl-4 duration-200">
                <p className="font-bold" style={{ color: iconColor }}>
                  #
                </p>
                <h3
                  className={`${selected === _id ? 'text-primary-3' : 'text-neutral-3 dark:text-neutral-6'} truncate text-[16px] duration-200`}
                >
                  {projectName}
                </h3>
              </div>
            </Link>
          ))}
        </section>
        {/* Projects */}
      </div>

      {/* Settings */}
      <section className="border-neutral-6 dark:border-neutral-4 flex w-full flex-col gap-1 border-t pt-2">
        <div
          onClick={handleModalUserSettings}
          className="hover:bg-neutral-8 hover:dark:bg-neutral-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-3xl py-1"
        >
          <Settings className="text-neutral-3 dark:text-neutral-6 h-5 w-5" />
          <h3 className="text-neutral-3 dark:text-neutral-6 text-[16px]">
            Settings
          </h3>
        </div>
        <div
          className="hover:bg-neutral-8 hover:dark:bg-neutral-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-3xl py-1"
          onClick={logout}
        >
          <LogOut className="text-neutral-3 dark:text-neutral-6 h-5 w-5" />
          <h3 className="text-neutral-3 dark:text-neutral-6 text-[16px]">
            Sign-out
          </h3>
        </div>
      </section>
      {/* Settings */}
    </nav>
  );
};
export default Navbar;
