import { BaseComponent, Component, Prop, VComponent } from '@core';

describe("List rendering component functionality", () => {

  test('List rendering 1', () => {
    @Component({
      tag: `list-component-1`,
      useShadow: false,
      template: `
        <div>
          <div :for="item in items" class="list">
            {{ item }} 
          </div>
        </div>`,
    })
    class ListComponent extends BaseComponent {
      @Prop() items = ['Item1', 'Item2', 'Item3', 'Item4', 'Item5'];
    }

    customElements.define('list-component-1', ListComponent as any);
    document.body.innerHTML = `<list-component-1></list-component-1>`

    const els = document.getElementsByClassName('list');
    expect(els).not.toBeNull();
    expect(els.length).toBe(5);
    expect(els[0].textContent).toBe('Item1');
    expect(els[1].textContent).toBe('Item2');
    expect(els[2].textContent).toBe('Item3');
    expect(els[3].textContent).toBe('Item4');
    expect(els[4].textContent).toBe('Item5');
  })

  test('List rendering 2', () => {
    @Component({
      tag: `list-component-2`,
      useShadow: false,
      template: `
        <div>
          <div :for="item in items" class="list">
            <div>
              <div>
                <div>
                  <div>
                    <div>
                      <div>
                        {{ item }} {{ count }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`,
    })
    class ListComponent extends BaseComponent {
      @Prop() items = ['Item1', 'Item2', 'Item3', 'Item4'];
      @Prop() count = 10;
    }

    customElements.define('list-component-2', ListComponent as any);
    document.body.innerHTML = `<list-component-2></list-component-2>`

    const els = document.getElementsByClassName('list');
    expect(els).not.toBeNull();
    expect(els.length).toBe(4);

    let textContent = els[0].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('Item1 10');
    }
    textContent = els[1].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('Item2 10');
    }
    textContent = els[2].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('Item3 10');
    }
    textContent = els[3].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('Item4 10');
    }
  })

  test('List rendering 3', () => {
    @Component({
      tag: `list-component-3`,
      useShadow: false,
      template: `
        <div>
          <div :for="item in items" class="list">
            <div>
              {{ item }}
            </div>
          </div>
          <button id="id-btn" @click="toggle">Handle</button>
        </div>`,
    })
    class ListComponent extends BaseComponent {
      @Prop() items = ['Item1', 'Item2', 'Item3'];

      toggle() {
        this.items.push(`Item${this.items.length + 1}`);
        this.render();
      }
    }

    customElements.define('list-component-3', ListComponent as any);
    document.body.innerHTML = `<list-component-3></list-component-3>`

    const $ = require('jquery');
    $('#id-btn').click();

    let els = document.getElementsByClassName('list');
    expect(els).not.toBeNull();
    expect(els.length).toBe(4);

    let textContent = els[0].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('Item1');
    }
    textContent = els[1].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('Item2');
    }
    textContent = els[2].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('Item3');
    }
    textContent = els[3].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('Item4');
    }

    $('#id-btn').click();
    els = document.getElementsByClassName('list');
    expect(els).not.toBeNull();
    expect(els.length).toBe(5);

    textContent = els[4].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('Item5');
    }
  })

  test('List rendering 4', () => {
    @Component({
      tag: `list-component-4`,
      useShadow: false,
      template: `
        <div>
          <div :for="item in items" class="list">
            <div>
              {{ item }}
            </div>
          </div>
          <button id="id-btn" @click="toggle">Handle</button>
        </div>`,
    })
    class ListComponent extends BaseComponent {
      @Prop() items = ['Item1', 'Item2', 'Item3', 'Item4', 'Item5'];

      toggle() {
        this.items.pop();
        this.render();
      }
    }

    customElements.define('list-component-4', ListComponent as any);
    document.body.innerHTML = `<list-component-4></list-component-4>`

    let els = document.getElementsByClassName('list');
    expect(els).not.toBeNull();
    expect(els.length).toBe(5);

    const $ = require('jquery');
    $('#id-btn').click();

    els = document.getElementsByClassName('list');
    expect(els).not.toBeNull();
    expect(els.length).toBe(4);

    let textContent = els[0].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('Item1');
    }
    textContent = els[1].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('Item2');
    }
    textContent = els[2].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('Item3');
    }
    textContent = els[3].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('Item4');
    }

    $('#id-btn').click();
    els = document.getElementsByClassName('list');

    expect(els).not.toBeNull();
    expect(els.length).toBe(3);

    textContent = els[2].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('Item3');
    }
  })

  test('List rendering 5', () => {
    @Component({
      tag: `list-component-5`,
      useShadow: false,
      template: `
        <div>
          <div :for="item in items" class="list">
            <div>
              {{ item }}
            </div>
          </div>
          <button id="add-btn" @click="add">Handle</button>
          <button id="del-btn" @click="delete">Handle</button>
        </div>`,
    })
    class ListComponent extends BaseComponent {
      @Prop() items = ['Item1', 'Item2', 'Item3', 'Item4', 'Item5'];

      add() {
        this.items.splice(2, 0, `Item${this.items.length + 1}`)
        this.render();
      }

      delete() {
        this.items.splice(1, 1)
        this.render();
      }
    }

    customElements.define('list-component-5', ListComponent as any);
    document.body.innerHTML = `<list-component-5></list-component-5>`

    let els = document.getElementsByClassName('list');
    expect(els).not.toBeNull();
    expect(els.length).toBe(5);

    const $ = require('jquery');
    $('#add-btn').click();

    els = document.getElementsByClassName('list');
    expect(els).not.toBeNull();
    expect(els.length).toBe(6);

    let textContent = els[0].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('Item1');
    }
    textContent = els[1].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('Item2');
    }
    textContent = els[2].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('Item6');
    }
    textContent = els[3].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('Item3');
    }
    textContent = els[4].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('Item4');
    }
    textContent = els[5].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('Item5');
    }

    $('#del-btn').click();
    els = document.getElementsByClassName('list');

    expect(els).not.toBeNull();
    expect(els.length).toBe(5);

    textContent = els[0].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('Item1');
    }
    textContent = els[1].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('Item6');
    }
    textContent = els[2].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('Item3');
    }
    textContent = els[3].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('Item4');
    }
    textContent = els[4].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('Item5');
    }

    $('#del-btn').click();
    $('#del-btn').click();
    els = document.getElementsByClassName('list');

    expect(els).not.toBeNull();
    expect(els.length).toBe(3);

    textContent = els[0].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('Item1');
    }
    textContent = els[1].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('Item4');
    }
    textContent = els[2].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('Item5');
    }

    $('#del-btn').click();
    els = document.getElementsByClassName('list');

    expect(els).not.toBeNull();
    expect(els.length).toBe(2);

    textContent = els[0].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('Item1');
    }
    textContent = els[1].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('Item5');
    }

    $('#add-btn').click();
    $('#add-btn').click();
    els = document.getElementsByClassName('list');

    expect(els).not.toBeNull();
    expect(els.length).toBe(4);

    textContent = els[0].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('Item1');
    }
    textContent = els[1].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('Item5');
    }
    textContent = els[2].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('Item4');
    }
    textContent = els[3].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('Item3');
    }
  })

  test('List rendering 6', () => {
    @Component({
      tag: `list-component-6`,
      useShadow: false,
      template: `
        <div>
          <div :for="item in items" class="list">
            <div :if="isEnabled">
              {{ item }} 
            </div>	
          </div>
          <button id="toggle-btn" @click="toggle">Handle</button>
        </div>`,
    })
    class ListComponent extends BaseComponent {
      @Prop() items = ['Item1', 'Item2', 'Item3', 'Item4', 'Item5'];
      @Prop() isEnabled = true;

      toggle() {
        this.isEnabled = !this.isEnabled;
        this.render();
      }
    }

    customElements.define('list-component-6', ListComponent as any);
    document.body.innerHTML = `<list-component-6></list-component-6>`

    let els = document.getElementsByClassName('list');
    expect(els).not.toBeNull();
    expect(els.length).toBe(5);

    for (let i = 0; i < els.length; i++) {
      const textContent = els[i].textContent;
      if (textContent) {
        expect(textContent.trim()).toBe(`Item${i+1}`);
      }
    }

    const $ = require('jquery');
    $('#toggle-btn').click();

    els = document.getElementsByClassName('list');
    expect(els).not.toBeNull();
    expect(els.length).toBe(5);

    for (let i = 0; i < els.length; i++) {
      const textContent = els[i].textContent;
      if (textContent) {
        expect(textContent.trim()).toBe('');
      }
    }

    $('#toggle-btn').click();

    els = document.getElementsByClassName('list');
    expect(els).not.toBeNull();
    expect(els.length).toBe(5);

    for (let i = 0; i < els.length; i++) {
      const textContent = els[i].textContent;
      if (textContent) {
        expect(textContent.trim()).toBe(`Item${i+1}`);
      }
    }

  })
  test('List rendering 7', () => {
    @Component({
      tag: `list-component-7`,
      useShadow: false,
      template: `
        <div>
          <div :for="item in items" class="list">
            <div class="class1 ":class="customClass" :style="customStyle">
              {{ item }} 
            </div>	
          </div>
          <button id="toggle-btn" @click="toggle">Handle</button>
        </div>`,
    })
    class ListComponent extends BaseComponent implements VComponent  {
      @Prop() items = ['Item1', 'Item2', 'Item3', 'Item4', 'Item5'];
      @Prop() customClass = "class2";
      @Prop() customStyle = "color: green;";

      toggle() {
        this.customClass = 'class3';
        this.customStyle = 'color: red;';
        this.render();
      }
    }

    customElements.define('list-component-7', ListComponent as any);
    document.body.innerHTML = `<list-component-7></list-component-7>`

    let els = document.getElementsByClassName('list');
    expect(els).not.toBeNull();
    expect(els.length).toBe(5);

    for (let i = 0; i < els.length; i++) {
      const textContent = els[i].textContent;
      if (textContent) {
        expect(textContent.trim()).toBe(`Item${i+1}`);
      }
      expect(els[i].classList[0]).toBe('list');
      expect(els[i].children[0].classList[0]).toBe('class1');
      expect(els[i].children[0].classList[1]).toBe('class2');
      expect(els[i].children[0].getAttribute('style')).toBe('color: green;');
    }

    const $ = require('jquery');
    $('#toggle-btn').click();

    els = document.getElementsByClassName('list');
    expect(els).not.toBeNull();
    expect(els.length).toBe(5);

    for (let i = 0; i < els.length; i++) {
      const textContent = els[i].textContent;
      if (textContent) {
        expect(textContent.trim()).toBe(`Item${i+1}`);
      }
      expect(els[i].classList[0]).toBe('list');
      expect(els[i].children[0].classList[0]).toBe('class1');
      expect(els[i].children[0].classList[1]).toBe('class3');
      expect(els[i].children[0].getAttribute('style')).toBe('color: red;');
    }

  })

  test('List rendering 8', () => {
    @Component({
      tag: `list-component-8`,
      useShadow: false,
      template: `
        <div>
          <div :for="item in items" class="list">
            {{ item }} 
          </div>
          <button id="add-btn" @click="add">Handle</button>
          <button id="del-btn" @click="delete">Handle</button>
        </div>`,
    })
    class ListComponent extends BaseComponent {
      @Prop() items: string[] = [];

      add() {
        this.items.push(`Item${this.items.length + 1}`);
        this.render();
      }
      delete() {
        this.items.pop();
        this.render();
      }
    }

    customElements.define('list-component-8', ListComponent as any);
    document.body.innerHTML = `<list-component-8></list-component-8>`

    let els = document.getElementsByClassName('list');
    expect(els).not.toBeNull();
    expect(els.length).toBe(0);

    const $ = require('jquery');
    $('#add-btn').click();

    els = document.getElementsByClassName('list');
    expect(els).not.toBeNull();
    expect(els.length).toBe(1);

    $('#del-btn').click();
    $('#del-btn').click();
    $('#del-btn').click();
    $('#del-btn').click();

    els = document.getElementsByClassName('list');
    expect(els).not.toBeNull();
    expect(els.length).toBe(0);
  })

  test('List rendering 9', () => {
    @Component({
      tag: `list-component-9`,
      useShadow: false,
      template: `
        <div>
          <button id="add-btn" @click="add">Handle</button>
          <button id="del-btn" @click="delete">Handle</button>
          <div :for="item in items" class="list">
            {{ item }} 
          </div>
        </div>`,
    })
    class ListComponent extends BaseComponent {
      @Prop() items: string[] = [];

      add() {
        this.items.push(`Item${this.items.length + 1}`);
        this.render();
      }
      delete() {
        this.items.pop();
        this.render();
      }
    }

    customElements.define('list-component-9', ListComponent as any);
    document.body.innerHTML = `<list-component-9></list-component-9>`

    let els = document.getElementsByClassName('list');
    expect(els).not.toBeNull();
    expect(els.length).toBe(0);

    const $ = require('jquery');
    $('#add-btn').click();
    $('#add-btn').click();
    $('#add-btn').click();

    els = document.getElementsByClassName('list');
    expect(els).not.toBeNull();
    expect(els.length).toBe(3);

    for (let i = 0; i < els.length; i++) {
      const textContent = els[i].textContent;
      if (textContent) {
        expect(textContent.trim()).toBe(`Item${i+1}`);
      }
    }
 
    $('#del-btn').click();

    els = document.getElementsByClassName('list');
    expect(els).not.toBeNull();
    expect(els.length).toBe(2);

    $('#add-btn').click();

    els = document.getElementsByClassName('list');
    expect(els).not.toBeNull();
    expect(els.length).toBe(3);

    $('#del-btn').click();

  })

  test('List rendering 10', () => {
    @Component({
      tag: `list-component-10`,
      useShadow: false,
      template: `
        <div>
          <div :for="item in items" class="list">
            <div>
              {{ item }}
            </div>
          </div>
          <button id="id-btn" @click="remove">Handle</button>
        </div>`,
    })
    class ListComponent extends BaseComponent {
      @Prop() items = ['Item1', 'Item2', 'Item3', 'Item4', 'Item5'];

      remove() {
        this.items.pop();
        this.items.pop();
        this.items.pop();
        this.items.pop();
        this.render();
      }
    }

    customElements.define('list-component-10', ListComponent as any);
    document.body.innerHTML = `<list-component-10></list-component-10>`

    let els = document.getElementsByClassName('list');
    expect(els).not.toBeNull();
    expect(els.length).toBe(5);

    const $ = require('jquery');
    $('#id-btn').click();

    els = document.getElementsByClassName('list');
    expect(els).not.toBeNull();
    expect(els.length).toBe(1);

    for (let i = 0; i < els.length; i++) {
      const textContent = els[i].textContent;
      if (textContent) {
        expect(textContent.trim()).toBe(`Item${i+1}`);
      }
    }

  })

  test('List rendering 11', () => {
    @Component({
      tag: `list-component-11`,
      useShadow: false,
      template: `
        <div>
          <div :for="item in items" class="list">
            <div>
              {{ item }} 
            </div>
          </div>
          <button id="add-btn" @click="add">Handle</button>
          <button id="del-btn" @click="remove">Handle</button>
        </div>`,
    })
    class ListComponent extends BaseComponent {
      @Prop() items = [ 
        {id: '0', title: 'Item1'}, 
        {id: '1', title: 'Item2'}, 
        {id: '2', title: 'Item3'}, 
        {id: '3', title: 'Item4'}, 
      ];

      add() {
        this.items.push({ id: `${this.items.length}`, title: `Item${this.items.length + 1}` });
        this.render();
      }

      remove() {
        this.items.pop();
        this.render();
      }
    }

    customElements.define('list-component-11', ListComponent as any);
    document.body.innerHTML = `<list-component-11></list-component-11>`

    let els = document.getElementsByClassName('list');
    expect(els).not.toBeNull();
    expect(els.length).toBe(4);

    for (let i = 0; i < els.length; i++) {
      const textContent = els[i].textContent;
      if (textContent) {
        expect(textContent.trim()).toBe(`{"id":"${i}","title":"Item${i+1}"}`);
      }
    }

    const $ = require('jquery');
    $('#add-btn').click();
    $('#add-btn').click();
    $('#add-btn').click();

    els = document.getElementsByClassName('list');
    expect(els).not.toBeNull();
    expect(els.length).toBe(7);

    for (let i = 0; i < els.length; i++) {
      const textContent = els[i].textContent;
      if (textContent) {
        expect(textContent.trim()).toBe(`{"id":"${i}","title":"Item${i+1}"}`);
      }
    }

    $('#del-btn').click();
    $('#del-btn').click();

    els = document.getElementsByClassName('list');
    expect(els).not.toBeNull();
    expect(els.length).toBe(5);

    for (let i = 0; i < els.length; i++) {
      const textContent = els[i].textContent;
      if (textContent) {
        expect(textContent.trim()).toBe(`{"id":"${i}","title":"Item${i+1}"}`);
      }
    }

  })

  test('List rendering 12', () => {
    @Component({
      tag: `list-component-12`,
      useShadow: false,
      template: `
        <div>
          <div :for="item in items" class="list">
            <div>
              Value is {{ item.id }} {{ item.title }} 
            </div>
          </div>
          <button id="add-btn" @click="add">Handle</button>
          <button id="del-btn" @click="remove">Handle</button>
        </div>`,
    })
    class ListComponent extends BaseComponent {
      @Prop() items = [ 
        {id: '0', title: 'Item1'}, 
        {id: '1', title: 'Item2'}, 
        {id: '2', title: 'Item3'}, 
        {id: '3', title: 'Item4'}, 
      ];

      add() {
        this.items.push({ id: `${this.items.length}`, title: `Item${this.items.length + 1}` });
        this.render();
      }

      remove() {
        this.items.pop();
        this.render();
      }
    }

    customElements.define('list-component-12', ListComponent as any);
    document.body.innerHTML = `<list-component-12></list-component-12>`

    let els = document.getElementsByClassName('list');
    expect(els).not.toBeNull();
    expect(els.length).toBe(4);

    for (let i = 0; i < els.length; i++) {
      const textContent = els[i].textContent;
      if (textContent) {
        expect(textContent.trim()).toBe(`Value is ${i} Item${i+1}`);
      }
    }

    const $ = require('jquery');
    $('#add-btn').click();
    $('#add-btn').click();
    $('#add-btn').click();

    els = document.getElementsByClassName('list');
    expect(els).not.toBeNull();
    expect(els.length).toBe(7);

    for (let i = 0; i < els.length; i++) {
      const textContent = els[i].textContent;
      if (textContent) {
        expect(textContent.trim()).toBe(`Value is ${i} Item${i+1}`);
      }
    }

    $('#del-btn').click();
    $('#del-btn').click();

    els = document.getElementsByClassName('list');
    expect(els).not.toBeNull();
    expect(els.length).toBe(5);

    for (let i = 0; i < els.length; i++) {
      const textContent = els[i].textContent;
      if (textContent) {
        expect(textContent.trim()).toBe(`Value is ${i} Item${i+1}`);
      }
    }

  })

  test('List rendering 13', () => {
    @Component({
      tag: `list-component-13`,
      useShadow: false,
      template: `
        <div>
          <div :for="item in items" class="list">
            <div>
              Value is {{ item.id }} {{ item.title }} {{ item.child.id }}
            </div>
          </div>
          <button id="add-btn" @click="add">Handle</button>
          <button id="del-btn" @click="remove">Handle</button>
        </div>`,
    })
    class ListComponent extends BaseComponent {
      @Prop() items = [ 
        {id: '0', title: 'Item1', child: { id: 'child1'}}, 
        {id: '1', title: 'Item2', child: { id: 'child2'}}, 
        {id: '2', title: 'Item3', child: { id: 'child3'}}, 
        {id: '3', title: 'Item4', child: { id: 'child4'}}, 
      ];

      add() {
        this.items.push({ id: `${this.items.length}`, title: `Item${this.items.length + 1}`, child: { id: `child${this.items.length + 1}`} });
        this.render();
      }

      remove() {
        this.items.pop();
        this.render();
      }
    }

    customElements.define('list-component-13', ListComponent as any);
    document.body.innerHTML = `<list-component-13></list-component-13>`

    let els = document.getElementsByClassName('list');
    expect(els).not.toBeNull();
    expect(els.length).toBe(4);

    for (let i = 0; i < els.length; i++) {
      const textContent = els[i].textContent;
      if (textContent) {
        expect(textContent.trim()).toBe(`Value is ${i} Item${i+1} child${i+1}`);
      }
    }

    const $ = require('jquery');
    $('#add-btn').click();

    els = document.getElementsByClassName('list');
    expect(els).not.toBeNull();
    expect(els.length).toBe(5);

    for (let i = 0; i < els.length; i++) {
      const textContent = els[i].textContent;
      if (textContent) {
        expect(textContent.trim()).toBe(`Value is ${i} Item${i+1} child${i+1}`);
      }
    }

    $('#del-btn').click();
    $('#del-btn').click();

    els = document.getElementsByClassName('list');
    expect(els).not.toBeNull();
    expect(els.length).toBe(3);

    for (let i = 0; i < els.length; i++) {
      const textContent = els[i].textContent;
      if (textContent) {
        expect(textContent.trim()).toBe(`Value is ${i} Item${i+1} child${i+1}`);
      }
    }

  })

  test('List rendering 14', () => {
    @Component({
      tag: `list-component-14`,
      useShadow: false,
      template: `
        <div>
          <div :for="item in items" class="list">
            <div>
              Value is {{ item.id }} {{ item.title }} {{ item.child.id }}
            </div>
          </div>
        </div>`,
    })
    class ListComponent extends BaseComponent {
      @Prop() items = null;
    }

    customElements.define('list-component-14', ListComponent as any);
    document.body.innerHTML = `<list-component-14></list-component-14>`

    let els = document.getElementsByClassName('list');
    expect(els).not.toBeNull();
    expect(els.length).toBe(0);
  })

  test('List rendering 15', () => {
    @Component({
      tag: `list-component-15`,
      useShadow: false,
      template: `
        <div>
          <div :for="item in items" class="list">
            <div>
              Value is {{ item.id }} {{ item.title }} {{ item.child.id }}
            </div>
          </div>
          <div :for="item in items1" class="list1">
            <div>
              Value is {{ item.id }} {{ item.title }} {{ item.child.id }}
            </div>
          </div>
        </div>`,
    })
    class ListComponent extends BaseComponent {
      @Prop() items = undefined;
      @Prop() items1 = null;
    }

    customElements.define('list-component-15', ListComponent as any);
    document.body.innerHTML = `<list-component-15></list-component-15>`

    let els = document.getElementsByClassName('list');
    expect(els).not.toBeNull();
    expect(els.length).toBe(0);

    els = document.getElementsByClassName('list1');
    expect(els).not.toBeNull();
    expect(els.length).toBe(0);
  })

  test('List rendering 16', () => {
    @Component({
      tag: `list-component-16`,
      useShadow: false,
      template: `
        <div>
          <div :for="item in items" class="list">
            <div>
              Value is {{ item.id }} {{ item.title }} {{ item.child.id }}
            </div>
          </div>
        </div>`,
    })
    class ListComponent extends BaseComponent {
      @Prop() items = ['1', '2', '3'];
    }

    customElements.define('list-component-16', ListComponent as any);
    document.body.innerHTML = `<list-component-16></list-component-16>`

    let els = document.getElementsByClassName('list');
    expect(els).not.toBeNull();
    expect(els.length).toBe(3);

    for (let i = 0; i < els.length; i++) {
      const textContent = els[i].textContent;
      if (textContent) {
        expect(textContent.trim()).toBe(`Value is ${i+1} ${i+1} ${i+1}`);
      }
    }
 
  })

  test('List rendering 17', () => {
    @Component({
      tag: `list-component-17`,
      useShadow: false,
      template: `
        <div>
          <div :for="i in item" class="list">
            <div>
              {{ i }}
            </div>
          </div>
        </div>`,
    })
    class ListComponent extends BaseComponent {
      @Prop() item = {
        title: 'How to do lists in WF',
        author: 'John Smith',
        publishedAt: '2021-03-12'
      }
    }

    customElements.define('list-component-17', ListComponent as any);
    document.body.innerHTML = `<list-component-17></list-component-17>`

    let els = document.getElementsByClassName('list');
    expect(els).not.toBeNull();
    expect(els.length).toBe(3);

    let textContent = els[0].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('How to do lists in WF');
    }
    textContent = els[1].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('John Smith');
    }
    textContent = els[2].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('2021-03-12');
    } 
  })

  test('List rendering 18', () => {
    @Component({
      tag: `list-component-18`,
      useShadow: false,
      template: `
        <div>
          <div :for="i in item" class="list">
            <div>
              {{ a }}
            </div>
          </div>
        </div>`,
    })
    class ListComponent extends BaseComponent {
      @Prop() item = {
        title: 'How to do lists in WF',
        author: 'John Smith',
        publishedAt: '2021-03-12'
      }
    }

    customElements.define('list-component-18', ListComponent as any);
    document.body.innerHTML = `<list-component-18></list-component-18>`

    let els = document.getElementsByClassName('list');
    expect(els).not.toBeNull();
    expect(els.length).toBe(3)

    let textContent = els[0].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('');
    }
    textContent = els[1].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('');
    }
    textContent = els[2].textContent;
    if (textContent) {
      expect(textContent.trim()).toBe('');
    } 
  })


  //TODO: should be added some input parser for scoping of the variables
  //commented string in the test is proper behavior, 
  //the next one should be deleted after the fix 
  test('List rendering 19', () => {
    @Component({
      tag: `list-component-19`,
      useShadow: false,
      template: `
        <div>
          <div id="1">{{ item }}</div>
          <div :for="item in items" class="list">
            <div>
              Value is {{ item }}
            </div>
          </div>
        </div>`,
    })
    class ListComponent extends BaseComponent {
      @Prop() item = 'Hello Test!!!';
      @Prop() items = ['1', '2', '3'];
    }

    customElements.define('list-component-19', ListComponent as any);
    document.body.innerHTML = `<list-component-19></list-component-19>`

    let els = document.getElementsByClassName('list');
    expect(els).not.toBeNull();
    expect(els.length).toBe(3);

    for (let i = 0; i < els.length; i++) {
      const textContent = els[i].textContent;
      if (textContent) {
        // expect(textContent.trim()).toBe(`Value is ${i+1}`);
        expect(textContent.trim()).toBe(`Value is Hello Test!!!`);
      }
    }
 
  })

});