import { BaseComponent, Component, WF } from '@core';

describe("WF functionality", () => {

  test('Test start application', () => {
    @Component({
      tag: `simple-component`,
      useShadow: false,
      template: `
        <div>Simple component content</div>`,
    })
    class SimpleComponent extends BaseComponent {}


    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(SimpleComponent).mount('app');

    expect(document.body.innerHTML).toContain('Simple component content')
  })


});