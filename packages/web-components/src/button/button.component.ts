import { BaseComponent, Component, Prop } from "@core";

@Component({
  tag: 'wf-button',
  template: `
    <div>
      <div class="button" :class="classBtn">
        <div>{{ title }}</div>  
      </div>
    </div>  
  `
})
export default class ButtonComponent extends BaseComponent {
  @Prop() title = '';
  @Prop() primary = false;
  @Prop() secondary = false;
  @Prop() disabled = false;
  @Prop() icon = '';
  @Prop() classBtn = '';

  onMounted() {
    this.classBtn = this.getClassBtn();
  }

  getClassBtn() {
    let str = this.primary ? 'button-primary'
      : this.secondary ? ' button-secondary' : '';

    if (this.icon) {
      str += ` icon ${this.icon}`;
    }

    if (this.disabled) {
      str += this.primary ? ' button-primary-disabled' : ' button-disabled';
    }

    return str;
  }

}