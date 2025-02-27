import User from '../models/user.model.js';

export const createStickyNote = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { stickyNoteTitle, stickyNoteText, stickyNoteColor, _id } = req.body;

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!stickyNoteTitle && !stickyNoteText) {
      return res
        .status(400)
        .json({ message: 'Sticky note name and description or required.' });
    }

    const newStickyNote = {
      stickyNoteTitle,
      stickyNoteText,
      stickyNoteColor,
      _id,
    };

    const updatedStickyNotes = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $push: { stickyNotes: newStickyNote } },
      { new: true, runValidators: true },
    ).select('stickyNotes');

    res.status(201).json({
      message: 'Sticky note created successfully',
      newStickyNote,
      updatedStickyNotes,
    });
  } catch (error) {
    console.log('Error creating Sticky note: ', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const updateStickyNote = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { stickyNoteTitle, stickyNoteText, stickyNoteColor, _id } = req.body;

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!stickyNoteTitle || !stickyNoteText || !stickyNoteColor || !_id) {
      return res
        .status(400)
        .json({ message: 'Missing required fields for sticky note update.' });
    }

    const updatedStickyNotes = await User.findOneAndUpdate(
      { _id: req.user.id, 'stickyNotes._id': _id },
      {
        $set: {
          'stickyNotes.$.stickyNoteTitle': stickyNoteTitle,
          'stickyNotes.$.stickyNoteText': stickyNoteText,
          'stickyNotes.$.stickyNoteColor': stickyNoteColor,
        },
      },
      { new: true },
    ).select('stickyNotes');

    if (!updatedStickyNotes) {
      return res.status(404).json({ message: 'Sticky note not found.' });
    }

    res.status(200).json({
      message: 'Sticky note updated successfully',
      updatedStickyNotes,
    });
  } catch (error) {
    console.log('Error updating the project: ', error.message);
    res.status(400).json({ message: error.message });
  }
};

export const deleteStickyNote = async (req, res) => {
  try {
    const { _id } = req.body;

    const user = await User.findOneAndUpdate(
      { _id: req.user.id, 'stickyNotes._id': _id },
      { $pull: { stickyNotes: { _id: _id } } },
      { new: true },
    ).select('stickyNotes');

    if (!user)
      return res.status(404).json({ message: 'Sticky note not found' });

    res.status(200).json({
      message: 'Sticky note deleted successfully',
      stickyNotes: user.stickyNotes,
    });
  } catch (error) {
    console.log('Error deleting the project: ', error.message);
    res.status(400).json({ message: error.message });
  }
};
