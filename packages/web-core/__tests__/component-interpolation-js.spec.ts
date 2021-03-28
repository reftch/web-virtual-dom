import { BaseComponent, Component, WF, Prop } from '@core';
import { getClassesById, getStylesById, getTextContentById } from './testUtils';

describe("Component javascript expressions interpolation", () => {

  test('Javascript 1', () => {
    @Component({
      tag: `js-component-1`,
      useShadow: false,
      template: `
        <div id="1">Result: {{ var1 + 10 }}</div>`,
    })
    class SimpleComponent extends BaseComponent {
      @Prop() var1 = 10;
    }

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(SimpleComponent).mount('app');

    expect(getTextContentById('1')).toEqual('Result: 20');
  })

  test('Javascript 2', () => {
    @Component({
      tag: `js-component-2`,
      useShadow: false,
      template: `
        <div id="1">Result: {{ var1 + 10 + var2 }}</div>`,
    })
    class SimpleComponent extends BaseComponent {
      @Prop() var1 = 10;
      @Prop() var2 = 1;
    }


    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(SimpleComponent).mount('app');

    expect(getTextContentById('1')).toEqual('Result: 21');
  })

  test('Javascript 3', () => {
    @Component({
      tag: `js-component-3`,
      useShadow: false,
      template: `
        <div id="1">Result: {{ var1 === var2 }}</div>`,
    })
    class SimpleComponent extends BaseComponent {
      @Prop() var1 = 10;
      @Prop() var2 = 1;
    }

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(SimpleComponent).mount('app');

    expect(getTextContentById('1')).toEqual('Result: false');
  })

  test('Javascript 4', () => {
    @Component({
      tag: `js-component-4`,
      useShadow: false,
      template: `
        <div id="1">Result: {{ var1 == var2 }}</div>`,
    })
    class SimpleComponent extends BaseComponent {
      @Prop() var1 = 10;
      @Prop() var2 = 1;
    }

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(SimpleComponent).mount('app');

    expect(getTextContentById('1')).toEqual('Result: false');
  })

  test('Javascript 5', () => {
    @Component({
      tag: `js-component-5`,
      useShadow: false,
      template: `
        <div id="1">Result: {{ var1 !== var2 }}</div>`,
    })
    class SimpleComponent extends BaseComponent {
      @Prop() var1 = 10;
      @Prop() var2 = 1;
    }

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(SimpleComponent).mount('app');

    expect(getTextContentById('1')).toEqual('Result: true');
  })

  test('Javascript 6', () => {
    @Component({
      tag: `js-component-6`,
      useShadow: false,
      template: `
        <div id="1">Result: {{ var1 / var2 }}</div>`,
    })
    class SimpleComponent extends BaseComponent {
      @Prop() var1 = 10;
      @Prop() var2 = 2;
    }

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(SimpleComponent).mount('app');

    expect(getTextContentById('1')).toEqual('Result: 5');
  })

  test('Javascript 7', () => {
    @Component({
      tag: `js-component-7`,
      useShadow: false,
      template: `
        <div id="1">Result: {{ (var1 * var2) + 5 }}</div>`,
    })
    class SimpleComponent extends BaseComponent {
      @Prop() var1 = 10;
      @Prop() var2 = 2;
    }

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(SimpleComponent).mount('app');

    expect(getTextContentById('1')).toEqual('Result: 25');
  })

  test('Javascript 8', () => {
    @Component({
      tag: `js-component-8`,
      useShadow: false,
      template: `
        <div id="1">Result: {{ (var1 * var2) / 5 + 2 }}</div>`,
    })
    class SimpleComponent extends BaseComponent {
      @Prop() var1 = 10;
      @Prop() var2 = 2;
    }

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(SimpleComponent).mount('app');

    expect(getTextContentById('1')).toEqual('Result: 6');
  })

  test('Javascript 9', () => {
    @Component({
      tag: `js-component-9`,
      useShadow: false,
      template: `
        <div id="1" :class="{{ var1 === var2 ? 'class1' : 'class2' }}">Result</div>`,
    })
    class SimpleComponent extends BaseComponent {
      @Prop() var1 = 10;
      @Prop() var2 = 2;
    }

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(SimpleComponent).mount('app');

    expect(getTextContentById('1')).toEqual('Result');
    const classes = getClassesById('1');
    if (classes) {
      expect(classes.length).toEqual(1)
      expect(classes[0]).toEqual('class2')
    }
  })

  test('Javascript 10', () => {
    @Component({
      tag: `js-component-10`,
      useShadow: false,
      template: `
        <div id="1" :class="{{ var1 !== var2 ? 'class1' : 'class2' }}">Result: {{ var1 - var2 }}</div>`,
    })
    class SimpleComponent extends BaseComponent {
      @Prop() var1 = 10;
      @Prop() var2 = 2;
    }

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(SimpleComponent).mount('app');

    expect(getTextContentById('1')).toEqual('Result: 8');
    const classes = getClassesById('1');
    if (classes) {
      expect(classes.length).toEqual(1)
      expect(classes[0]).toEqual('class1')
    }
  })

  test('Javascript 11', () => {
    @Component({
      tag: `js-component-11`,
      useShadow: false,
      template: `
        <div id="1" class="class3" :class="{{ var1 !== var2 ? 'class1' : 'class2' }}">Result: {{ var1 - var2 }}</div>`,
    })
    class SimpleComponent extends BaseComponent {
      @Prop() var1 = 10;
      @Prop() var2 = 2;
    }

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(SimpleComponent).mount('app');

    expect(getTextContentById('1')).toEqual('Result: 8');
    const classes = getClassesById('1');
    if (classes) {
      expect(classes.length).toEqual(2)
      expect(classes[0]).toEqual('class3')
      expect(classes[1]).toEqual('class1')
    }
  })

  test('Javascript 12', () => {
    @Component({
      tag: `js-component-12`,
      useShadow: false,
      template: `
        <div id="1" :style="{{ var1 !== var2 ? 'width: 10px; height: 20px;' : 'width: 20px;' }}">Result: {{ (var1 - var2)/2 +1 }}</div>`,
    })
    class SimpleComponent extends BaseComponent {
      @Prop() var1 = 10;
      @Prop() var2 = 2;
    }

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(SimpleComponent).mount('app');

    expect(getTextContentById('1')).toEqual('Result: 5');
    const styles = getStylesById('1');
    if (styles) {
      expect(styles.length).toEqual(2)
      expect(styles[0]).toEqual('width')
      expect(styles[1]).toEqual('height')
    }
  })

  test('Javascript 13', () => {
    @Component({
      tag: `js-component-13`,
      useShadow: false,
      template: `
        <div id="1" style="opacity: 1;" :style="{{ var1 !== var2 ? 'width: 10px; height: 20px;' : 'width: 20px;' }}">Result: {{ (var1 - var2)/2 +1 }}</div>`,
    })
    class SimpleComponent extends BaseComponent {
      @Prop() var1 = 10;
      @Prop() var2 = 2;
    }

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(SimpleComponent).mount('app');

    expect(getTextContentById('1')).toEqual('Result: 5');
    const styles = getStylesById('1');
    if (styles) {
      expect(styles.length).toEqual(3)
      expect(styles[0]).toEqual('opacity')
      expect(styles[1]).toEqual('width')
      expect(styles[2]).toEqual('height')
    }
  })

  test('Javascript 14', () => {
    @Component({
      tag: `js-component-14`,
      useShadow: false,
      template: `
        <div id="1" 
          style="opacity: 1;" 
          :style="{{ var1 !== var2 ? 'width: 10px; height: 20px;' : 'width: 20px;' }}"
          class="class3" 
          :class="{{ var1 !== var2 ? 'class1' : 'class2' }}"
        >Result: {{ (var1 - var2)/2 +1 }}</div>`,
    })
    class SimpleComponent extends BaseComponent {
      @Prop() var1 = 10;
      @Prop() var2 = 2;
    }

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(SimpleComponent).mount('app');

    expect(getTextContentById('1')).toEqual('Result: 5');
   
    const classes = getClassesById('1');
    if (classes) {
      expect(classes.length).toEqual(2)
      expect(classes[0]).toEqual('class3')
      expect(classes[1]).toEqual('class1')
    }

    const styles = getStylesById('1');
    if (styles) {
      expect(styles.length).toEqual(3)
      expect(styles[0]).toEqual('opacity')
      expect(styles[1]).toEqual('width')
      expect(styles[2]).toEqual('height')
    }
  })

});