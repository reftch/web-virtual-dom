import livereload from 'rollup-plugin-livereload';
import rollupPluginCommonJS from '@rollup/plugin-commonjs';
import rollupPluginNodeResolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import html from 'rollup-plugin-html';
import scss from 'rollup-plugin-scss'

const production = !process.env.ROLLUP_WATCH;

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require('child_process').spawn('npm', ['run', 'app-server', '--', '--dev'], {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true
      });

      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    }
  };
}

export default [{
  input: `demo/real-application/src/index.ts`,
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: `demo/real-application/public/js/bundle.js`,
  },
  plugins: [
    rollupPluginCommonJS(),
    rollupPluginNodeResolve(),
    html({
      include: '**/*.html'
    }),
    scss({
      output: true,
      output: 'demo/real-application/public/style.css',
      watch: 'packages/web-styles/src',
      outputStyle: 'compressed',
    }),
    typescript({
      sourceMap: !production,
      inlineSources: !production
    }),
    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload(`demo/real-application/public`),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
}
];
