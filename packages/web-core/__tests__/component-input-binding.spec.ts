import { BaseComponent, Component, WF, Prop } from '@core';
import { getClassesById, getStylesById, getTextContentById } from './testUtils';

describe("Components input binding functionality", () => {
 
  const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  test('Javascript binding 1', async () => {
    @Component({
      tag: `child-component-1`,
      useShadow: false,
      template: `
        <div id="1">Result: {{ parentValue }}</div>`,
    })
    class ChildComponent extends BaseComponent {
      @Prop() parentValue = 0;
    }
    
    @Component({
      tag: `parent-component-1`,
      useShadow: false,
      template: `
      <div>
        <div id="2">Result: {{ var1 }}</div>
        <child-component-1 :parent-value="var1"></child-component-1>
      </div>`,
      components: [ ChildComponent ]  
    })
    class ParentComponent extends BaseComponent {
      @Prop() var1 = 10;
    }

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(ParentComponent).mount('app');
    
    await timeout(100);
    
    let textContent = getTextContentById('1');
    expect(textContent).toBe('Result: 10')
    textContent = getTextContentById('2');
    expect(textContent).toBe('Result: 10')
  })

  test('Javascript binding 2', async () => {
    @Component({
      tag: `bind-component-2`,
      useShadow: false,
      template: `
        <div>
          <button id="id-btn1" @click="click1">Button</button>
          <div id="1">Result: {{ parentValue2 }} </div>
        </div>
      `,
    })
    class ChildComponent2 extends BaseComponent {
      @Prop() parentValue2 = 0;

      click1() {
        this.emit('setRow', 1000);
      }
    }
    
    @Component({
      tag: `parent-component-2`,
      useShadow: false,
      template: `
      <div>
        <div id="2">Result: {{ var2 }}</div>
        <bind-component-2 :parent-value2="var2" @setRow="emitCallback"></bind-component-2>
      </div>`,
      components: [ ChildComponent2 ]  
    })
    class ParentComponent2 extends BaseComponent {
      @Prop() var2 = 20;
      
      emitCallback(data) {
        this.var2 = data;
      }
    }

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(ParentComponent2).mount('app');
    
    await timeout(100);
    
    let textContent = getTextContentById('1');
    expect(textContent).toBe('Result: 20')
    textContent = getTextContentById('2');
    expect(textContent).toBe('Result: 20')
    
    const $ = require('jquery');
    $('#id-btn1').click();
    
    await timeout(100);

    textContent = getTextContentById('1');
    expect(textContent).toBe('Result: 1000')
    textContent = getTextContentById('2');
    expect(textContent).toBe('Result: 1000')
  })

  test('Javascript binding 3', async () => {
    @Component({
      tag: `bind-component-3`,
      useShadow: false,
      template: `
        <div>
          <div id="1">Result: {{ parentValue3 }} </div>
          <div id="2">Result: {{ parentValue33 }} </div>
        </div>
      `,
    })
    class ChildComponent3 extends BaseComponent {
      @Prop() parentValue3 = 0;
      @Prop() parentValue33 = 0;
    }
    
    @Component({
      tag: `parent-component-3`,
      useShadow: false,
      template: `
      <div>
        <div id="3">Result: {{ var3 }}</div>
        <div id="4">Result: {{ var33 }}</div>
        <bind-component-3 :parent-value3="var3" :parent-value33="var33"></bind-component-3>
      </div>`,
      components: [ ChildComponent3 ]  
    })
    class ParentComponent3 extends BaseComponent {
      @Prop() var3 = 20;
      @Prop() var33 = 210;      
    }

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(ParentComponent3).mount('app');
    
    await timeout(100);
    
    let textContent = getTextContentById('3');
    expect(textContent).toBe('Result: 20')
    textContent = getTextContentById('4');
    expect(textContent).toBe('Result: 210')
    textContent = getTextContentById('1');
    expect(textContent).toBe('Result: 20')
    textContent = getTextContentById('2');
    expect(textContent).toBe('Result: 210')
  })

  test('Javascript binding 4', async () => {
    @Component({
      tag: `bind-component-4`,
      useShadow: false,
      template: `
        <div>
          <div id="1">Result: {{ parentValue4 }} </div>
        </div>
      `,
    })
    class ChildComponent4 extends BaseComponent {
      @Prop() parentValue4 = 0;
    }
    
    @Component({
      tag: `parent-component-4`,
      useShadow: false,
      template: `
      <div>
        <div id="2">Result: {{ var4 }}</div>
        <bind-component-4 :parent-value4="var4"></bind-component-4>
      </div>`,
      components: [ ChildComponent4 ]  
    })
    class ParentComponent4 extends BaseComponent {
      @Prop() var4 = null;
    }

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(ParentComponent4).mount('app');
    
    await timeout(100);
    
    let textContent = getTextContentById('1');
    expect(textContent).toBe('Result: null')
    textContent = getTextContentById('2');
    expect(textContent).toBe('Result: null');

  })

  test('Javascript binding 5', async () => {
    @Component({
      tag: `bind-component-5`,
      useShadow: false,
      template: `
        <div>
          <div id="1">Result: {{ parentValue5 }} </div>
        </div>
      `,
    })
    class ChildComponent5 extends BaseComponent {
      @Prop() parentValue5 = 100;
    }
    
    @Component({
      tag: `parent-component-5`,
      useShadow: false,
      template: `
      <div>
        <div id="2">Result: {{ var5 }}</div>
        <bind-component-5 :parent-value4="var5"></bind-component-5>
      </div>`,
      components: [ ChildComponent5 ]  
    })
    class ParentComponent5 extends BaseComponent {
      @Prop() var5 = undefined;
    }

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(ParentComponent5).mount('app');
    
    await timeout(100);
    
    let textContent = getTextContentById('1');
    expect(textContent).toBe('Result: 100')
    textContent = getTextContentById('2');
    expect(textContent).toBe('Result: undefined');

  })

  test('Javascript binding 6', async () => {
    @Component({
      tag: `bind-component-6`,
      useShadow: false,
      template: `
        <div>
          <div id="1">Result: {{ parentValue6 }} </div>
        </div>
      `,
    })
    class ChildComponent6 extends BaseComponent {
      @Prop() parentValue6 = 100;
    }
    
    @Component({
      tag: `parent-component-6`,
      useShadow: false,
      template: `
      <div>
        <bind-component-6 :parent-value6="Test it!"></bind-component-6>
      </div>`,
      components: [ ChildComponent6 ]  
    })
    class ParentComponent6 extends BaseComponent {}

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(ParentComponent6).mount('app');
    
    await timeout(100);
    
    let textContent = getTextContentById('1');
    expect(textContent).toBe('Result: Test it!');
  })

  test('Javascript binding 7', async () => {
    @Component({
      tag: `bind-component-7`,
      useShadow: false,
      template: `
        <div>
          <div id="1">Result: {{ parentValue7 }} </div>
        </div>
      `,
    })
    class ChildComponent7 extends BaseComponent {
      @Prop() parentValue7 = 100;
    }
    
    @Component({
      tag: `parent-component-7`,
      useShadow: false,
      template: `
      <div>
        <bind-component-7 :parent-value6></bind-component-6>
      </div>`,
      components: [ ChildComponent7 ]  
    })
    class ParentComponent7 extends BaseComponent {}

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(ParentComponent7).mount('app');
    
    await timeout(100);
    
    let textContent = getTextContentById('1');
    expect(textContent).toBe('Result: 100');
  })

});