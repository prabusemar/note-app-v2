class AppBar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <style>
                header {
                    background-color: #6200ea;
                    color: #ffffff;
                    padding: 1rem;
                    text-align: center;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                header h1 {
                    margin: 0;
                    font-size: 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                header h1 i {
                    margin-right: 0.5rem;
                }
            </style>
            <header>
                <h1><i class="fas fa-sticky-note"></i> Prabusemar's Note</h1>
            </header>
        `;
    }
}

customElements.define('app-bar', AppBar);
