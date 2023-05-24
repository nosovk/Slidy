import type { PluginArgs } from '../../types';

interface KawaiiProps {
    /**
     * Where to get the assets from
     */
    assets?: {
        /**
         * @example `https://<your image hosting>.com/`
         */
        path?: string;
        /**
         * @example ['icecream.png', 'popcorn.jpg']
         */
        pictures?: string[]
    };
    /**
     * Count of the characters to show
     */
    count?: number;
}

type KawaiiPluginFunc = (props?: KawaiiProps) => (args: PluginArgs) => void;

export type { KawaiiProps, KawaiiPluginFunc };
