import { create } from 'zustand';
import axios from 'axios';

const useFlashcardStore = create((set, get) => ({
    flashcards: [],
    loading: false,
    error: null,

    fetchFlashcards: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get('http://localhost:8000/api/flashcards/');
            set({ flashcards: response.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    createFlashcard: async (newFlashcard) => {
        try {
            const response = await axios.post('http://localhost:8000/api/flashcards/', newFlashcard);
            set({ flashcards: [...get().flashcards, response.data] }); // Update state with new flashcard
        } catch (error) {
            set({ error: error.message });
        }
    },
    // TODO: Add actions afterwards
}));

export default useFlashcardStore; 