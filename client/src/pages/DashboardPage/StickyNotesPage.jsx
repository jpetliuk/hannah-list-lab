import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import useUserStore from '../../store/userStore';

const StickyNotesPage = () => {
  const { stickyNotes, updateStickyNotes } = useUserStore();

  // for ui
  const [stickyNotesList, setStickyNotesList] = useState(stickyNotes);

  // validates if it should be sent to server
  const [sendToServer, setSendToServer] = useState(false);

  const [selectedNoteId, setSelectedNoteId] = useState(false);
  const [newColor, setNewColor] = useState(false);
  const [newTitle, setNewTitle] = useState(false);
  const [newText, setNewText] = useState(false);

  const randomColor = () => {
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

    return colorOptions[Math.floor(Math.random() * colorOptions.length)];
  };

  const handleTextChange = (e) => {
    setNewText(e.target.value);
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleSelectNote = (note) => {
    if (selectedNoteId === note._id) return;

    if (selectedNoteId !== false) saveNote();

    setSelectedNoteId(note._id);
    setNewColor(note.stickyNoteColor);

    note.stickyNoteText ? setNewText(note.stickyNoteText) : setNewText(false);
    note.stickyNoteTitle
      ? setNewTitle(note.stickyNoteTitle)
      : setNewTitle(false);
  };

  const areArraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;

    return arr1.every((obj1, index) => {
      const obj2 = arr2[index];

      // Compare values directly (since keys are the same)
      return Object.values(obj1).every(
        (value, i) => value === Object.values(obj2)[i],
      );
    });
  };

  const newNote = () => {
    const newNote = {
      stickyNoteTitle: '',
      stickyNoteText: '',
      stickyNoteColor: randomColor(),
      _id: nanoid(),
    };

    setStickyNotesList([...stickyNotesList, newNote]);
  };

  const removeNote = () => {
    const updatedNotes = stickyNotesList.filter(
      (note) => note._id != selectedNoteId,
    );

    //reset states
    setNewTitle(false);
    setNewText(false);
    setSelectedNoteId(false);
    setNewColor(false);

    setStickyNotesList(updatedNotes);
    setSendToServer(true);
  };

  const saveNote = () => {
    const updatedNotes = stickyNotesList.map((note) =>
      note._id === selectedNoteId
        ? {
            ...note,
            ...(newTitle !== false && { stickyNoteTitle: newTitle }),
            ...(newText !== false && { stickyNoteText: newText }),
            ...(newColor !== false && { stickyNoteColor: newColor }),
          }
        : note,
    );

    if (!areArraysEqual(updatedNotes, stickyNotesList)) {
      setStickyNotesList(updatedNotes);

      if (newText != '' || newTitle != '') {
        setSendToServer(true);
      }
    }

    //reset states
    setNewTitle(false);
    setNewText(false);
    setSelectedNoteId(false);
    setNewColor(false);
  };

  const changeNoteColor = () => {
    const color = randomColor();

    setNewColor(color);
  };

  useEffect(() => {
    if (sendToServer) {
      const filteredStickyNotes = stickyNotesList.filter(
        (note) =>
          note.stickyNoteTitle.trim() !== '' ||
          note.stickyNoteText.trim() !== '',
      );

      updateStickyNotes(filteredStickyNotes);
      setSendToServer(false);
    }
  }, [sendToServer, stickyNotesList, updateStickyNotes]);

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
              onClick={() => handleSelectNote(note)}
              className={`relative h-75 w-75 overflow-hidden ${selectedNoteId === note._id ? 'z-50 scale-110 cursor-auto shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]' : 'cursor-pointer hover:scale-102'} rounded-[10px] p-2.5 shadow duration-300 hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]`}
              style={{
                backgroundColor:
                  selectedNoteId === note._id ? newColor : note.stickyNoteColor,
              }}
            >
              {selectedNoteId === note._id ? (
                <>
                  <input
                    type="text"
                    name="stickyNoteTitle"
                    defaultValue={note.stickyNoteTitle}
                    className="text-default-text focus:outline-stickyNote mb-2 w-full resize-none text-xl font-bold focus:rounded-md focus:outline-1 focus:outline-offset-2 focus:outline-dashed"
                    onChange={handleTitleChange}
                    maxLength="24"
                  />
                  <textarea
                    name="stickyNoteText"
                    className="space-mono-regular focus:outline-stickyNote text-default-text h-60 w-full resize-none text-xs whitespace-pre-line focus:rounded-md focus:outline-1 focus:outline-offset-3 focus:outline-dashed"
                    defaultValue={note.stickyNoteText}
                    maxLength="300"
                    onChange={handleTextChange}
                  />
                  <button
                    className="bg-button-yellow text-default-text absolute right-0 bottom-0 h-7 w-15 cursor-pointer rounded-tl-lg text-sm font-semibold"
                    onClick={saveNote}
                  >
                    save
                  </button>
                  <button
                    className="bg-light-gray text-default-text absolute bottom-0 left-0 h-7 w-15 cursor-pointer rounded-tr-lg text-sm font-semibold"
                    onClick={removeNote}
                  >
                    remove
                  </button>
                  <button
                    className="hover:text-default-text absolute top-0 right-0 h-7 w-7 cursor-pointer rounded-bl-lg bg-[#f6f6f6B3] text-sm font-semibold text-transparent duration-300 hover:w-15"
                    onClick={changeNoteColor}
                  >
                    color
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-default-text pb-2 text-xl font-bold select-none">
                    {note.stickyNoteTitle}
                  </h2>
                  <p className="text-default-text space-mono-regular text-xs whitespace-pre-line select-none">
                    {note.stickyNoteText}
                  </p>
                </>
              )}
            </div>
          ))}

          <div
            className="bg-light-gray flex h-75 w-75 cursor-pointer items-center justify-center rounded-[10px] p-2.5 duration-300 hover:scale-102 hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]"
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
