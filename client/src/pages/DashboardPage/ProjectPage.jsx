import { useParams } from 'react-router-dom';
import { projects } from '../../utils/MockData';

import NotFound404Page from './NotFound404Page';
import ProjectDisplay from '../../components/ProjectDisplay';

const ProjectPage = () => {
  const { id } = useParams();

  //replace
  const foundProject = projects.find((item) => item._id === id);

  return !foundProject ? (
    <NotFound404Page />
  ) : (
    <ProjectDisplay project={foundProject} />
  );
};

export default ProjectPage;
