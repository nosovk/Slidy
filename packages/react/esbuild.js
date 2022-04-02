import { build } from 'esbuild';
import { derver } from 'derver';

const DEV = process.argv.includes('--dev');

const esbuildBase = {
    bundle: true,
    minify: !DEV,
    incremental: DEV,
    legalComments: 'none',
    entryPoints: ['src/slidy.tsx'],
    sourcemap: DEV ? 'inline' : false,
};
const derverConfig = {
    port: 3332,
    host: '0.0.0.0',
    dir: 'dev/public',
    watch: ['dev/public', 'dev/src/', 'src', 'node_modules/@slidy/core'],
};

if (DEV) {
    build({
        ...esbuildBase,
        entryPoints: ['dev/src/app.tsx'],
        outfile: 'dev/public/build/bundle.js',
    }).then((bundle) => {
        derver({
            ...derverConfig,
            onwatch: async (lr, item) => {
                if (item !== 'dev/public') {
                    lr.prevent();
                    bundle.rebuild().catch((err) => lr.error(err.message, 'TS compile error'));
                }
            },
        });
    });
} else {
    (async () => {
        await build({
            ...esbuildBase,
            outfile: "dist/slidy.cjs",
            format: 'cjs',
        });
        await build({
            ...esbuildBase,
            outfile: "dist/slidy.mjs",
            format: 'esm',
        });
        await build({
            ...esbuildBase,
            outfile: "dist/slidy.js",
            globalName: 'Slidy',
            format: 'iife',
        });
    })();
}
