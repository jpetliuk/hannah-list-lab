import './JumpingNote.css';

const JumpingNote = () => {
  return (
    <div className="border-outline bg-custom-white flex h-full w-full items-center justify-center rounded-3xl border">
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
