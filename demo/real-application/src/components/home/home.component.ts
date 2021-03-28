import { Component, BaseComponent, Prop } from "@core";
import { ButtonComponent } from "@components";
import CustomComponent from '../custom/custom.component';

@Component({
  tag: `home-component`,
  useShadow: false,
  template: `
    <div id="home-component">
      <div>Emitted data from Child1: {{ var111 }}</div>
      <custom-component :parent-variable="var111" @set-row="emitSetRow"></custom-component>
    </div>`,
  components: [ CustomComponent, ButtonComponent ]
})
export default class HomeComponent extends BaseComponent {
  @Prop() var111 = this.store.getters().getCount();
  @Prop() var112 = 100;

  emitSetRow(data: any) {
    this.var111 = data;
  }

  emitSetRow3(data: any) {
    this.var112 = data;
  }

  toggle() {
    console.log('pushed')
  }

}

     
