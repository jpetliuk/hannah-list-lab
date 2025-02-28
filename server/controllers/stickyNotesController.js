import User from '../models/user.model.js';

export const upsertStickyNote = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { stickyNoteTitle, stickyNoteText, stickyNoteColor, _id } = req.body;

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!_id || !stickyNoteColor) {
      return res
        .status(400)
        .json({ message: 'Sticky note color and _id are required.' });
    }

    let isNew;
    let updatedStickyNotes;
    // Try to update the sticky note if it exists
    updatedStickyNotes = await User.findOneAndUpdate(
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

    if (updatedStickyNotes) {
      isNew = false;
    } else {
      isNew = true;

      // If no sticky note was updated, create a new one
      const newStickyNote = {
        _id,
        stickyNoteTitle,
        stickyNoteText,
        stickyNoteColor,
      };

      updatedStickyNotes = await User.findOneAndUpdate(
        { _id: req.user.id },
        { $push: { stickyNotes: newStickyNote } },
        { new: true, runValidators: true },
      ).select('stickyNotes');
    }

    res.status(200).json({
      message: isNew
        ? 'Sticky note created successfully'
        : 'Sticky note updated successfully',
      updatedStickyNotes,
    });
  } catch (error) {
    console.log('Error processing sticky note:', error.message);
    res.status(500).json({ message: error.message });
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
      updatedStickyNotes: user.stickyNotes,
    });
  } catch (error) {
    console.log('Error deleting the project: ', error.message);
    res.status(400).json({ message: error.message });
  }
};
