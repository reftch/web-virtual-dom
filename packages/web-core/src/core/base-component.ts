import { useStore } from "@store";
import { Emit } from "./emit";
import { VirtualEngine, VEngine } from "./engine";
import { Input } from "./input";
import { VComponent } from "./model";

/**
 * Base custom component
 * 
 * Implements the different technologies allowing to create reusable custom elements.
 *  
 * This base class contains three main technologies, which can be used together to create versatile 
 * custom elements with encapsulated functionality that can be reused without fear of code collisions.
 * 
 * Custom elements: 
 *  
 *  A set of JavaScript APIs that allow to define custom elements and their behavior, 
 *  which can then be used as desired in your user interface.
 * 
 * Shadow DOM: 
 *  
 *  A set of JavaScript APIs for attaching an encapsulated "shadow" DOM tree to an element — 
 *  which is rendered separately from the main document DOM — and controlling associated functionality. 
 *  In this way, we can keep an element's features private, so they can be scripted and styled without the 
 *  fear of collision with other parts of the document.
 * 
 * HTML templates: 
 * 
 *  The <template> and <slot> elements enable to write markup templates that are not displayed in the rendered page. 
 *  These can then be reused multiple times as the basis of a custom element's structure.
 *
 */
export class BaseComponent extends HTMLElement implements VComponent {

  protected store = useStore;

  private _props: string[] = [];
  private _engine: VEngine | null = null;
  private _requestRender = 0;
  private _renderFunc: FrameRequestCallback;

  /**
   * An instance of the element is created or upgraded. 
   * Useful for initializing state, setting up event listeners, or creating a shadow dom. 
   * 
   * @see See the spec for restrictions on what you can do in the constructor.
   */
  constructor() {
    super();
    this.onBeforeCreate();
    if (this.isUseShadow()) {
      this.attachShadow({ mode: 'open' });
    }     
    this._renderFunc = this.render.bind(this);
    this.created();
  }

  /**
   * Shadow root property
   */
  protected isUseShadow() {
    return this['useShadow'];
  }

  /**
   * Tag definition
   */
  protected get tag() {
    return this['tag'];
  }

  /**
   * Template definition
   */
  protected get template() {
    return this['template'];
  }

  /**
   * Get child components
   */
  protected get components() {
    return this['components'];
  }

  /**
   * Get root of the element
   */
  protected get parent() {
    return this.isUseShadow() && this.shadowRoot ? this.shadowRoot : this;
  }

  /**
   * Called synchronously immediately after the instance has been initialized.
   */
  protected onBeforeCreate() { }

  protected created() { }

  protected beforeMount() { }
  /**
   * General component's mount method
   */
  protected onMounted() { }

  /**
   * General component's umount method
   */
  protected onUnmounted() { }

  protected beforeUnmount() { }

  /**
   * Called when data changes, before the DOM is patched. 
   * This is a good place to access the existing DOM before an update, 
   * e.g. to remove manually added event listeners.
   */
  protected onBeforeUpdate() { }

  /**
   * Called after a data change causes the virtual DOM to be re-rendered and patched.
   */
  protected onUpdated() { }

  /**
   * Called every time the element is inserted into the DOM. 
   * Useful for running setup code, such as fetching resources or rendering. 
   * Generally, we should try to delay work until this time.
   */
  connectedCallback() {
    this.registerComponents();

    this.beforeMount();

    this.parseProperties(this.template);
    this._engine = new VirtualEngine(this, this._props, this.template, this.parent);

    this.initializedInputParameters();

    this.onMounted();
  }

  /**
   * Called every time the element is removed from the DOM. 
   * Useful for running clean up code.
   */
  disconnectedCallback() {
    this.beforeUnmount();
    //TODO: should be implemented unregister components
    // this.store.unsubscribe(this);
    this.onUnmounted();
  }

  /**
   * Called when an observed attribute has been added, removed, updated, or replaced. 
   * Also called for initial values when an element is created by the parser, or upgraded. 
   * 
   * Note: only attributes listed in the observedAttributes property will receive this callback. 
   * 
   * @param attrName 
   * @param oldVal 
   * @param newVal 
   */
  attributeChangedCallback(attrName, oldVal, newVal) { }

  /**
   * The custom element has been moved into a new document
   */
  adoptedCallback() { }

  /**
   * Decreasing the rendering frequency. 
   * 
   * The requestAnimationFrame allows the model change that happened 
   * in a frame to be applied in the next frame.
   */
  requestRender(): void {
    if (this._requestRender) {
      cancelAnimationFrame(this._requestRender);
    }
    this._requestRender = requestAnimationFrame(this._renderFunc);
  }

  /**
   * Reconciliation the real DOM 
   * 
   * This process contains two steps:
   * 
   * 1. Updating virtual DOM in according with the latest changes in the properties;
   * 2. Applying a differences between real and virtual DOMs.
   * 
   */
  render() {
    this.onBeforeUpdate();

    if (this._engine) {
      this._engine.render();
    }

    this.onUpdated();
  }

  /**
   * Emitting data to the parent component 
   * 
   * @param action action name
   * @param data emitted data (optional)
   */
  emit(action: string, data?: any) {
    Emit.emit(this.parent, action, data);
  }

  /**
   * Register child components inside custom element
   */
  private registerComponents() {
    if (this.components && this.components.length > 0) {
      for (let index in this.components) {
        let component = this.components[index];
        if (component && !window.customElements.get(`${this.components[index].prototype['tag']}`)) {
          window.customElements.define(`${this.components[index].prototype['tag']}`, component);
        }

        component = window.customElements.get(`${this.components[index].prototype['tag']}`);
        component.parentComponent = this;
      }
    }
  }

  /**
   * Check is text content contain a property 
   * 
   * @param str string template
   * @param property property
   */
  // private isBindTextProperties(str: string, property: string) {
  //   const matches = str.match(`\{\{(?:\\s+)?(${property})(?:\\s+)?\}\}`);
  //   return matches ? matches[1] : null;
  // }

  /**
   * Check is attribute contain a property
   * 
   * @param str string template
   * @param property property
   */
  // private isBindAttributeProperties(str: string, property: string) {
  //   const matches = str.match(`=\"(?:\s+)?(!*)(${property})(?:\s+)?\"`);
  //   return matches ? matches[2] : null;
  // }

  /**
   * Parsing template's attributes.
   * Each attribute is created by decorator @Prop() and always starts with double bottom dashes.
   * Updating of any prop parameter will trigger reconciliation process.
   * 
   * This method called only ones, during creation of the component.
   * 
   * @param template template string
   */
  private parseProperties(template: string) {
    Object.getOwnPropertyNames(this).forEach(p => {
      if (p[0] === '_' && p[1] === '_') {
        const prop = p.substring(2);
        // if (this.isBindTextProperties(template, prop) || this.isBindAttributeProperties(template, prop)) {
          if (prop && this._props.indexOf(prop) === -1) {
            this._props.push(prop);
          }
        // }
      }
    })
  }

  /**
   * Update input parameters only once, before mounting the component
   */
  private initializedInputParameters() {
    this._props.forEach(p => {
      const h = Input.getInput(this, p);
      if (h) {
        const output = String(h.output);
        this[`${h.input}`] = 
          h.isStatic ? h.output : h.component[`${output}`];
      }      
    })
  }
  
}
