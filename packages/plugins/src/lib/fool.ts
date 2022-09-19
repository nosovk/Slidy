import type { PluginArgs } from '../types';

/**
 * Changes axis depending on the parity of the slide index
 * Plug it on at April Fool's Day and you won't get fired!
 */
export function fool() {
    return ({ node, options }: PluginArgs) => {
        function index(event: CustomEvent<{ index: number }>) {
            const index = event.detail.index;

            Promise.resolve(index % 2 === 0).then((val) => {
                Promise.resolve(val ? 'x' : 'y').then((axis) => {
                    options['axis'] = axis as 'x' | 'y';
                });
            });
        }

        node.addEventListener('destroy', function destroy() {
            node.removeEventListener('destroy', destroy);
            node.removeEventListener('index', index as EventListener);
        });

        node.addEventListener('index', index as EventListener);
    };
}