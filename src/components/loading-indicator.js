class LoadingIndicator extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <style>
                .spinner {
                    border: 4px solid rgba(0, 0, 0, 0.1);
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    border-left-color: #09f;
                    animation: spin 1s ease infinite;
                }

                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }

                .loading-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                    width: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    background: rgba(255, 255, 255, 0.8);
                }
            </style>
            <div class="loading-container">
                <div class="spinner"></div>
            </div>
        `;
    }
}

customElements.define('loading-indicator', LoadingIndicator);
