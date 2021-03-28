
export namespace WF {

  /**
   * Register the root component and mount it to the html root selector
   * 
   * @param component HTMLElement custom element
   * @returns 
   */
  export const createApp = (component: any) => {
    const tag = component.prototype.tag;
    window.customElements.define(tag, component);
    const instance = document.createElement(tag);

    const mount = (sel: string) => {
      const selector = document.querySelector(sel);
      if (selector) {
        selector.appendChild(instance);
      }
    }
  
    return {
      mount
    }
  }

  export const camelCase = (input: string) => { 
    return input.toLowerCase().replace(/-(.)/g, function(match, group1) {
      return group1.toUpperCase();
    });
  }

}