import { Component, BaseComponent, Prop } from "@core";
import { ButtonComponent } from "@components";
import CustomComponent from '../custom/custom.component';

@Component({
  tag: `home-component`,
  useShadow: false,
  template: `
    <div id="home-component">
      <h3>Parent component</h3>
      <div>Emitted timer count from the child component: {{ var112 }}</div>
      <div>Emitted count variable from the child component: {{ var111 }}</div>
      <custom-component :parent-variable="var111" @set-row="emitSetRow" @set-row3="emitSetRow3"></custom-component>
    </div>`,
  components: [ CustomComponent, ButtonComponent ]
})
export default class HomeComponent extends BaseComponent {
  @Prop() var111 = this.store.getters().getCount();
  @Prop() var112 = 0;

  emitSetRow(data: any) {
    this.var112 = data;
  }

  emitSetRow3(data: any) {
    this.var111 = data;
  }

}

     
