import { BaseComponent, Component, Prop, WF } from '@core';
import { getTextContentById, getClassesById, getStylesById } from './testUtils';

describe("Component composition functionality", () => {

  test('Test component composition 1', () => {
    @Component({
      tag: `child-component`,
      useShadow: false,
      template: `
        <div>Simple component content</div>`,
    })
    class ChildComponent extends BaseComponent {}

    @Component({
      tag: `parent-component-1`,
      useShadow: false,
      template: `
        <div>
          <child-component></child-component>
        </div>`,
      components: [ ChildComponent ]  
    })
    class ParentComponent extends BaseComponent {}

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(ParentComponent).mount('app');

    expect(document.body.innerHTML).toContain('Simple component content')
  })

  test('Test component composition 2', () => {
    @Component({
      tag: `child-component-1`,
      useShadow: false,
      template: `
        <div :id="id">Child component 1</div>`,
    })
    class ChildComponent1 extends BaseComponent {
      @Prop() id = "1";
    }

    @Component({
      tag: `child-component-2`,
      useShadow: false,
      template: `
        <div :id="id">Child component 2</div>`,
    })
    class ChildComponent2 extends BaseComponent {
      @Prop() id = "2";
    }

    @Component({
      tag: `parent-component-2`,
      useShadow: false,
      template: `
        <div>
          <child-component-1></child-component-1>
          <child-component-2></child-component-2>
        </div>`,
      components: [ ChildComponent1, ChildComponent2 ]  
    })
    class ParentComponent extends BaseComponent {}

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(ParentComponent).mount('app');

    let textContent = getTextContentById('1');
    expect(textContent).toContain('Child component 1')
    textContent = getTextContentById('2');
    expect(textContent).toContain('Child component 2')
  })

  test('Test component composition 3', () => {
    @Component({
      tag: `child-component-1`,
      useShadow: true,
      template: `
        <div :id="id"><slot></slot></div>`,
    })
    class ChildComponent1 extends BaseComponent {
      @Prop() id = "1";
    }

    @Component({
      tag: `parent-component-3`,
      useShadow: false,
      template: `
        <div>
          <child-component-1>Child component 1</child-component-1>
        </div>`,
      components: [ ChildComponent1 ]  
    })
    class ParentComponent extends BaseComponent {}

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(ParentComponent).mount('app');

    let textContent = getTextContentById('1');
    expect(textContent).toContain('Child component 1')
  })

  test('Test component composition 4', () => {
    @Component({
      tag: `slot-component-1`,
      useShadow: true,
      template: `
        <div><slot></slot></div>`,
    })
    class SlotComponent1 extends BaseComponent {}

    @Component({
      tag: `parent-component-4`,
      useShadow: false,
      template: `
        <div>
          <slot-component-1>
            <div id="slot1">Test slot functionality 1</div>
          </slot-component-1>
        </div>`,
      components: [ SlotComponent1 ]  
    })
    class ParentComponent extends BaseComponent {}

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(ParentComponent).mount('app');

    let textContent = getTextContentById('slot1');
    expect(textContent).toContain('Test slot functionality 1')
  })

  test('Test component composition 5', () => {
    @Component({
      tag: `slot-component-2`,
      useShadow: true,
      template: `
        <div>
          <slot>
            <em>no content was provided</em>
          </slot>
        </div>`,
    })
    class SlotComponent2 extends BaseComponent {}

    @Component({
      tag: `parent-component-5`,
      useShadow: false,
      template: `
        <div>
          <slot-component-2>
            <div id="slot1">Let's have some different text!</div>
          </slot-component-2>
        </div>`,
      components: [ SlotComponent2 ]  
    })
    class ParentComponent extends BaseComponent {}

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(ParentComponent).mount('app');

    let textContent = getTextContentById('slot1');
    expect(textContent).toContain("Let's have some different text!")
  })

  test('Test component composition 6', () => {
    @Component({
      tag: `slot-component-3`,
      useShadow: true,
      template: `
        <div>
          <slot name="header">Some default header</slot>
          <slot></slot>
          <slot name="footer">Some default footer</slot>
        </div>`,
    })
    class SlotComponent3 extends BaseComponent {}

    @Component({
      tag: `parent-component-6`,
      useShadow: false,
      template: `
        <div>
          <slot-component-3>
            <span id="1" slot="header">Some header</span>
            <span id="2">Some content</span>
            <span id="3" slot="footer">Some footer</span>
          </slot-component-3>
        </div>`,
      components: [ SlotComponent3 ]  
    })
    class ParentComponent extends BaseComponent {}

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(ParentComponent).mount('app');


    let textContent = getTextContentById('1');
    expect(textContent).toContain("Some header")
    textContent = getTextContentById('2');
    expect(textContent).toContain("Some content")
    textContent = getTextContentById('3');
    expect(textContent).toContain("Some footer")
  })

  test('Test component composition 7', () => {
    @Component({
      tag: `slot-component-4`,
      useShadow: false,
      template: `
        <div><slot></slot></div>`,
    })
    class SlotComponent4 extends BaseComponent {}

    @Component({
      tag: `parent-component-7`,
      useShadow: false,
      template: `
        <div>
          <slot-component-4>
            <div id="slot1">Test slot functionality 1</div>
          </slot-component-4>
        </div>`,
      components: [ SlotComponent4 ]  
    })
    class ParentComponent extends BaseComponent {}

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(ParentComponent).mount('app');

    let textContent = getTextContentById('slot1');
    expect(textContent).toContain('')
  })

});