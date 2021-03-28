import { BaseComponent, Component, Prop, VComponent } from 'web-core/src/core';
import template from './tables.component.html';
import { ButtonComponent } from "@components";

@Component({
  tag: `tables-component`,
  useShadow: false,
  template: template,
  components: [ ButtonComponent ]
})
export default class TablesComponent extends BaseComponent implements VComponent {

  @Prop() items = [ 
    {id: '0', title: 'Item1', child: { id: 'child1'}}, 
    {id: '1', title: 'Item2', child: { id: 'child2'}}, 
    {id: '2', title: 'Item3', child: { id: 'child3'}}, 
    {id: '3', title: 'Item4', child: { id: 'child4'}}, 
  ];

  @Prop() count = 0;
  @Prop() count2 = 11;

  @Prop() item = {
      title: 'How to do lists in WF',
      author: 'Jane Doe',
      publishedAt: '2016-04-10'
  }

  private static readonly NUMBER_ITEMS = 1000;
  t0: number = 0;       
      
  incCounter = () => {
    for (let i = 0; i < TablesComponent.NUMBER_ITEMS; i++) {
      // this.items.push({ id: `${this.items.length}`, title: `Item${this.items.length + 1}`, child: { id: `child${this.items.length + 1}`} });
      this.items.splice(2, 0, { id: `1_${this.items.length}`, title: `Item${this.items.length + 1}`, child: { id: `child${this.items.length + 1}`} });
    }

    this.items = this.items;
  }

  decCounter = () => {
    // for (let i = 0; i < TablesComponent.NUMBER_ITEMS; i++) {
    //   this.items.pop();
    // }
    this.items.splice(2, TablesComponent.NUMBER_ITEMS);
    this.items = this.items;
  }

  onBeforeUpdate() {
    this.t0 = performance.now();
  }

  onUpdated() {
    const t1 = performance.now();
    console.log(`Rendering took ${t1 - this.t0} ms.`);
  }

}

