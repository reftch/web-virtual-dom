import { Component, BaseComponent } from "@core";

@Component({
  tag: `not-found-component`,
  useShadow: true,
  template: `
    <div id="not-found-component">
      <h2>Error! Page is not found</h2>
    </div>`,
})
export default class NotFoundComponent extends BaseComponent {
}
