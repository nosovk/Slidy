const ID = 'slidy-fullscreen-button';
const ICON_ATTRIBUTES = 'stroke="var(--slidy-arrow-icon-color, currentColor)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75"';
const MAXIMIZE_ICON = `<svg fill="none" viewBox="0 0 24 24"><path ${ICON_ATTRIBUTES} d="M4.8 14.8v2.4c0 1.2.8 2 2 2h2.5M19.3 14.8v2.4a2 2 0 0 1-2 2h-2.6M19.3 9.3V6.7a2 2 0 0 0-2-2h-2.6M4.8 9.3V6.7c0-1 .8-2 2-2h2.5"/></svg>`;
const MINIMIZE_ICON = `<svg fill="none" viewBox="0 0 24 24"><path ${ICON_ATTRIBUTES} d="M9.25 19.25v-2.5a2 2 0 0 0-2-2h-2.5M14.75 19.25v-2.5a2 2 0 0 1 2-2h2.5M14.75 4.75v2.5a2 2 0 0 0 2 2h2.5M9.25 4.75v2.5a2 2 0 0 1-2 2h-2.5"/></svg>`;

const MAXIMIZE_LABEL = 'Enter fullscreen mode';
const MINIMIZE_LABEL = 'Leave fullscreen mode';

const MAP = {
  maximize: {
    innerHTML: MAXIMIZE_ICON,
    ariaLabel: MAXIMIZE_LABEL
  },
  minimize: {
    innerHTML: MINIMIZE_ICON,
    ariaLabel: MINIMIZE_LABEL
  }
} as const;

class Button extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" }).innerHTML = `<style>:host{width:2.25em;height:2.25em;grid-template:1fr/1fr;grid-area:slides;place-content:center;place-items:center;display:grid;position:absolute;bottom:1em;right:4.25em}:host>button{pointer-events:all;background-color:var(--slidy-counter-bg,#4e4e4ebf);cursor:pointer;width:2.7em;height:2.7em;border:none;border-radius:100%;outline:none;justify-content:center;align-items:center;padding:.25em;font-family:inherit;display:flex}:host>button:disabled{opacity:.75;cursor:not-allowed}:host>button:focus-visible{outline:2px dashed var(--slidy-focus-ring-color,#c9c9c9e6);outline-offset:calc(.225em);border-radius:50%}:host>button svg{width:1.51875em;height:1.51875em}</style><button type="button"></button>`
  }

  get button() {
    return this.shadowRoot!.childNodes[1] as HTMLButtonElement;
  }

  set type(type: "maximize" | "minimize") {
    Object.assign(this.button, MAP[type]);
  }
}

let defined = false;

const createButton = (onclick: () => void, type: "maximize" | "minimize") => {
  if (!defined) {
    customElements.define(ID, Button), defined = true;
  }

  const button = document.createElement(ID) as Button;

  return button.onclick = onclick, button.type = type, button;
}

export { createButton }