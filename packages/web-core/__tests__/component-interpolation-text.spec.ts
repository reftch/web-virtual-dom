import { BaseComponent, Component, Prop, WF } from '@core';
import { getTextContentById } from './testUtils';

describe("Base template functionality", () => {

	test('Prop parameter in the component', () => {
    @Component({
      tag: `test-component`,
      useShadow: false,
      template: `
        <div id="id-test">
          {{ message }}
          <div id="id-message">{{ message }}</div>
          <div id="id-count">{{ count }}</div>
          <div id="id-math-value">{{ mathValue }}</div>
          <div id="id-boolean-value">{{ booleanValue }}</div>
        </div>`,
    })
    class TestComponent extends BaseComponent {
      @Prop() message = "It works!";
      @Prop() count = 100;
      @Prop() mathValue = 1.011;
      @Prop() booleanValue = true;
    }

    customElements.define('test-component', TestComponent as any);

    document.body.innerHTML = `<test-component></test-component>`
    expect(document.body.innerHTML).toContain('It works!')
    expect(getTextContentById('id-message')).toEqual('It works!')
    expect(getTextContentById('id-count')).toEqual('100')
    expect(getTextContentById('id-math-value')).toEqual('1.011')
    expect(getTextContentById('id-boolean-value')).toEqual('true')
  })

	test('Prop test 1', () => {
		@Component({
			tag: `prop-component`,
			useShadow: false,
			template: `
				<div id="1">{{message}}</div>
				<div id="2">{{ message }}</div>
				<div id="3">{{         message                }}</div>
				<div id="4">{ message }}</div>
			`,
		})
		class SimpleComponent extends BaseComponent {
			@Prop() message = "Simple component content";
		}

    customElements.define('prop-component', SimpleComponent as any);
    document.body.innerHTML = `<prop-component></prop-component>`;

		expect(getTextContentById('1')).toEqual('Simple component content');
		expect(getTextContentById('2')).toEqual('Simple component content');
		expect(getTextContentById('3')).toEqual('Simple component content');
		expect(getTextContentById('4')).toEqual('{ message }}');
  })

	test('Prop test 2', () => {
		@Component({
			tag: `prop-component-2`,
			useShadow: false,
			template: `
				<div id="1">{{message}}</div>
			`,
		})
		class SimpleComponent extends BaseComponent {
			message = "Simple component content";
		}

    customElements.define('prop-component-2', SimpleComponent as any);
    document.body.innerHTML = `<prop-component-2></prop-component-2>`;

		expect(getTextContentById('1')).toEqual('{{message}}');
  })

  test('Prop test 3', () => {
		@Component({
			tag: `prop-component-3`,
			useShadow: false,
			template: `
				<div id="1">{{message}}</div>
			`,
		})
		class SimpleComponent extends BaseComponent {
			@Prop() message = undefined;
		}

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(SimpleComponent).mount('app');

		expect(getTextContentById('1')).toEqual('undefined');
  })

  test('Prop test 4', () => {
		@Component({
			tag: `prop-component-4`,
			useShadow: false,
			template: `
				<div id="1">{{message}}</div>
			`,
		})
		class SimpleComponent extends BaseComponent {
			@Prop() message = null;
		}

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(SimpleComponent).mount('app');

		expect(getTextContentById('1')).toEqual('null');
  })

  test('Prop test 5', () => {
		@Component({
			tag: `prop-component-5`,
			useShadow: false,
			template: `
				<div id="1">{{message}}</div>
			`,
		})
		class SimpleComponent extends BaseComponent {
			@Prop() message = [];
		}

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(SimpleComponent).mount('app');

		expect(getTextContentById('1')).toBeUndefined();
  })

	test('Prop test 6', () => {
		@Component({
			tag: `prop-component-6`,
			useShadow: false,
			template: `
				<div id="1">{{message}}{{message}}{{message}}</div>
			`,
		})
		class SimpleComponent extends BaseComponent {
			@Prop() message = 'Test';
		}

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(SimpleComponent).mount('app');

		expect(getTextContentById('1')).toEqual('TestTestTest');
  })

	test('Prop test 7', () => {
		@Component({
			tag: `prop-component-7`,
			useShadow: false,
			template: `
				<div id="1">{{message}}</div>
			`,
		})
		class SimpleComponent extends BaseComponent {
			@Prop() message = ['1', '2', '3'];
		}

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(SimpleComponent).mount('app');

		expect(getTextContentById('1')).toEqual('1,2,3');
  })

	test('Prop test 8', () => {
		@Component({
			tag: `prop-component-8`,
			useShadow: false,
			template: `
				<div id="1">{{message}}</div>
			`,
		})
		class SimpleComponent extends BaseComponent {
			@Prop() message = new Map<string, string>();

			constructor() {
				super();
				this.message.set('test', 'message');
			}
		}

    document.body.innerHTML = `<app id="app"></app>`;
    WF.createApp(SimpleComponent).mount('app');

		expect(getTextContentById('1')).toEqual('[object Map]');
  })

})