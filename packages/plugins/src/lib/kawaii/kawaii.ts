import type { KawaiiPluginFunc, KawaiiProps } from './types';
import { createCharacter } from './elements';

const defaultProps = {
    assets: {
        path: 'https://imgur.com/',
        pictures: [],
    },
} satisfies KawaiiProps;

const kawaii: KawaiiPluginFunc = (props = {}) => {
    const path = props.assets?.path || defaultProps.assets.path;
    const pictures = props.assets?.pictures || defaultProps.assets.pictures.slice();

    const count = Math.max(0, Math.min(props.count || Math.round(pictures.length / 2), 4));

    return ({ node }) => {
        //
        for (let i = 0; i < count; i++) {
            const character = createCharacter(path + pictures[i], i);

            node.insertAdjacentElement('afterend', character);
        }
    }
}

export { kawaii }