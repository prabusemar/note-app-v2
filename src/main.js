import { getNotes, addNote, getArchivedNotes } from './data/notes-data';
import '../styles/main.css';
import './components/app-bar';
import './components/note-item';
import './components/note-form';
import './components/loading-indicator';
import Swal from 'sweetalert2';
import anime from 'animejs/lib/anime.es.js';

const notesList = document.querySelector('.notes-list');
const archivedNotesList = document.querySelector('.archived-notes-list');
const loadingIndicator = document.createElement('loading-indicator');

const moveNoteItem = (noteItem, toList) => {
    if (noteItem.parentElement) {
        noteItem.parentElement.removeChild(noteItem);
        toList.appendChild(noteItem);
        anime({
            targets: noteItem,
            opacity: [0, 1],
            translateY: [-20, 0],
            duration: 500,
            easing: 'easeInOutQuad',
        });
        noteItem.addEventListeners();
    }
};

const loadNotes = async () => {
    notesList.innerHTML = '';
    notesList.appendChild(loadingIndicator);
    try {
        const { data } = await getNotes();
        notesList.innerHTML = '';
        data.forEach(note => {
            const noteItem = document.createElement('note-item');
            noteItem.noteData = note;
            notesList.appendChild(noteItem);
            anime({
                targets: noteItem,
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 500,
                easing: 'easeInOutQuad',
            });

            noteItem.addEventListener('note-archived', () => {
                moveNoteItem(noteItem, archivedNotesList);
            });

            noteItem.addEventListener('note-unarchived', () => {
                moveNoteItem(noteItem, notesList);
            });
        });
    } catch (error) {
        Swal.fire('Error', error.message, 'error');
    } finally {
        if (notesList.contains(loadingIndicator)) {
            notesList.removeChild(loadingIndicator);
        }
    }
};

const loadArchivedNotes = async () => {
    archivedNotesList.innerHTML = '';
    archivedNotesList.appendChild(loadingIndicator);
    try {
        const { data } = await getArchivedNotes();
        archivedNotesList.innerHTML = '';
        data.forEach(note => {
            const noteItem = document.createElement('note-item');
            noteItem.noteData = note;
            archivedNotesList.appendChild(noteItem);
            anime({
                targets: noteItem,
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 500,
                easing: 'easeInOutQuad',
            });

            noteItem.addEventListener('note-archived', () => {
                moveNoteItem(noteItem, archivedNotesList);
            });

            noteItem.addEventListener('note-unarchived', () => {
                moveNoteItem(noteItem, notesList);
            });
        });
    } catch (error) {
        Swal.fire('Error', error.message, 'error');
    } finally {
        if (archivedNotesList.contains(loadingIndicator)) {
            archivedNotesList.removeChild(loadingIndicator);
        }
    }
};

const handleAddNote = async (title, body) => {
    notesList.appendChild(loadingIndicator);
    try {
        await addNote({ title, body });
        await loadNotes();
        Swal.fire('Success', 'Note added successfully', 'success');
    } catch (error) {
        Swal.fire('Error', error.message, 'error');
    } finally {
        if (notesList.contains(loadingIndicator)) {
            notesList.removeChild(loadingIndicator);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    loadNotes();
    loadArchivedNotes();

    document.querySelector('note-form').addEventListener('note-submit', async (event) => {
        const { title, body } = event.detail;
        await handleAddNote(title, body);
    });
});
