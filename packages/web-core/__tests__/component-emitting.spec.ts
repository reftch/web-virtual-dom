import { BaseComponent, Component, WF, Prop } from '@core';
import { getClassesById, getStylesById, getTextContentById } from './testUtils';

describe("Components emitting functionality", () => {
 
  const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  test('Javascript emitting 1', async () => {
    @Component({
      tag: `child-component-1`,
      useShadow: false,
      template: `
        <div id="1">Result: {{ var1 }}</div>`,
    })
    class Child1Component1 extends BaseComponent {
      @Prop() var1 = 100;

      onMounted() {
        this.emit('setRow', 1000);
      }
    }
    
    @Component({
      tag: `parent-component-1`,
      useShadow: false,
      template: `
      <div>
        <div id="2">Result: {{ var2 }}</div>
        <child-component-1 @setRow="emitCallback"></child-component-1>
      </div>`,
      components: [ Child1Component1 ]  
    })
    class ParentComponent extends BaseComponent {
      @Prop() var2 = 10;
      
      emitCallback(data) {
        this.var2 = data;
      }
    }

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(ParentComponent).mount('app');

    let textContent = getTextContentById('1');
    expect(textContent).toBe('Result: 100')

    await timeout(100);
   
    textContent = getTextContentById('2');
    expect(textContent).toBe('Result: 1000')
  })

  test('Javascript emitting 2', async () => {
    @Component({
      tag: `child-component-2`,
      useShadow: false,
      template: `
        <div id="1">Result: {{ var1 }}</div>`,
    })
    class Child1Component1 extends BaseComponent {
      @Prop() var1 = 100;

      onMounted() {
        this.emit('setRow', 1000);
      }
    }
    
    @Component({
      tag: `parent-component-2`,
      useShadow: false,
      template: `
      <div>
        <div id="2">Result: {{ var2 }}</div>
        <child-component-2 @setRow1="emitCallback"></child-component-2>
      </div>`,
      components: [ Child1Component1 ]  
    })
    class ParentComponent extends BaseComponent {
      @Prop() var2 = 10;
      
      emitCallback(data) {
        this.var2 = data;
      }
    }

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(ParentComponent).mount('app');

    let textContent = getTextContentById('1');
    expect(textContent).toBe('Result: 100')

    await timeout(100);
   
    textContent = getTextContentById('2');
    expect(textContent).toBe('Result: 10')
  })


  test('Javascript emitting 3', async () => {
    @Component({
      tag: `child-component-3`,
      useShadow: false,
      template: `
        <div id="1">
          <button id="id-btn1" @click="click1">Button</button>
          <button id="id-btn2" @click="click2">Button</button>
        </div>
      `,
    })
    class ChildComponent3 extends BaseComponent {
      click1() {
        this.emit('setRow1', 1000);
      }

      click2() {
        this.emit('setRow2', 2000);
      }
    }
    
    @Component({
      tag: `parent-component-3`,
      useShadow: false,
      template: `
      <div>
        <div id="2">Result: {{ var2 }}</div>
        <div id="3">Result: {{ var3 }}</div>
        <child-component-3 @setRow1="emitCallback1" @setRow2="emitCallback2"></child-component-3>
      </div>`,
      components: [ ChildComponent3 ]  
    })
    class ParentComponent extends BaseComponent {
      @Prop() var2 = 10;
      @Prop() var3 = 20;
      
      emitCallback1(data) {
        this.var2 = data;
      }
      emitCallback2(data) {
        this.var3 = data;
      }
    }

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(ParentComponent).mount('app');
    
    let textContent = getTextContentById('2');
    expect(textContent).toBe('Result: 10');
    textContent = getTextContentById('3');
    expect(textContent).toBe('Result: 20')

    const $ = require('jquery');
    $('#id-btn1').click();
    
    await timeout(100);
    
    textContent = getTextContentById('2');
    expect(textContent).toBe('Result: 1000');

    $('#id-btn2').click();
    
    await timeout(100);

    textContent = getTextContentById('3');
    expect(textContent).toBe('Result: 2000')
  })

  test('Javascript emitting 4', async () => {
    @Component({
      tag: `child-component-4`,
      useShadow: false,
      template: `
        <div id="1">
          <button id="id-btn1" @click="click1">Button</button>
        </div>
      `,
    })
    class ChildComponent4 extends BaseComponent {
      click1() {
        this.emit('setRow1', null);
      }
    }
    
    @Component({
      tag: `parent-component-4`,
      useShadow: false,
      template: `
      <div>
        <div id="2">Result: {{ var2 }}</div>
        <child-component-4 @setRow1="emitCallback1"></child-component-4>
      </div>`,
      components: [ ChildComponent4 ]  
    })
    class ParentComponent extends BaseComponent {
      @Prop() var2 = 10;
      
      emitCallback1(data) {
        this.var2 = data;
      }
    }

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(ParentComponent).mount('app');
    
    let textContent = getTextContentById('2');
    expect(textContent).toBe('Result: 10');

    const $ = require('jquery');
    $('#id-btn1').click();
    
    await timeout(100);
    
    textContent = getTextContentById('2');
    expect(textContent).toBe('Result: null');

  })

  test('Javascript emitting 5', async () => {
    @Component({
      tag: `child-component-5`,
      useShadow: false,
      template: `
        <div id="1">
          <button id="id-btn1" @click="click1">Button</button>
        </div>
      `,
    })
    class ChildComponent5 extends BaseComponent {
      click1() {
        this.emit('setRow4', undefined);
      }
    }
    
    @Component({
      tag: `parent-component-5`,
      useShadow: false,
      template: `
      <div>
        <div id="2">Result: {{ var2 }}</div>
        <child-component-5 @setRow4="emitCallback1"></child-component-5>
      </div>`,
      components: [ ChildComponent5 ]  
    })
    class ParentComponent extends BaseComponent {
      @Prop() var2 = 10;
      
      emitCallback1(data) {
        this.var2 = data;
      }
    }

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(ParentComponent).mount('app');
    
    let textContent = getTextContentById('2');
    expect(textContent).toBe('Result: 10');

    const $ = require('jquery');
    $('#id-btn1').click();
    
    await timeout(100);
    
    textContent = getTextContentById('2');
    expect(textContent).toBe('Result: undefined');
  })


  test('Javascript emitting 6', async () => {
    @Component({
      tag: `child-component-6`,
      useShadow: false,
      template: `
        <div id="1">
          <button id="id-btn6" @click="click6">Button</button>
        </div>
      `,
    })
    class ChildComponent6 extends BaseComponent {
      click6() {
        this.emit('setRow6', 2000);
      }
    }
    
    @Component({
      tag: `parent-component-6`,
      useShadow: false,
      template: `
      <div>
        <div id="2">Result: {{ var6 }}</div>
        <child-component-6 @set-row6="emitCallback6"></child-component-6>
      </div>`,
      components: [ ChildComponent6 ]  
    })
    class ParentComponent extends BaseComponent {
      @Prop() var6 = 10;
      
      emitCallback6(data) {
        this.var6 = data;
      }
    }

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(ParentComponent).mount('app');
    
    let textContent = getTextContentById('2');
    expect(textContent).toBe('Result: 10');

    const $ = require('jquery');
    $('#id-btn6').click();
    
    await timeout(100);
    
    textContent = getTextContentById('2');
    expect(textContent).toBe('Result: 2000');
  })

  test('Javascript emitting 7', async () => {
    @Component({
      tag: `child-component-7`,
      useShadow: false,
      template: `
        <div id="1">
          <button id="id-btn7" @click="click7">Button</button>
        </div>
      `,
    })
    class ChildComponent7 extends BaseComponent {
      click7() {
        this.emit('setRow7', 2000);
      }
    }
    
    @Component({
      tag: `parent-component-7`,
      useShadow: false,
      template: `
      <div>
        <div id="2">Result: {{ var7 }}</div>
        <div id="3">Result: {{ var8 }}</div>
        <child-component-7 @set-row7="emitCallback7"></child-component-7>
        <child-component-7 @set-row8="emitCallback8"></child-component-7>
      </div>`,
      components: [ ChildComponent7 ]  
    })
    class ParentComponent extends BaseComponent {
      @Prop() var7 = 10;
      @Prop() var8 = 10;
      
      emitCallback7(data) {
        this.var7 = data;
      }

      emitCallback8(data) {
        this.var8 = data;
      }
    }

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(ParentComponent).mount('app');
    
    let textContent = getTextContentById('2');
    expect(textContent).toBe('Result: 10');

    const $ = require('jquery');
    $('#id-btn7').click();
    
    await timeout(100);
    
    textContent = getTextContentById('2');
    expect(textContent).toBe('Result: 2000');
    textContent = getTextContentById('3');
    expect(textContent).toBe('Result: 10');

  })

  test('Javascript emitting 8', async () => {
    @Component({
      tag: `child-component-8`,
      useShadow: false,
      template: `
        <div id="1">
          <button id="id-btn8" @click="click8">Button</button>
        </div>
      `,
    })
    class ChildComponent8 extends BaseComponent {
      click8() {
        this.emit('setRow9', 2000);
      }
    }
    @Component({
      tag: `child-component-9`,
      useShadow: false,
      template: `
        <div id="1">
          <button id="id-btn9" @click="click9">Button</button>
        </div>
      `,
    })
    class ChildComponent9 extends BaseComponent {
      click9() {
        this.emit('setRow10', 3000);
      }
    }
    
    @Component({
      tag: `parent-component-8`,
      useShadow: false,
      template: `
      <div>
        <div id="2">Result: {{ var9 }}</div>
        <div id="3">Result: {{ var10 }}</div>
        <child-component-8 @set-row9="emitCallback9"></child-component-8>
        <child-component-9 @set-row10="emitCallback10"></child-component-9>
      </div>`,
      components: [ ChildComponent8, ChildComponent9 ]  
    })
    class ParentComponent extends BaseComponent {
      @Prop() var9 = 10;
      @Prop() var10 = 20;
      
      emitCallback9(data) {
        this.var9 = data;
      }

      emitCallback10(data) {
        this.var10 = data;
      }
    }

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(ParentComponent).mount('app');
    
    let textContent = getTextContentById('2');
    expect(textContent).toBe('Result: 10');
    textContent = getTextContentById('3');
    expect(textContent).toBe('Result: 20');

    const $ = require('jquery');
    $('#id-btn8').click();
    $('#id-btn9').click();
    
    await timeout(500);
    
    textContent = getTextContentById('2');
    expect(textContent).toBe('Result: 2000');
    textContent = getTextContentById('3');
    expect(textContent).toBe('Result: 3000');

  })

  test('Javascript emitting 11', async () => {
    @Component({
      tag: `child-component-11`,
      useShadow: false,
      template: `
        <div id="1">
          <button class="emitting" @click="click11">Button</button>
        </div>
      `,
    })
    class ChildComponent11 extends BaseComponent {
      click11() {
        this.emit('setRow11', 2000);
        this.emit('setRow12', 3000);
      }
    }
    
    @Component({
      tag: `parent-component-11`,
      useShadow: false,
      template: `
      <div>
        <div id="2">Result: {{ var11 }}</div>
        <div id="3">Result: {{ var12 }}</div>
        <child-component-11 @set-row11="emitCallback11"></child-component-11>
        <child-component-11 @set-row12="emitCallback12"></child-component-11>
      </div>`,
      components: [ ChildComponent11 ]  
    })
    class ParentComponent extends BaseComponent {
      @Prop() var11 = 10;
      @Prop() var12 = 10;
      
      emitCallback11(data) {
        this.var11 = data;
      }

      emitCallback12(data) {
        this.var12 = data;
      }
    }

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(ParentComponent).mount('app');
    
    let textContent = getTextContentById('2');
    expect(textContent).toBe('Result: 10');

    const $ = require('jquery');
    const buttons = $('.emitting');

    for (let i=0; i<buttons.length; i++) {
      buttons[i].click();      
    }
    
    await timeout(100);
    
    textContent = getTextContentById('2');
    expect(textContent).toBe('Result: 2000');
    textContent = getTextContentById('3');
    expect(textContent).toBe('Result: 3000');
  })

});