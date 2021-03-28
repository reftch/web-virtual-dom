import rollupPluginCommonJS from '@rollup/plugin-commonjs';
import rollupPluginNodeResolve from '@rollup/plugin-node-resolve';
import sourcemapPlugin from 'rollup-plugin-sourcemaps';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import analyze from 'rollup-plugin-analyzer'

const libName = 'web-core';

export default [
  {
    input: 'packages/web-core/src/index.ts',
    output: [
      { file: `./packages/web-core/dist/${libName}.prod.js`, format: "es", plugins: [terser()] },
    ],
    plugins: [
      rollupPluginCommonJS(),
      rollupPluginNodeResolve(),
      typescript({
        sourceMap: false,
        inlineSources: false
      }),
      sourcemapPlugin(),
      analyze()
    ],
  }
];
