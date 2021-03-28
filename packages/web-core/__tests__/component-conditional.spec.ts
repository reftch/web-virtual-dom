import { BaseComponent, Component, Prop } from '@core';
import { getTextContentById, getClassesById, getStylesById } from './testUtils';

describe("Conditional component functionality", () => {

  test('Conditional rendering 1', () => {
    @Component({
      tag: `conditional-component`,
      useShadow: false,
      template: `
        <div>
          <div id="1" :if="isEnabled">div with if condition</div>
          <div id="2" :else>div with else condition</div>
          <div id="3" :if="!isEnabled">div with inverted if condition</div>
        </div>`,
    })
    class ConditionalComponent extends BaseComponent {
      @Prop() isEnabled = false;

      onMounted() {
        this.render();
      }

    }

    customElements.define('conditional-component', ConditionalComponent as any);
    document.body.innerHTML = `<conditional-component></conditional-component>`

    let el = document.getElementById('1');
    expect(el).toBeNull();
  
    el = document.getElementById('2');
    expect(el).not.toBeNull();
    expect(getTextContentById('2')).toEqual('div with else condition')
  
    el = document.getElementById('3');
    expect(el).not.toBeNull();
    expect(getTextContentById('3')).toEqual('div with inverted if condition')
  })

  test('Conditional rendering 2', () => {
    @Component({
      tag: `conditional-component-2`,
      useShadow: false,
      template: `
        <div>
          <div id="1" :if="isEnabled">div with if condition</div>
          <div id="2" :else>div with else condition</div>
          <div id="3" :if="!isEnabled">div with inverted if condition</div>
          <button id="id-btn" @click="handler">Button</button>
        </div>`,
    })
    class ConditionalComponent extends BaseComponent {
      @Prop() isEnabled = true;

      handler() {
        this.isEnabled = !this.isEnabled;
        this.render();
      }
    }
    
    customElements.define('conditional-component-2', ConditionalComponent as any);
    document.body.innerHTML = `<conditional-component-2></conditional-component-2>`;

    let el = document.getElementById('1');
    expect(el).not.toBeNull();
    expect(getTextContentById('1')).toEqual('div with if condition')

    el = document.getElementById('2');
    expect(el).toBeNull();
    el = document.getElementById('3');
    expect(el).toBeNull();

    const $ = require('jquery');
    $('#id-btn').click();

    el = document.getElementById('1');
    expect(el).toBeNull();
    el = document.getElementById('2');
    expect(el).not.toBeNull();
    expect(getTextContentById('2')).toEqual('div with else condition')
    el = document.getElementById('3');
    expect(el).not.toBeNull();
    expect(getTextContentById('3')).toEqual('div with inverted if condition')
  })

  test('Conditional rendering 3', () => {
    @Component({
      tag: `conditional-component-3`,
      useShadow: false,
      template: `
        <div>
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <div id="1" :if="isEnabled">div with if condition</div>
                    <div id="2" :else>div with else condition</div>
                  </div>
                </div>
              </div>
            </div>
          </div>	
          <button id="id-btn" @click="handler">Button</button>
        </div>`,
    })
    class ConditionalComponent extends BaseComponent {
      @Prop() isEnabled = true;

      handler() {
        this.isEnabled = !this.isEnabled;
        this.render();
      }
    }
    
    customElements.define('conditional-component-3', ConditionalComponent as any);
    document.body.innerHTML = `<conditional-component-3></conditional-component-3>`;

    let el = document.getElementById('1');
    expect(el).not.toBeNull();
    expect(getTextContentById('1')).toEqual('div with if condition')

    el = document.getElementById('2');
    expect(el).toBeNull();

    const $ = require('jquery');
    $('#id-btn').click();

    el = document.getElementById('1');
    expect(el).toBeNull();
    el = document.getElementById('2');
    expect(el).not.toBeNull();
    expect(getTextContentById('2')).toEqual('div with else condition')
  })

  test('Conditional rendering 4', () => {
    @Component({
      tag: `conditional-component-4`,
      useShadow: false,
      template: `
        <div>
          Test					
          <div>
            <div>
              <div :if="isEnabled">
                <div>
                  <div>
                    <div id="1">It works!</div>
                    <div id="2">It works also!</div>
                  </div>
                </div>
              </div>
            </div>
          </div>	
          <button id="id-btn" @click="handler">Button</button>
        </div>`,
    })
    class ConditionalComponent extends BaseComponent {
      @Prop() isEnabled = true;

      handler() {
        this.isEnabled = !this.isEnabled;
        this.render();
      }
    }
    
    customElements.define('conditional-component-4', ConditionalComponent as any);
    document.body.innerHTML = `<conditional-component-4></conditional-component-4>`;

    let el = document.getElementById('1');
    expect(el).not.toBeNull();
    expect(getTextContentById('1')).toEqual('It works!')

    el = document.getElementById('2');
    expect(el).not.toBeNull();
    expect(getTextContentById('2')).toEqual('It works also!')

    const $ = require('jquery');
    $('#id-btn').click();

    el = document.getElementById('1');
    expect(el).toBeNull();
    el = document.getElementById('2');
    expect(el).toBeNull();
  })

  test('Conditional rendering 5', () => {
    @Component({
      tag: `conditional-component-5`,
      useShadow: false,
      template: `
        <div>			
          <div>
            <div>
              <div :if="!isEnabled">
                <div id="1">It works!</div>
                <div id="2">It works also!</div>
              </div>
            </div>
          </div>	
          <button id="id-btn" @click="handler">Button</button>
        </div>`,
    })
    class ConditionalComponent extends BaseComponent {
      @Prop() isEnabled = true;

      handler() {
        this.isEnabled = false;
        this.render();
      }
    }
    
    customElements.define('conditional-component-5', ConditionalComponent as any);
    document.body.innerHTML = `<conditional-component-5></conditional-component-5>`;

    let el = document.getElementById('1');
    expect(el).toBeNull();
    el = document.getElementById('2');
    expect(el).toBeNull();
    
    const $ = require('jquery');
    $('#id-btn').click();
    
    el = document.getElementById('1');
    expect(el).not.toBeNull();
    expect(getTextContentById('1')).toEqual('It works!')

    el = document.getElementById('2');
    expect(el).not.toBeNull();
    expect(getTextContentById('2')).toEqual('It works also!')
  })

  test('Conditional rendering 6', () => {
    @Component({
      tag: `conditional-component-6`,
      useShadow: false,
      template: `
        <div>			
          <div>
            <!--:if-->
            <!--:if-->
            <!--:if-->
            <!--:if-->
            <!--:if-->
            <div>
              <div :if="!isEnabled">
                <div id="1">It works!</div>
                <div id="2">It works also!</div>
              </div>
            </div>
            <!--:if-->
            <!--:if-->
          </div>	
          <button id="id-btn" @click="handler">Button</button>
        </div>`,
    })
    class ConditionalComponent extends BaseComponent {
      @Prop() isEnabled = true;


      handler() {
        this.isEnabled = !this.isEnabled;
        this.render();
      }
    }
    
    customElements.define('conditional-component-6', ConditionalComponent as any);
    document.body.innerHTML = `<conditional-component-6></conditional-component-6>`;

    let el = document.getElementById('1');
    expect(el).toBeNull();
    el = document.getElementById('2');
    expect(el).toBeNull();
    
    const $ = require('jquery');
    $('#id-btn').click();
    
    el = document.getElementById('1');
    expect(el).not.toBeNull();
    expect(getTextContentById('1')).toEqual('It works!')

    el = document.getElementById('2');
    expect(el).not.toBeNull();
    expect(getTextContentById('2')).toEqual('It works also!')
  })

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


});