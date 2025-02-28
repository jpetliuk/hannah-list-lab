import { useParams } from 'react-router-dom';
import useUserStore from '../../store/userStore';

import NotFound404Page from './NotFound404Page';
import ProjectDisplay from '../../components/ProjectPage/ProjectDisplay';

const ProjectPage = () => {
  const { id } = useParams();

  const { projects } = useUserStore();
  const projectFound = projects.find((project) => project._id === id);

  return (
    <div className="border-outline bg-custom-white min-h-full w-full rounded-3xl border">
      {projectFound ? (
        <ProjectDisplay project={projectFound} />
      ) : (
        <NotFound404Page />
      )}
    </div>
  );
};

export default ProjectPage;
