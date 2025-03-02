import { useParams } from 'react-router-dom';
import useUserStore from '../../store/userStore';

import NotFound404Page from './NotFound404Page';
import ProjectDisplayer from '../../components/ProjectPage/ProjectDisplayer';

import { useState } from 'react';
import { useEffect } from 'react';

const ProjectPage = () => {
  const { projects } = useUserStore();
  const { id } = useParams();

  const [currentProject, setCurrentProject] = useState(false);

  useEffect(() => {
    setCurrentProject(null);
    const projectFound = projects.find((project) => project._id === id);

    setCurrentProject(projectFound);
  }, [projects, id]);

  return (
    <div className="border-outline bg-custom-white min-h-full w-full rounded-3xl border">
      {currentProject ? <ProjectDisplayer currentProject={currentProject} /> : <NotFound404Page />}
    </div>
  );
};

export default ProjectPage;
