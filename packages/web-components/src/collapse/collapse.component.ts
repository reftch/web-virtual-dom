import ButtonComponent from "../button/button.component";
import { BaseComponent, Component, Prop } from "web-core/src/core";
import template from './collapse.component.html';

@Component({
  tag: 'wf-collapse',
  useShadow: false,
  template: template,
  components: [ButtonComponent]
})
export default class CollapseComponent extends BaseComponent {
  @Prop() title = 'Title';
  @Prop() isHidden = false;

}