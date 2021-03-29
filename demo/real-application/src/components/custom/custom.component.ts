import { BaseComponent, Component, Prop, VComponent } from '@core';
import template from './custom.component.html';

@Component({
  tag: `custom-component`,
  useShadow: false,
  template: template
})
export default class CustomComponent extends BaseComponent implements VComponent {

  @Prop() id = '1';
  @Prop() message = this.store.getters().getMessage();
  
  @Prop() count = this.store.getters().getCount();
  @Prop() count1 = 0;

  @Prop() rawHTML = '<strong>HTML</strong>';
  @Prop() buttonStyle = 'border-radius: 8px;';
  @Prop() customClass = "custom-element-class";
  @Prop() textStyle = 'color: red;';
  @Prop() isEnabled = this.store.getters().getState().isEnabled;
  @Prop() buttonTitle = 'Hide';
  @Prop() var1 = 1;
  @Prop() var2 = 2;

  @Prop() parentVariable = 0;

  t0: number = 0;       
  timerId: NodeJS.Timeout | undefined = undefined;

  onMounted() {
    this.count = this.parentVariable;

    this.timerId = setInterval(() => {
      this.emit('setRow', ++this.count1);
    }, 1000)
  }

  onUnmounted() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  incCounter = () => {
    this.count++;
    this.var1++;
    this.textStyle = 'color: blue;';
    this.store.actions().setCount(this.count);
    // this.emit('setRow', this.count);
    this.emit('setRow3', this.count);
    this.textStyle = 'color: red;';
  }

  decCounter = () => {
    this.var1--;
    this.textStyle = 'color: green;';
    this.store.actions().setCount(--this.count);
    // this.emit('setRow', this.count);
    this.emit('setRow3', this.count);
    this.textStyle = 'color: green;';
  }

  toggle() {
    this.isEnabled = !this.isEnabled;
    this.buttonTitle = this.buttonTitle === 'Hide' ? 'Show' : 'Hide'; 
    this.store.actions().setEnabled(this.isEnabled);
  }

  onBeforeUpdate() {
    this.t0 = performance.now();
  }

  onUpdated() {
    const t1 = performance.now();
    console.log(`Rendering took ${t1 - this.t0} ms.`);
  }

}

