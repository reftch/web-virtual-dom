import { BaseComponent } from "./base-component";
import { WF } from "./wf";

export namespace Input {

  interface InputHandler<T> {
    el: Element | ShadowRoot;
    component: BaseComponent;
    input: T;
    output: T;
    isStatic: boolean;
  }

  const handlers: InputHandler<String>[] = [];

  export const clear = () => {
    handlers.length = 0;
  }

  /**
   * Bind input parameter for the child component
   * 
   * @param el HTMLElement
   * @param component instance of the component
   * @param input parameter's name in child component
   * @param output parameter's name in parent component
   */
  export const bindInput = (el: Element | ShadowRoot, component: BaseComponent, input: string, output: string, isStatic?: boolean) => {
    if (el && input && output) {
      handlers.push({ 
        el: el, 
        component: component, 
        input: WF.camelCase(input), 
        output: isStatic ? output : WF.camelCase(output),
        isStatic: isStatic ? true : false
      });
    } 
  }

  /**
   * Get input parameter 
   * 
   * @param component instance of the component
   * @param input parameter's name in child component
   * 
   * @returns binding handler
   */
  export const getInput = (component: BaseComponent, input: string) => {
    return handlers.find(h => input === h.input && component === h.el);
  } 

  /**
   * Get output parameter
   * 
   * @param output parameter's name in child component
   * 
   * @returns binding handler
   */
  export const getOutput = (output: string): InputHandler<String>[] | undefined => {
    return handlers.filter(h => output === h.output);
  } 

}