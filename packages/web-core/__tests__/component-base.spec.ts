import { BaseComponent, Component, Prop } from '@core';
import { getTextContentById, getClassesById, getStylesById } from './testUtils';

describe("Base component functionality", () => {

  test('Test base component', () => {
    @Component({
      tag: `simple-component`,
      useShadow: false,
      template: `
        <div>Simple component content</div>`,
    })
    class SimpleComponent extends BaseComponent {}

    customElements.define('simple-component', SimpleComponent as any);
    document.body.innerHTML = `<simple-component></simple-component>`
    expect(document.body.innerHTML).toContain('Simple component content')
  })

  test('Test use shadow root component', () => {
    @Component({
      tag: `base-component-1`,
      useShadow: true,
      template: `
        <div>Simple component content</div>`,
    })
    class SimpleComponent extends BaseComponent {}

    customElements.define('base-component-1', SimpleComponent as any);
    document.body.innerHTML = `<base-component-1></base-component-1>`
    expect(document.body.innerHTML).toBe('<base-component-1></base-component-1>')
  })

  test('Test parameters component', () => {
    @Component({
      tag: `base-component-2`,
      useShadow: false,
      template: `<div>Simple component content</div>`,
    })
    class SimpleComponent extends BaseComponent {}

    const tag = SimpleComponent.prototype['tag'];
    expect(tag).toBe('base-component-2');
    const template = SimpleComponent.prototype['template'];
    expect(template).toBe('<div>Simple component content</div>');

    customElements.define(tag, SimpleComponent as any);
    document.body.innerHTML = `<base-component-2></base-component-2>`
    expect(document.body.innerHTML).toContain('Simple component content')

  })

  test('Test parameters component', () => {
    @Component({
      tag: `base-component-3`,
      useShadow: false,
      template: `<div>Simple component content</div>`,
    })
    class SimpleComponent extends BaseComponent {

      get tagTest() {
        return super.tag;
      }

      get templateTest() {
        return super.template;
      }

      get componentsTest() {
        return super.components;
      }
    }

    customElements.define('base-component-3', SimpleComponent as any);
    document.body.innerHTML = `<base-component-3></base-component-3>`
    expect(document.body.innerHTML).toContain('Simple component content')

    const instance = new SimpleComponent();
    expect(instance).not.toBeNull();    

    expect(instance.tagTest).toBe('base-component-3')
    expect(instance.templateTest).toBe('<div>Simple component content</div>')
    expect(instance.componentsTest).toBeUndefined()
  })

});