import { useStore } from 'web-core/src/store';
import { createRouter } from 'web-core/src/router';
import createPages from './router/pages'

import '../../../packages/web-styles/src/index.scss';

useStore.actions().setCount(0);

const pages = createPages(document.querySelector('main'));
const router = createRouter();

window.onload = () => {
  router
    .addRoute('#/', pages.home)
    .addRoute('#/tables', pages.tables)
    .addRoute('#/processes', pages.processes)
    .setNotFound(pages.notFound)
  .start();
}
