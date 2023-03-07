const ID = 'slidy-fullscreen-button';

class Button extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" }).innerHTML = `
    <style>
    :host {
      grid-area: slides;
      width: 2.25em;
      height: 2.25em;
      grid-template: 1fr / 1fr;
      place-content: center;
      place-items: center;
      display: grid;
      position: absolute;
      bottom: 1em;
      right: 4.25em;
    }

    :host > button {
      pointer-events: all;
      fill: var(--slidy-arrow-icon-color, currentColor);
      background-color: var(--slidy-counter-bg, #4e4e4ebf);
      cursor: pointer;
      border: none;
      border-radius: 100%;
      outline: none;
      justify-content: center;
      align-items: center;
      padding: 0.25em;
      font-family: inherit;
      display: flex;
      width: 2.7em;
      height: 2.7em;
    }

    :host > button:disabled {
      opacity: 0.75;
      cursor: not-allowed;
    }

    :host > button:focus-visible {
      outline: 2px dashed var(--slidy-focus-ring-color, #c9c9c9e6);
      outline-offset: calc(0.25 * 2.25em);
      border-radius: 50%;
    }

    :host > button svg {
      width: calc(0.675 * 2.25em);
      height: calc(0.675 * 2.25em);
    }
    </style>

    <button type="button" aria-label="Enter fullscreen mode"><svg fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4.8 14.8v2.4c0 1.2.8 2 2 2h2.5M19.3 14.8v2.4a2 2 0 0 1-2 2h-2.6M19.3 9.3V6.7a2 2 0 0 0-2-2h-2.6M4.8 9.3V6.7c0-1 .8-2 2-2h2.5"/></svg></button>
    `
  }
}

let defined = false;

const createButton = (onclick: () => void) => {
  if (!defined) {
    customElements.define(ID, Button), defined = true;
  }

  const button = document.createElement(ID) as Button;

  return button.onclick = onclick, button;
}

export { createButton }