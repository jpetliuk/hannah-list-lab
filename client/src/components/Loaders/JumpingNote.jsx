import './JumpingNote.css';

const JumpingNote = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="scale-150">
        <div className="relative h-12 w-12">
          <div className="loader-shadow"></div>
          <div className="loader-box"></div>
        </div>
      </div>
    </div>
  );
};

export default JumpingNote;
