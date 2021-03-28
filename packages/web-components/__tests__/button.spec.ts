import { BaseComponent, Component, WF } from '@core';
import ButtonComponent from '../src/button/button.component';

describe("Base component functionality", () => {
  
  const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  test('Test button component 1', async () => {    
    @Component({
      tag: `parent-button-component-1`,
      useShadow: false,
      template: `
        <div>
          <wf-button :title="Custom Title" :primary="true"></wf-button>
        </div>
      `,
      components: [ ButtonComponent ]
    })
    class ParentComponent extends BaseComponent {}

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(ParentComponent).mount('app');

    await timeout(100);

    expect(document.body.innerHTML).toContain('Custom Title');
    let el = document.getElementsByClassName('button')
    expect(el.length).toEqual(1)
    el = document.getElementsByClassName('button-primary')
    expect(el.length).toEqual(1)
    el = document.getElementsByClassName('button-secondary')
    expect(el.length).toEqual(0)
    el = document.getElementsByClassName('button-primary-disabled')
    expect(el.length).toEqual(0)
    el = document.getElementsByClassName('button-disabled')
    expect(el.length).toEqual(0)
    el = document.getElementsByClassName('icon')
    expect(el.length).toEqual(0)
  })

  test('Test button component 2', async () => {    
    @Component({
      tag: `parent-button-component-2`,
      useShadow: false,
      template: `<wf-button :title="Custom Title2" :secondary="true"></wf-button>`,
      components: [ ButtonComponent ]
    })
    class ParentComponent extends BaseComponent {}

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(ParentComponent).mount('app');

    await timeout(100);

    expect(document.body.innerHTML).toContain('Custom Title2');
    let el = document.getElementsByClassName('button')
    expect(el.length).toEqual(1)
    el = document.getElementsByClassName('button-primary')
    expect(el.length).toEqual(0)
    el = document.getElementsByClassName('button-secondary')
    expect(el.length).toEqual(1)
    el = document.getElementsByClassName('button-primary-disabled')
    expect(el.length).toEqual(0)
    el = document.getElementsByClassName('button-disabled')
    expect(el.length).toEqual(0)
    el = document.getElementsByClassName('icon')
    expect(el.length).toEqual(0)
  })

  test('Test button component 3', async () => {    
    @Component({
      tag: `parent-button-component-3`,
      useShadow: false,
      template: `<wf-button :title="Custom Title3" :icon="icon-custom"></wf-button>`,
      components: [ ButtonComponent ]
    })
    class ParentComponent extends BaseComponent {}

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(ParentComponent).mount('app');

    await timeout(100);

    expect(document.body.innerHTML).toContain('Custom Title3');
    let el = document.getElementsByClassName('button')
    expect(el.length).toEqual(1)
    el = document.getElementsByClassName('button-primary')
    expect(el.length).toEqual(0)
    el = document.getElementsByClassName('button-secondary')
    expect(el.length).toEqual(0)
    el = document.getElementsByClassName('button-primary-disabled')
    expect(el.length).toEqual(0)
    el = document.getElementsByClassName('button-disabled')
    expect(el.length).toEqual(0)
    el = document.getElementsByClassName('icon')
    expect(el.length).toEqual(1)
    el = document.getElementsByClassName('icon-custom')
    expect(el.length).toEqual(1)
  })

  test('Test button component 4', async () => {    
    @Component({
      tag: `parent-button-component-4`,
      useShadow: false,
      template: `<wf-button :title="Custom Title4" :primary="true" :disabled="true"></wf-button>`,
      components: [ ButtonComponent ]
    })
    class ParentComponent extends BaseComponent {}

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(ParentComponent).mount('app');

    await timeout(100);

    expect(document.body.innerHTML).toContain('Custom Title4');
    let el = document.getElementsByClassName('button')
    expect(el.length).toEqual(1)
    el = document.getElementsByClassName('button-primary')
    expect(el.length).toEqual(1)
    el = document.getElementsByClassName('button-secondary')
    expect(el.length).toEqual(0)
    el = document.getElementsByClassName('button-primary-disabled')
    expect(el.length).toEqual(1)
    el = document.getElementsByClassName('button-disabled')
    expect(el.length).toEqual(0)
    el = document.getElementsByClassName('icon')
    expect(el.length).toEqual(0)
    el = document.getElementsByClassName('icon-custom')
    expect(el.length).toEqual(0)
  })

  test('Test button component 5', async () => {    
    @Component({
      tag: `parent-button-component-5`,
      useShadow: false,
      template: `<wf-button :title="Custom Title5" :disabled="true"></wf-button>`,
      components: [ ButtonComponent ]
    })
    class ParentComponent extends BaseComponent {}

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(ParentComponent).mount('app');

    await timeout(100);

    expect(document.body.innerHTML).toContain('Custom Title5');
    let el = document.getElementsByClassName('button')
    expect(el.length).toEqual(1)
    el = document.getElementsByClassName('button-primary')
    expect(el.length).toEqual(0)
    el = document.getElementsByClassName('button-secondary')
    expect(el.length).toEqual(0)
    el = document.getElementsByClassName('button-primary-disabled')
    expect(el.length).toEqual(0)
    el = document.getElementsByClassName('button-disabled')
    expect(el.length).toEqual(1)
    el = document.getElementsByClassName('icon')
    expect(el.length).toEqual(0)
    el = document.getElementsByClassName('icon-custom')
    expect(el.length).toEqual(0)
  })

  test('Test button component 6', async () => {    
    @Component({
      tag: `parent-button-component-6`,
      useShadow: false,
      template: `<wf-button :icon="icon-custom" :disabled="true"></wf-button>`,
      components: [ ButtonComponent ]
    })
    class ParentComponent extends BaseComponent {}

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(ParentComponent).mount('app');

    await timeout(100);

    let el = document.getElementsByClassName('button')
    expect(el.length).toEqual(1)
    el = document.getElementsByClassName('button-primary')
    expect(el.length).toEqual(0)
    el = document.getElementsByClassName('button-secondary')
    expect(el.length).toEqual(0)
    el = document.getElementsByClassName('button-primary-disabled')
    expect(el.length).toEqual(0)
    el = document.getElementsByClassName('button-disabled')
    expect(el.length).toEqual(1)
    el = document.getElementsByClassName('icon')
    expect(el.length).toEqual(1)
    el = document.getElementsByClassName('icon-custom')
    expect(el.length).toEqual(1)
  })

});