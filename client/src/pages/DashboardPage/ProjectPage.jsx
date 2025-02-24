import { useParams } from 'react-router-dom';
import { projects } from '../../utils/MockData';

import NotFound404Page from './NotFound404Page';
import ProjectDisplay from '../../components/ProjectPage/ProjectDisplay';

const ProjectPage = () => {
  const { id } = useParams();

  //replace
  const foundProject = projects.find((item) => item._id === id);

  return foundProject ? (
    <ProjectDisplay project={foundProject} />
  ) : (
    <NotFound404Page />
  );
};

export default ProjectPage;
