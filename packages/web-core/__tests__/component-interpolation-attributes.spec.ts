import { BaseComponent, Component, Prop } from '@core';
import { getTextContentById, getClassesById, getStylesById } from './testUtils';

describe("Attributes component functionality", () => {

  test('Set class component', () => {
    @Component({
      tag: `class-component`,
      useShadow: false,
      template: `
        <div>
          <div id="1" class="class1" :class="customClass">It works!</div> 
        </div>`,
    })
    class SimpleComponent extends BaseComponent {
      @Prop() customClass = "class2";
    }

    customElements.define('class-component', SimpleComponent as any);
    document.body.innerHTML = `<class-component></class-component>`

    let el = document.getElementById('1');
    expect(el).not.toBeNull();
    expect(getTextContentById('1')).toEqual('It works!')
    
    const classes = getClassesById('1');
    if (classes) {
      expect(classes.length).toEqual(2)
      expect(classes[0]).toEqual('class1')
      expect(classes[1]).toEqual('class2')
    }
  })

  test('Set class component 2', () => {
    @Component({
      tag: `class-component-2`,
      useShadow: false,
      template: `
        <div>
          <div id="1" :class="customClass">It works!</div> 
        </div>`,
    })
    class SimpleComponent extends BaseComponent {
      @Prop() customClass = "class2";
    }

    customElements.define('class-component-2', SimpleComponent as any);
    document.body.innerHTML = `<class-component-2></class-component-2>`

    let el = document.getElementById('1');
    expect(el).not.toBeNull();
    expect(getTextContentById('1')).toEqual('It works!')
    
    const classes = getClassesById('1');
    if (classes) {
      expect(classes.length).toEqual(1)
      expect(classes[0]).toEqual('class2')
    }
  })

  test('Set class component 3', () => {
    @Component({
      tag: `class-component-3`,
      useShadow: false,
      template: `
        <div>
          <div id="1" :if="isEnabled" class="class1" :class="customClass">div with if condition</div>
          <div id="2" :else class="class1" :class="customClass">div with else condition</div>
          <button id="id-btn" @click="handler">Button</button>
        </div>`,
    })
    class SimpleComponent extends BaseComponent {
      @Prop() isEnabled = false;
      @Prop() customClass = "class2 class3";

      onMounted() {
        this.render();
      }

      handler() {
        this.isEnabled = !this.isEnabled;
        this.render();
      }
    }
    
    customElements.define('class-component-3', SimpleComponent as any);
    document.body.innerHTML = `<class-component-3></class-component-3>`

    let el = document.getElementById('1');
    expect(el).toBeNull();
    el = document.getElementById('2');
    expect(el).not.toBeNull();
    
    let classes = getClassesById('2');
    if (classes) {
      expect(classes.length).toEqual(3)
      expect(classes[0]).toEqual('class1')
      expect(classes[1]).toEqual('class2')
      expect(classes[2]).toEqual('class3')
    }

    const $ = require('jquery');
    $('#id-btn').click();

    el = document.getElementById('1');
    expect(el).not.toBeNull();
    el = document.getElementById('2');
    expect(el).toBeNull();
    
    classes = getClassesById('1');
    if (classes) {
      expect(classes.length).toEqual(3)
      expect(classes[0]).toEqual('class1')
      expect(classes[1]).toEqual('class2')
      expect(classes[2]).toEqual('class3')
    }
  })

  test('Set style component', () => {
    @Component({
      tag: `style-component`,
      useShadow: false,
      template: `
        <div>
          <div id="1" class="class1" :class="customClass" style="height: 10px;" :style="customStyle">It works!</div> 
        </div>`,
    })
    class SimpleComponent extends BaseComponent {
      @Prop() customClass = "class2";
      @Prop() customStyle = "width: 100px;";
    }

    customElements.define('style-component', SimpleComponent as any);
    document.body.innerHTML = `<style-component></style-component>`

    let el = document.getElementById('1');
    expect(el).not.toBeNull();
    expect(getTextContentById('1')).toEqual('It works!')
    
    const classes = getClassesById('1');
    if (classes) {
      expect(classes.length).toEqual(2)
      expect(classes[0]).toEqual('class1')
      expect(classes[1]).toEqual('class2')
    }

    const styles = getStylesById('1');
    if (styles) {
      expect(styles.length).toEqual(2)
      expect(styles[0]).toEqual('height')
      expect(styles[1]).toEqual('width')
    }
  })

  test('Set style component 2', () => {
    @Component({
      tag: `style-component-2`,
      useShadow: false,
      template: `
        <div>
          <div id="1" :style="customStyle">It works!</div> 
        </div>`,
    })
    class SimpleComponent extends BaseComponent {
      @Prop() customStyle = "width: 100px;";
    }

    customElements.define('style-component-2', SimpleComponent as any);
    document.body.innerHTML = `<style-component-2></style-component-2>`

    let el = document.getElementById('1');
    expect(el).not.toBeNull();
    expect(getTextContentById('1')).toEqual('It works!')
    
    const styles = getStylesById('1');
    if (styles) {
      expect(styles.length).toEqual(1)
      expect(styles[0]).toEqual('width')
    }
  })

});