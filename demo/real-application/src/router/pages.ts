import NotFoundComponent from '../components/not-found/not-found.component';
import ProcessesComponent from '../components/processes/processes.component';
import HomeComponent from '../components/home/home.component';
import TablesComponent from '../components/tables/tables.component';
import { Input } from 'web-core/src/core';

const createPages = (container: Element | null) => {
  let currentComponent: Element;
  
  const home = () => {
    applyRoute('home-component', HomeComponent);
  }
  
  const tables = () => {
    applyRoute('tables-component', TablesComponent);
  }

  const processes = () => {
    applyRoute('processes-component', ProcessesComponent);
  }
  
  const notFound = () => {
    applyRoute('not-found-component', NotFoundComponent);
  }
  
  const applyRoute = (tag: string, component) => {
    Input.clear();
    if (currentComponent) {
      currentComponent.remove();
    }
    if (container) {
      currentComponent = document.createElement(tag);
      container.appendChild(currentComponent);
      loadComponent(tag, component);
    }
  }

  const loadComponent = (name: string, component: CustomElementConstructor) => {
    if (!window.customElements.get(name)) {
      window.customElements.define(name, component);
    } 
  }

  return {
    home,
    tables,
    processes,
    notFound
  }
}

export default createPages;