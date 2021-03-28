import { Component, Prop, BaseComponent } from "@core";
import { ButtonComponent, CollapseComponent } from '@components';
import template from './processes.component.html';

@Component({
  tag: `processes-component`,
  useShadow: false,
  template: template,
  components: [ ButtonComponent, CollapseComponent ]   
})
export default class ProcessesComponent extends BaseComponent {

  @Prop() title = 'Title';
  @Prop() count = this.store.getters().getCount();
  @Prop() isEnabled = true;

  t0: number = 0;      

  incCounter() {
    this.store.actions().setCount(++this.count);
  }

  decCounter() {
    this.store.actions().setCount(--this.count);
  }
  
  toggle() {
    this.isEnabled = !this.isEnabled;
  }

  onBeforeUpdate() {
    this.t0 = performance.now();
  }
         
  onUpdated() {
    const t1 = performance.now();
    console.log(`Rendering took ${t1 - this.t0} ms.`);
  }


}
