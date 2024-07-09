import { deleteNote, archiveNote, unarchiveNote } from '../data/notes-data';
import Swal from 'sweetalert2';
import anime from 'animejs/lib/anime.es.js';
import './modal.js';

class NoteItem extends HTMLElement {
  static get observedAttributes() {
    return ['archived'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set noteData(data) {
    this._data = data;
    this.render();
  }

  get noteData() {
    return this._data;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'archived') {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
    this.animateIn();
  }

  addEventListeners() {
    this.shadowRoot
      .querySelector('.delete-btn')
      .addEventListener('click', async () => {
        try {
          await deleteNote(this._data.id);
          this.animateOut(() => {
            this.remove();
          });
          Swal.fire('Success', 'Note deleted successfully', 'success');
        } catch (error) {
          Swal.fire('Error', error.message, 'error');
        }
      });

    this.shadowRoot
      .querySelector('.archive-btn')
      .addEventListener('click', async () => {
        try {
          if (this._data.archived) {
            await unarchiveNote(this._data.id);
            Swal.fire('Success', 'Note unarchived successfully', 'success');
            this._data.archived = false;
            this.setAttribute('archived', this._data.archived);
            this.dispatchEvent(new CustomEvent('note-unarchived', { detail: this._data }));
          } else {
            await archiveNote(this._data.id);
            Swal.fire('Success', 'Note archived successfully', 'success');
            this._data.archived = true;
            this.setAttribute('archived', this._data.archived);
            this.dispatchEvent(new CustomEvent('note-archived', { detail: this._data }));
          }
        } catch (error) {
          Swal.fire('Error', error.message, 'error');
        }
      });

    this.shadowRoot
      .querySelector('.more-btn')
      .addEventListener('click', () => {
        const modal = document.createElement('note-modal');
        modal.content = this._data;
        document.body.appendChild(modal);
      });
  }

  animateIn() {
    anime({
      targets: this.shadowRoot.querySelector('.note-card'),
      opacity: [0, 1],
      translateY: [-30, 0],
      duration: 1000,
      easing: 'easeOutExpo'
    });
  }

  animateOut(callback) {
    anime({
      targets: this.shadowRoot.querySelector('.note-card'),
      opacity: [1, 0],
      translateY: [0, -30],
      duration: 1000,
      easing: 'easeInExpo',
      complete: callback
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .note-card {
          background-color: ${this.hasAttribute('archived') ? '#f0f0f0' : '#ffff88'};
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 1rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s, background-color 0.2s;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin: 1rem;
          box-sizing: border-box;
          overflow: hidden;
        }
        .note-card:hover {
          transform: translateY(-5px);
        }
        .note-title {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
          color: #333;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .note-body {
          font-size: 1rem;
          color: #666;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3; /* number of lines to show */
          -webkit-box-orient: vertical;
        }
        .note-buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 1rem;
        }
        .note-button {
          cursor: pointer;
          padding: 0.3rem 0.5rem; /* Adjusted padding */
          border: none;
          border-radius: 4px;
          font-size: 0.9rem;
          transition: background-color 0.3s;
          margin: 0 0.2rem; /* Added margin */
        }
        .delete-btn {
          background-color: #dc3545;
          color: white;
        }
        .delete-btn:hover {
          background-color: #c82333;
        }
        .archive-btn {
          background-color: #007bff;
          color: white;
        }
        .archive-btn:hover {
          background-color: #0056b3;
        }
        .more-btn {
          background-color: #6c757d;
          color: white;
        }
        .more-btn:hover {
          background-color: #5a6268;
        }
      </style>
      <div class="note-card">
        <div class="card-body">
          <h5 class="note-title" title="${this._data.title}">${this._data.title}</h5>
          <p class="note-body">${this._data.body}</p>
          <div class="note-buttons">
            <button class="more-btn note-button">Lihat Selengkapnya</button>
            <button class="archive-btn note-button">${this._data.archived ? 'Unarchive' : 'Archive'}</button>
            <button class="delete-btn note-button">Delete</button>
          </div>
        </div>
      </div>
    `;
    this.addEventListeners();
  }
}

customElements.define('note-item', NoteItem);
