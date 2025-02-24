import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { tools, projects } from '../utils/MockData';

const Navbar = () => {
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
    <div className="flex h-full w-full flex-col justify-between rounded-3xl bg-white p-3">
      <div>
        <div className="border-white-gray flex w-full items-center gap-3 border-b pb-4">
          <img
            src="/banner-image.jpeg"
            alt="user icon photo"
            className="h-10 w-10 rounded-full object-cover"
          />
          <h2 className="text-default-text text-base font-semibold">
            Welcome Hannah!
          </h2>
        </div>

        {/* Tools builder */}
        <div className="border-white-gray mt-2 flex w-full flex-col gap-1 border-b pb-4">
          <h2 className="text-default-text text-base font-semibold">Tools</h2>

          {tools.map((item) => (
            <Link to={item.path} key={item.label}>
              <div
                className={`hover:bg-white-gray flex w-full cursor-pointer items-center gap-2 rounded-3xl py-1.5 pl-4 duration-200 ${selected === item.path ? 'bg-white-gray' : 'bg-none'}`}
              >
                <img
                  src={item.icon}
                  alt="user icon photo"
                  className="h-5 w-5 rounded-full object-cover"
                />
                <h3
                  className={`duration-100 ${selected === item.path ? 'text-orange-text font-semibold' : 'text-light-text font-light'} text-sm`}
                >
                  {item.label}
                </h3>
              </div>
            </Link>
          ))}
        </div>
        {/* Tools builder */}

        {/* Projects builder */}
        <div className="border-white-gray mt-2 flex w-full flex-col gap-1 border-b pb-4">
          <h2 className="text-default-text text-base font-semibold">
            Projects
          </h2>

          {projects.map((item) => (
            <Link key={item._id} to={`/dashboard/project/${item._id}`}>
              <div
                className={`hover:bg-white-gray flex w-full cursor-pointer items-center gap-2 rounded-3xl py-1.5 pl-4 duration-200 ${selected === item._id ? 'bg-white-gray' : 'bg-none'}`}
              >
                <p className="font-bold" style={{ color: item.iconColor }}>
                  #
                </p>
                <h3
                  className={`${selected === item._id ? 'text-orange-text font-semibold' : 'text-light-text font-light'} text-sm duration-100`}
                >
                  {item.projectName}
                </h3>
              </div>
            </Link>
          ))}
        </div>
        {/* Projects builder */}
      </div>

      {/* Settings section */}
      <div className="border-white-gray flex w-full flex-col gap-1 border-t pt-2">
        <div className="hover:bg-white-gray flex w-full cursor-pointer items-center justify-center gap-2 rounded-3xl py-1">
          <img
            src="/banner-image.jpeg"
            alt="user icon photo"
            className="h-5 w-5 rounded-full object-cover"
          />
          <h3 className="text-light-text text-sm font-light">Settings</h3>
        </div>

        <div className="hover:bg-white-gray flex w-full cursor-pointer items-center justify-center gap-2 rounded-3xl py-1">
          <img
            src="/banner-image.jpeg"
            alt="user icon photo"
            className="h-5 w-5 rounded-full object-cover"
          />
          <h3 className="text-light-text text-sm font-light">Sign-out</h3>
        </div>
      </div>
      {/* Settings section */}
    </div>
  );
};
export default Navbar;
