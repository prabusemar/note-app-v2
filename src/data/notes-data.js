const BASE_URL = 'https://notes-api.dicoding.dev/v2';

const fetchData = async (endpoint, options = {}) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        console.error('Network response was not ok', response.statusText);
        throw new Error('Network response was not ok');
    }

    return response.json();
};

const getNotes = () => fetchData('/notes');
const getArchivedNotes = () => fetchData('/notes/archived');
const addNote = (note) => fetchData('/notes', {
    method: 'POST',
    body: JSON.stringify(note),
});
const deleteNote = (id) => fetchData(`/notes/${id}`, {
    method: 'DELETE',
});
const archiveNote = (id) => fetchData(`/notes/${id}/archive`, {
    method: 'POST',
});
const unarchiveNote = (id) => fetchData(`/notes/${id}/unarchive`, {
    method: 'POST',
});

export { getNotes, getArchivedNotes, addNote, deleteNote, archiveNote, unarchiveNote };
