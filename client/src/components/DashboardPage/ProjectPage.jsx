import { useParams } from 'react-router-dom';
import useUserStore from '../../store/userStore';

import NotFound404Page from './NotFound404Page';
import ProjectDisplayer from '../../components/ProjectPage/ProjectDisplayer';
import ModalProjectSettings from '../../components/ProjectPage/ModalProjectSettings';

import { useState, useEffect, useRef } from 'react';

const ProjectPage = () => {
  const { id } = useParams();
  const { currentProject, setCurrentProject, projects } = useUserStore();

  // Set current project
  useEffect(() => {
    const projectFound = projects.find((project) => project._id === id);

    setCurrentProject(projectFound);
  }, [projects, id, setCurrentProject]);

  // Modal editing
  const [modalProject, setModalProject] = useState(false);
  const [projectOrTaskId, setProjectOrTaskId] = useState('project');

  // Close modal on project id change (navbar)
  useEffect(() => {
    setModalProject(false);
  }, [id]);

  // Parent width for modal
  const parentRef = useRef(null);
  const [parentWidth, setParentWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (parentRef.current) {
        setParentWidth(parentRef.current.offsetWidth);
      }
    };

    updateWidth(); // Initial width
    window.addEventListener('resize', updateWidth); // Update on resize

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <div ref={parentRef} className="flex min-h-full w-full">
      <div className="border-outline bg-custom-white min-h-full w-full rounded-3xl border">
        {currentProject ? (
          <ProjectDisplayer
            setModalProject={setModalProject}
            setProjectOrTaskId={setProjectOrTaskId}
          />
        ) : (
          <NotFound404Page />
        )}
      </div>
      {currentProject ? (
        <ModalProjectSettings
          parentWidth={parentWidth}
          modalProject={modalProject}
          setModalProject={setModalProject}
          projectOrTaskId={projectOrTaskId}
        />
      ) : null}
    </div>
  );
};

export default ProjectPage;
