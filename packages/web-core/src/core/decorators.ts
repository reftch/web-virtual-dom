import { Input } from "./input";
import { NodeValue, VComponent } from "./model";

/**
 * Component decorator. 
 * 
 *  tag - component's name
 *  template - component's template
 *  components - nested components
 * 
 *  useShadow - An important aspect of web components is encapsulation — being able to keep the markup structure, 
 *              style, and behavior hidden and separate from other code on the page so that different parts do not clash, 
 *              and the code can be kept nice and clean. 
 *              The Shadow DOM API is a key part of this, providing a way to attach a hidden separated DOM to an element.
 * 
 * @param data input template data
 */
const Component = (
  data: { 
    tag: string, 
    template: string, 
    useShadow?: boolean 
    components?: Array<VComponent>, 
  }) => {
    
  return (target) => {
    target.prototype.__defineGetter__('tag', () => {
      return data.tag;
    });

    target.prototype.__defineGetter__('template', () => {
      return data.template;
    });

    target.prototype.__defineGetter__('components', () => {
      return data.components;
    });
    
    target.prototype.__defineGetter__('useShadow', function () { 
      return data.useShadow; 
    });

  }
}

/**
 * Prop decorator. 
 * 
 * Uses for binding components properties with component's template.
 * In case of changing data this decorator responsible for triggering reconciliation procedure.
 * this decorator is also responsible for the passing dynamic data from the parent to the 
 * child component.
 */
const Prop = () => {
  return (target: {} | any, propertyKey: PropertyKey): any => {
    const propertyName = `__${String(propertyKey)}`;
    const descriptor = {
      get(this: any) {
        let value = this[propertyName];
        return value;
      },
      set(value: any) {        
        value = value === undefined ? 'undefined' : value;
        if (this[propertyName] !== value || (value && value.length >= 0)) {
          this[propertyName] = value;
          const handlers = Input.getOutput(String(propertyKey));
          if (handlers) {
            handlers.forEach(h => {
              h.el[`${h.input}`] = value;
            })
          }
          (this as any).requestRender();
        }
      },
      enumerable: true,
      configurable: true,
    };

    Object.defineProperty(target, propertyKey, descriptor);
  };
}

export {
  Component,
  Prop,
}
