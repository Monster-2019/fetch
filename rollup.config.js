import { terser } from "rollup-plugin-terser";
import pkg from './package.json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'lib/index.js',
    plugins: [
        // terser({
        //     ecma: "2015",
        //     compress: {
        //         drop_console: false
        //     }
        // }),
        resolve(),
        commonjs()
    ],
    output: [
        {
            name: 'mfetch',
            file: pkg.browser,
            format: 'umd',
        },
        {
            file: pkg.module,
            format: 'es'
        },
    ],
};