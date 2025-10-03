import ProjectCardComponent from '../../components/ProjectCardComponent';
import useUserStore from '../../store/userStore';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { user, projects } = useUserStore();

  return (
    <div className="bg-neutral-10 dark:bg-neutral-1 h-full w-full rounded-3xl">
      <div className="flex h-full w-full flex-col items-center pt-10">
        <h1 className="text-neutral-2 dark:text-neutral-9 text-4xl font-bold">
          Welcome Back {user.name}
        </h1>
        <hr className="text-neutral-5 dark:text-neutral-4 mt-5 w-[1080px]" />
        <div className="mt-25 w-[1080px]">
          <h1 className="text-neutral-2 dark:text-neutral-9 text-medium mb-3">
            Recently visited
          </h1>

          <div className="flex flex-wrap gap-6">
            {projects.map(
              ({ _id, projectName, iconColor, backgroundImage }) => (
                <Link key={_id} to={`/dashboard/project/${_id}`}>
                  <ProjectCardComponent
                    backgroundImage={backgroundImage}
                    iconColor={iconColor}
                    projectName={projectName}
                  />
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
