import { url } from './utils';

const NAME = 'slidy-plugin-kawaii-character';

class KawaiiCharacter extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' }).innerHTML = `
            <style>
                :host {
                    grid-area: slides;
                    position: absolute;

                    pointer-events: none;

                    left: var(--left);
                    bottom: var(--bottom);
                    top: var(--top);
                    right: var(--right);

                    height: 30%;
                    width: 30%;
                }

                div {
                    height: 100%;
                    width: 100%;

                    pointer-events: none;

                    background-repeat: no-repeat;
                    background-size: contain;
                    background-position: center;
                    background-image: var(--bg);
                }
            </style>

            <div></div>
        `;
    }

    get root() {
        return this.parentElement as HTMLElement;
    }
    get node() {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.shadowRoot!.firstElementChild!.nextElementSibling as HTMLImageElement;
    }

    set src(value: string) {
        this.node.style.setProperty('--bg', url(value));
    }

    set index(value: number) {
        this.style.setProperty(
            `--${value % 2 == 0 ? 'right' : 'left'}`,
            '0'
        );
        this.style.setProperty(
            `--${(value % 2 == 0 ? value : value - 1) == 0 ? 'bottom' : 'top'}`,
            '0'
        );
    }

    connectedCallback() {
        const constrain = 20;

        this.root.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { x, y, height, width } = this.node.getBoundingClientRect();

            // prettier-ignore
            const transform = `perspective(100vmax) rotateX(${ -(clientY - y - height / 2) / constrain}deg) rotateY(${(clientX - x - width / 2) / constrain}deg)`;

            this.node.style.transform = transform;
        });
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'slidy-plugin-kawaii-character': KawaiiCharacter;
    }
}

let defined = false;

const createCharacter = (source: string, index: number) => {
    if (!defined) customElements.define(NAME, KawaiiCharacter), defined = true;

    const character = document.createElement('slidy-plugin-kawaii-character');

    character.src = source;
    character.index = index;

    return character;
}

export { createCharacter }