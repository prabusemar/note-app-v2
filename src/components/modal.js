import anime from 'animejs/lib/anime.es.js';

class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set content(data) {
    this._data = data;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .modal {
          display: flex;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          justify-content: center;
          align-items: center;
          z-index: 1000;
          opacity: 0;
        }
        .modal-content {
          background-color: #fff;
          padding: 1rem;
          border-radius: 8px;
          max-width: 90%;
          max-height: 90%;
          width: auto;
          overflow: auto;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #ddd;
          padding-bottom: 0.5rem;
          margin-bottom: 1rem;
        }
        .modal-title {
          font-size: 1.5rem;
          margin: 0;
          word-wrap: break-word;
        }
        .close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }
        .modal-body {
          font-size: 1rem;
          line-height: 1.5;
          word-wrap: break-word;
        }
      </style>
      <div class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">${this._data.title}</h2>
            <button class="close-btn">&times;</button>
          </div>
          <div class="modal-body">${this._data.body}</div>
        </div>
      </div>
    `;

    this.addEventListeners();
    this.animateIn();
  }

  addEventListeners() {
    const closeModal = () => {
      this.animateOut(() => {
        this.remove();
      });
    };

    const closeButton = this.shadowRoot.querySelector('.close-btn');
    const modalOverlay = this.shadowRoot.querySelector('.modal');

    closeButton.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (event) => {
      if (event.target === modalOverlay) {
        closeModal();
      }
    });
  }

  animateIn() {
    anime({
      targets: this.shadowRoot.querySelector('.modal'),
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutExpo'
    });
  }

  animateOut(callback) {
    anime({
      targets: this.shadowRoot.querySelector('.modal'),
      opacity: [1, 0],
      duration: 1000,
      easing: 'easeInExpo',
      complete: callback
    });
  }
}

customElements.define('note-modal', Modal);
