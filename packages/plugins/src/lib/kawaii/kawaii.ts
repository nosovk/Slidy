import type { KawaiiPluginFunc, KawaiiProps } from './types';
import { createCharacter } from './elements';
import { random } from './utils';

const defaultProps = {
    assets: {
        path: 'https://imgur.com/',
        pictures: [],
    },
} satisfies KawaiiProps;

const kawaii: KawaiiPluginFunc = (props = {}) => {
    const path = props.assets?.path || defaultProps.assets.path;
    const pictures = props.assets?.pictures || defaultProps.assets.pictures.slice();

    const length = pictures.length;
    const max = length - 1;

    const count = Math.max(0, Math.min(props.count || Math.round(length / 2), 4));

    return ({ node }) => {
        if (!count || !length) {
            return console.warn(`@slidy/plugins(kawaii): not enough pictures were provided or count `)
        }

        /**
         * Set of used images
         */
        const used = new Set<number>();

        for (let i = 0; i < count; i++) {
            const index = (() => {
                let idx = random(0, max);

                while (used.has((idx)) && used.size < max) {
                    idx = random(0, max);
                }

                return used.add(idx), idx;
            })();

            const character = node.insertAdjacentElement('afterend', createCharacter(path + pictures[index], i));
            character;
        }

        const ssu = new SpeechSynthesisUtterance('kawaii desu');

        function index() {
            if (!(speechSynthesis.speaking || speechSynthesis.pending || speechSynthesis.paused)) {
                speechSynthesis.speak(ssu);
            }
        }

        function destroy() {
            node.removeEventListener('destroy', destroy);
            node.removeEventListener('index', index);
        }

        node.addEventListener('index', index);
        node.addEventListener('destroy', destroy);
    }
}

export { kawaii }