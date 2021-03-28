import { BaseComponent } from "./base-component";
import { WF } from './wf'

export namespace Emit {
  
  interface EmitHandler<T> {
    el: Element | ShadowRoot;
    component: BaseComponent;
    action: string;
    callback: T;
  }

  const handlers: EmitHandler<Function>[] = [];

  /**
   * Register emit handler
   * 
   * @param el HTMLElement 
   * @param component instance of the component
   * @param action emit action name
   * @param callback callback function (parent component handler)
   */
  export const bind = (el: Element | ShadowRoot, component: BaseComponent, action: string, callback: Function) => {
    if (el && action && callback) {
      handlers.push({ el: el, component: component, action: WF.camelCase(action), callback: callback });
    } 
  }

  /**
   * Emit data to the parent component
   * 
   * @param el HTMLElement needed for placing comparison (in case of multiple the same children)
   * @param action emit action name
   * @param data data
   */
  export const emit = <T>(el: Element | ShadowRoot, action: string, data?: T) => {
    handlers.forEach((h: EmitHandler<Function>) => {
      if (
        el.compareDocumentPosition(h.el) === 0 && 
        (action === h.action || WF.camelCase(action) === h.action) &&
        typeof h.callback === 'function'
        ) {
          const f = h.callback.bind(h.component);
          f(data);
      }
    });
  }

}