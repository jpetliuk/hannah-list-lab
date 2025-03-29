import { upsertStickyNote, deleteStickyNote } from '../../api/userApi';

export const createStickyNoteSlice = (set) => ({
  stickyNotes: [],

  /**
   * Creates or updates a sticky note
   * @param {Object} stickyNote - The sticky note data
   */
  upsertStickyNote: async ({
    stickyNoteTitle,
    stickyNoteText,
    stickyNoteColor,
    _id,
  }) => {
    try {
      const data = await upsertStickyNote({
        stickyNoteTitle,
        stickyNoteText,
        stickyNoteColor,
        _id,
      });
      set({ stickyNotes: data.updatedStickyNotes.stickyNotes });
      return { success: true };
    } catch (error) {
      console.error('Error upserting sticky note:', error);
      set({ error: 'Failed to save sticky note' });
      return { success: false, error };
    }
  },

  /**
   * Deletes a sticky note
   * @param {string} id - ID of the sticky note to delete
   */
  deleteStickyNote: async (id) => {
    try {
      const data = await deleteStickyNote(id);
      set({ stickyNotes: data.updatedStickyNotes });
      return { success: true };
    } catch (error) {
      console.error('Error deleting sticky note:', error);
      set({ error: 'Failed to delete sticky note' });
      return { success: false, error };
    }
  },
});
