import { X } from 'lucide-react';
import PropTypes from 'prop-types';

import ModalProjectSettings from './ModalProjectSettings';
import ModalProjectTask from './ModalProjectTask';

const ModalProject = ({
  parentWidth,
  modalProject,
  setModalProject,
  projectOrTaskId,
}) => {
  return (
    <div
      style={
        modalProject
          ? {
              width: `${(parentWidth * 2) / 5 + 20}px`,
              minWidth: `${(parentWidth * 2) / 5 + 20}px`,
            }
          : { width: 0, minWidth: 0 }
      }
      className="min-h-full duration-600 ease-in-out"
    >
      <div
        style={
          modalProject
            ? {
                width: `${(parentWidth * 2) / 5}px`,
                minWidth: `${(parentWidth * 2) / 5}px`,
              }
            : { width: 0, minWidth: 0 }
        }
        className="fixed top-0 ml-5 h-screen overflow-hidden py-5 duration-600 ease-in-out"
      >
        <div
          style={{
            width: `${(parentWidth * 2) / 5}px`,
            minWidth: `${(parentWidth * 2) / 5}px`,
          }}
          className="border-outline bg-custom-white h-full w-full overflow-y-auto rounded-3xl border p-3"
        >
          <X
            onClick={() => setModalProject(false)}
            className="text-light-text hover:text-default-text ml-auto h-10 w-10 cursor-pointer duration-300"
          />

          {projectOrTaskId === 'project' ? (
            <ModalProjectSettings />
          ) : (
            <ModalProjectTask projectOrTaskId={projectOrTaskId} />
          )}
        </div>
      </div>
    </div>
  );
};

ModalProject.propTypes = {
  parentWidth: PropTypes.number.isRequired,
  projectOrTaskId: PropTypes.string.isRequired,
  modalProject: PropTypes.bool.isRequired,
  setModalProject: PropTypes.func.isRequired,
};

export default ModalProject;
