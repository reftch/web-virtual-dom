
const execa = require('execa');
const Listr = require('listr');

const tasks = new Listr([
  {
    title: 'Cleanup',
    task: () => {
      execa('rm', ['-rf', 'demo/real-application/public/js/'])
      execa('rm', ['-rf', 'demo/hello-world/public/js/'])
      execa('rm', ['-rf', 'coverage'])
    }
  },
  {
    title: 'Build Web Engine',
    task: () => execa('rollup', ['-c', 'rollup.config.web.js'])
  },
  {
    title: 'Run tests Web Engine and Web Components',
    task: () => execa('jest', ['-runInBand'])
  },
  {
    title: 'Build Application UI',
    task: () => execa('rollup', ['-c', 'rollup.config.app.js'])
  },
  {
    title: 'Build Demo application',
    task: () => execa('rollup', ['-c', 'rollup.config.demo.js'])
  },
]);

tasks.run().catch(err => {
  console.error(err);
});
