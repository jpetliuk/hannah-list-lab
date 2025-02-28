import { useParams } from 'react-router-dom';
import { projects } from '../../utils/MockData';

import NotFound404Page from './NotFound404Page';
import ProjectDisplay from '../../components/ProjectPage/ProjectDisplay';

const ProjectPage = () => {
  const { id } = useParams();

  //replace
  const foundProject = projects.find((item) => item._id === id);

  return (
    <div className="border-outline bg-custom-white min-h-full w-full rounded-3xl border">
      {foundProject ? (
        <ProjectDisplay project={foundProject} />
      ) : (
        <NotFound404Page />
      )}
    </div>
  );
};

export default ProjectPage;
