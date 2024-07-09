class NoteForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    addEventListeners() {
        const form = this.shadowRoot.querySelector('form');
        const titleInput = this.shadowRoot.querySelector('input[name="title"]');
        const bodyTextarea = this.shadowRoot.querySelector('textarea[name="body"]');
        const submitButton = this.shadowRoot.querySelector('button[type="submit"]');

        const validateForm = () => {
            let isValid = true;

            if (titleInput.value.trim()) {
                titleInput.classList.remove('invalid');
                titleInput.classList.add('valid');
            } else {
                titleInput.classList.remove('valid');
                titleInput.classList.add('invalid');
                isValid = false;
            }

            if (bodyTextarea.value.trim()) {
                bodyTextarea.classList.remove('invalid');
                bodyTextarea.classList.add('valid');
            } else {
                bodyTextarea.classList.remove('valid');
                bodyTextarea.classList.add('invalid');
                isValid = false;
            }

            submitButton.disabled = !isValid;
        };

        titleInput.addEventListener('input', validateForm);
        bodyTextarea.addEventListener('input', validateForm);

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const title = titleInput.value.trim();
            const body = bodyTextarea.value.trim();
            if (title && body) {
                this.dispatchEvent(new CustomEvent('note-submit', {
                    detail: { title, body },
                    bubbles: true,
                    composed: true,
                }));
                form.reset();
                validateForm();
            }
        });

        validateForm(); // Initial validation
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                form {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                input, textarea {
                    font-size: 1rem;
                    padding: 0.5rem;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                }
                input.valid, textarea.valid {
                    border-color: #28a745;
                }
                input.invalid, textarea.invalid {
                    border-color: #dc3545;
                }
                button {
                    padding: 0.5rem;
                    border: none;
                    border-radius: 4px;
                    background-color: #007bff;
                    color: white;
                    cursor: pointer;
                    font-size: 1rem;
                }
                button:disabled {
                    background-color: #ccc;
                    cursor: not-allowed;
                }
            </style>
            <form id="note-form">
                <input type="text" name="title" placeholder="Title" required>
                <textarea name="body" rows="5" placeholder="Body" required></textarea>
                <button type="submit" disabled>Add Note</button>
            </form>
        `;
    }
}

customElements.define('note-form', NoteForm);
