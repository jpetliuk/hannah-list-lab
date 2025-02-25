import { useState } from 'react';

import { stickyNotes } from '../../utils/MockData';
import { useEffect } from 'react';

const StickyNotesPage = () => {
  const [stickyNotesList, setStickyNotesList] = useState(stickyNotes);

  const [updateServer, setUpdateServer] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(false);
  const [newTitle, setNewTitle] = useState(false);
  const [newText, setNewText] = useState(false);

  const newNote = () => {
    const colorOptions = [
      '#FFB3B3',
      '#B3FFF7',
      '#B3FFB6',
      '#F9FFB3',
      '#FFDBB3',
      '#FFB3D1',
      '#D1B3FF',
      '#B3C7FF',
      '#FFE1B3',
      '#D4FFB3',
      '#FFC3A0',
      '#FFB5E8',
      '#99DDFF',
      '#B3FFB6',
      '#FFD1DC',
      '#DAB3FF',
      '#FAFAD2',
      '#ADD8E6',
      '#FFDAB9',
      '#F3E5AB',
      '#FFB3B3',
    ];

    const newNote = {
      stickyNoteTitle: '',
      stickyNoteText: '',
      stickyNoteColor:
        colorOptions[Math.floor(Math.random() * colorOptions.length)],
      _id: Date.now().toString(),
    };

    setStickyNotesList([...stickyNotesList, newNote]);
  };

  const handleTextChange = (e) => {
    setNewText(e.target.value);
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const removeNote = () => {
    const updatedNotes = stickyNotesList.filter(
      (note) => note._id != selectedNoteId,
    );

    setNewTitle(false);
    setNewText(false);
    setSelectedNoteId(false);

    setStickyNotesList(updatedNotes);
  };

  const saveNote = () => {
    const updatedNotes = stickyNotesList.map((note) =>
      note._id === selectedNoteId
        ? {
            ...note,
            ...(newTitle && { stickyNoteTitle: newTitle }),
            ...(newText && { stickyNoteText: newText }),
          }
        : note,
    );
    setNewTitle(false);
    setNewText(false);
    setSelectedNoteId(false);

    setStickyNotesList(updatedNotes);
  };

  const handleSelectNote = (id) => {
    if (selectedNoteId === id) return;
    setSelectedNoteId(id);
    setNewTitle(false);
    setNewText(false);
  };

  const areArraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
      if (JSON.stringify(arr1[i]) !== JSON.stringify(arr2[i])) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    //send to server
    const listToServer = stickyNotesList.filter(
      (note) =>
        note.stickyNoteTitle.trim() !== '' || note.stickyNoteText.trim() !== '',
    );

    setUpdateServer(listToServer);

    if (areArraysEqual(updateServer, listToServer))
      return console.log('no changes');

    if (updateServer === false) return;
    console.log('To Server: ', listToServer);
  }, [stickyNotesList]);

  return (
    <div className="bg-custom-white h-full w-full rounded-3xl p-8">
      <div>
        <h1 className="text-default-text p-6 pt-0 text-4xl font-bold">
          Sticky Wall
        </h1>

        <div className="bg-white-gray border-light-gray grid grid-cols-[repeat(auto-fill,_300px)] justify-center gap-6 rounded-3xl border p-8">
          {stickyNotesList.map((note) => (
            <div
              key={note._id}
              onClick={() => handleSelectNote(note._id)}
              className={`h-75 w-75 relative overflow-hidden ${selectedNoteId === note._id ? 'z-50 scale-110 cursor-auto shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]' : 'hover:scale-102 cursor-pointer'} rounded-[10px] p-2.5 shadow duration-300 hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]`}
              style={{ backgroundColor: note.stickyNoteColor }}
            >
              {selectedNoteId === note._id ? (
                <>
                  <input
                    type="text"
                    defaultValue={note.stickyNoteTitle}
                    className="text-default-text focus:outline-stickyNote mb-2 w-full resize-none text-xl font-bold focus:rounded-md focus:outline-dashed focus:outline-1 focus:outline-offset-2"
                    onChange={handleTitleChange}
                    maxLength="24"
                  />
                  <textarea
                    className="space-mono-regular focus:outline-stickyNote text-default-text focus:outline-offset-3 h-60 w-full resize-none whitespace-pre-line text-xs focus:rounded-md focus:outline-dashed focus:outline-1"
                    defaultValue={note.stickyNoteText}
                    maxLength="300"
                    onChange={handleTextChange}
                  />
                  <button
                    className="bg-button-yellow w-15 absolute bottom-0 right-0 h-7 cursor-pointer rounded-tl-lg text-sm font-semibold"
                    onClick={saveNote}
                  >
                    save
                  </button>
                  <button
                    className="bg-light-gray w-15 absolute bottom-0 left-0 h-7 cursor-pointer rounded-tr-lg text-sm font-semibold"
                    onClick={removeNote}
                  >
                    remove
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-default-text pb-2 text-xl font-bold">
                    {note.stickyNoteTitle}
                  </h2>
                  <p className="text-default-text space-mono-regular whitespace-pre-line text-xs">
                    {note.stickyNoteText}
                  </p>
                </>
              )}
            </div>
          ))}

          <div
            className="h-75 w-75 hover:scale-102 bg-light-gray flex cursor-pointer items-center justify-center rounded-[10px] p-2.5 duration-300 hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]"
            onClick={newNote}
          >
            <h2 className="text-default-text pb-2 text-7xl font-light">+</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StickyNotesPage;
