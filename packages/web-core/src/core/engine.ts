import { Emit } from "./emit";
import { Input } from "./input";
import { BaseComponent } from "./base-component";
import { NodeValue } from "./model";
import { WF } from "./wf";

export interface VEngine {
  render(): void;
}

export class VirtualEngine implements VEngine {

  private static readonly comment = document.createComment(':if');

  /**
   * VEngine constructor 
   * 
   * @param component component instance
   * @param props component properties
   * @param template component template
   * @param parentNode root node of the component
   */
  constructor(private component: BaseComponent, private props: string[], private template: string, private parentNode: Element | ShadowRoot) {
    const templateNode = document.createElement('template');
    templateNode.innerHTML = this.bindTemplate(template, props);
    const virtualNode = templateNode.content.cloneNode(true);

    this.parseVirtualModel(virtualNode, props);

    parentNode.appendChild(virtualNode);
  }

  /**
   * Reconciling the real DOM recursively
   */
  render(): void {
    const templateNode = document.createElement('template');
    templateNode.innerHTML = this.bindTemplate(this.template, this.props);
    const virtualNode = templateNode.content.cloneNode(true);

    this.updateVirtualModel(virtualNode, this.props);

    this.applyDiff(this.parentNode.children[0], (virtualNode as Element).children[0]);
  }

  /**
   * Apply differences after changing input parameters (reconciliation process)
   * 
   * @param real node
   * @param virtual node
   */
  private applyDiff(real: Element, virtual: Element) {

    let lengthOfDOM = Math.max(real.childNodes.length, virtual.childNodes.length);

    let previous = real;
    for (let i = 0; i < lengthOfDOM; i++) {
      const vn = virtual.childNodes[i] as Element;
      if (!vn) {
        continue;
      }

      let rn = real.childNodes[i] as Element;
      if (!rn) {
        const newNode = vn.cloneNode(true);
        this.insertAfter(newNode, previous);
        rn = newNode as Element;
      } else if (rn.nodeType === Node.COMMENT_NODE && vn.nodeType !== Node.COMMENT_NODE) {
        if (rn.isEqualNode(VirtualEngine.comment)) {
          const newNode = vn.cloneNode(true);
          real.replaceChild(newNode, rn);
          rn = newNode as Element;
        }
      } else if (vn.nodeType !== Node.COMMENT_NODE && !vn.isEqualNode(rn)) {
        if (vn.nodeType === Node.ELEMENT_NODE && rn.nodeType !== Node.ELEMENT_NODE) {
          // this node should be added
          const newNode = vn.cloneNode(true);
          this.insertAfter(newNode, previous);
          rn = newNode as Element;
        } else if (vn.nodeType !== Node.ELEMENT_NODE && rn.nodeType === Node.ELEMENT_NODE) {
          // this node should be removed
          real.removeChild(rn);
          i--;
        }
      }

      if (vn.nodeType === Node.ELEMENT_NODE) {
        this.updateAttributes(rn, vn);
        this.applyDiff(rn, vn);
      } else if (vn.nodeType === Node.TEXT_NODE) {
        let nodeValue = vn.nodeValue;
        if (nodeValue) {
          const textContent = nodeValue.trim();
          if (textContent) {
            if (rn && rn.textContent !== textContent) {
              rn.textContent = textContent;
            }
          }
        }
      } else if (vn.nodeType === Node.COMMENT_NODE) {
        if (rn && vn.isEqualNode(VirtualEngine.comment) && !rn.isEqualNode(vn)) {
          const newNode = vn.cloneNode(true);
          real.replaceChild(newNode, rn);
        }
      }

      previous = rn;
    }
  }

  /**
   * Reconcile an attributes
   * 
   * @param rn real node
   * @param vn virtual node
   */
  private updateAttributes(rn: Element, vn: Element) {
    if (rn.attributes) {
      Array.from(rn.attributes).forEach((a: any) => {
        const value = vn.getAttribute(a.name);
        if (value != a.value) {
          rn.setAttribute(a.name, value ? value : '');
        }
      })
    }
  }

  /**
   * Parameters interpolation 
   * 
   * @param str html template
   * @param attr mustache attribute 
   * @param replacement real value
   * @returns modified template
   */
  private replaceAllParameter(str: string, attr: string, replacement: string) {
    const regexp = new RegExp(`\{\{(?:\\s+)?(${attr})(?:\\s+)?\}\}`, 'g');
    return str.replace(regexp, () => replacement);
  }

  /**
   * Evaluate the javascript expressions as a custom function.
   * 
   * @param expression input javascript expression
   * @param props component properties
   * @returns evaluation result of the custom function
   */
  private evaluateTheCode(expression: string, props: string[]) {
    try {      
        const parameters: string[] = [];
        const input: any[] = [];
        const regexp = /\s*([\w+\!\=\-\+\*\/\:\;\?\']+)\s*/g;
        const matches = expression.match(regexp);
        if (matches) {
          matches.forEach((m: string) => {
            const p = m.trim();
            if (props.indexOf(p) !== -1) {
              parameters.push(`${p}`);
              input.push(this.component[p])
            }
          });
          const f = new Function(parameters.toString(), `return ${expression}`);
          const result = String(f(...input));
          return result;
        }
    } catch (e) {
      // console.log('Warning! Cannot evaluate the code.')
    }
    return undefined;
  }

  /**
   * Find a Javascript expression in the template
   * 
   * @param template input template
   * @param props component properties
   * @returns adjusted template
   */
  private findJavascriptExpressions(template: string, props: string[]) {  
    const regexp = /{{\s*([\w+\!\=\-\+\*\/\(\)\:\;\?\'\s*]+)\s*}}/g;
    template = template.replace(regexp, (match, subMatch) => {
      let result = this.evaluateTheCode(subMatch, props);
      return result ? result : match;
    });
    return template;
  }

  /**
   * Binding HTML template with a component's properties and javascript expression.
   * This is a first step of the reconciling process.
   * 
   * @param template component template
   * @param props component properties
   * @returns bind template
   */
  private bindTemplate(template: string, props: string[]) {
    template = template.replace('<!--:if-->/g', '');
    props.forEach(a => template = this.replaceAllParameter(template, a, this.component[a]));
    template = this.findJavascriptExpressions(template, props);
    return template;
  }

  /*
   * Parse virtual model recursively
   * It is responsible for the updating of the VDOM. Called every time, before reconciliation process.
   * 
   * @param node node
   */
  private parseVirtualModel(node, props: string[]) {

    for (let i = 0; i < node.childNodes.length; i++) {
      const n = node.childNodes[i];
      let nodeValue = n.nodeValue;

      if (nodeValue) {
        nodeValue = nodeValue.trim();
      }

      let ifResult = true;
      if (n.nodeType === Node.ELEMENT_NODE) {
        if (n && n.attributes) {
          if (n.hasAttribute(':if')) {
            ifResult = this.isIfAllowRender(node, n);
          } else if (n.hasAttribute(':else')) {
            this.isElseAllowRender(node, n, ifResult);
          } else if (n.hasAttribute(':for')) {
            this.isForRender(n);
          }

          this.bindInputParameters(n);
          this.parseAttributes(n, props);
          this.parseHandlers(n, true);
        }
      } else if (n.nodeType === Node.TEXT_NODE && nodeValue) {
        n.nodeValue = nodeValue;
      }

      if (n.nodeType === Node.ELEMENT_NODE) {
        this.parseVirtualModel(n, props);
      }
    }
  }

  /**
   * Update a virtual DOM
   * 
   * @param node  current virtual node
   * @param props component's properties
   */
  private updateVirtualModel(node, props: string[]) {

    let ifResult = true;
    for (let i = 0; i < node.childNodes.length; i++) {
      const n = node.childNodes[i];

      if (n.nodeType === Node.ELEMENT_NODE) {
        if (n && n.attributes) {
          if (n.hasAttribute(':if')) {
            ifResult = this.isIfAllowRender(node, n);
          } else if (n.hasAttribute(':else')) {
            this.isElseAllowRender(node, n, ifResult);
          } else if (n.hasAttribute(':for')) {
            this.isForRender(n);
          }
          this.parseAttributes(n, props);
          this.parseHandlers(n, false);
        }
      }

      if (n.nodeType === Node.ELEMENT_NODE && n.children.length > 0) {
        this.updateVirtualModel(n, props);
      }
    }
  }

  /**
   * Merge custom attributes (id, class, style and etc)
   * 
   * @param el current element node
   * @param attribute attribute name
   */
  private parseAttributes(el: Element, props: string[]) {
    Array.from(el.attributes).forEach((a: any) => {
      if (a.name[0] === ':') {
        const attribute = a.name.substring(1);
        if (attribute === 'once') {
          //TODO: should implement
        } else {
          let value = '';
          if (el.hasAttribute(attribute)) {
            const staticAttr = el.getAttribute(attribute);
            if (staticAttr) {
              value = staticAttr;
            }
          }
          const dynamicAttr = el.getAttribute(`:${attribute}`);
          if (dynamicAttr && props.includes(dynamicAttr)) {
            value += ` ${this.component[dynamicAttr]}`;
            el.setAttribute(attribute, value.trim());
          } else {
            value += ` ${dynamicAttr}`;
            el.setAttribute(attribute, value.trim());
          }
        } 
        el.removeAttribute(`:${attribute}`);
      }
    })
  }

  /**
   * Binding an input parameters
   * 
   * @param el current element node
   */
  private bindInputParameters(el: Element) {
    Array.from(el.attributes).forEach((a: any) => {
      if (a.name[0] === ':') {
        const attribute = a.name.substring(1);
        if (attribute !== 'class' && attribute !== 'style' && attribute !== 'id') {
          const output = el.getAttribute(`:${attribute}`);
          if (output) { 
            const isStatic = !(WF.camelCase(output) in this.component); 
            Input.bindInput(el, this.component, attribute, output, isStatic);
          }
          el.removeAttribute(`:${attribute}`);
        }
      }
    })
  }

  /**
   * Parse DOM event handlers and handlers for the emitting data 
   * 
   * @param el current element node
   * @param addHandler flag to bind an attribute with a DOM event
   */
  private parseHandlers(el: Element, addHandler: boolean) {
    Array.from(el.attributes).forEach((a: any) => {
      if (a.name[0] === '@' && addHandler) {
        const callback = el.getAttribute(`${a.name}`);
        const action = a.name.substring(1);
        // add custom vent emitting data
        const callbackFunction = this.component[`${callback}`];
        if (typeof callbackFunction === 'function') {
          // if (el.tagName.includes('-')) {
            // custom element
            Emit.bind(el, this.component, action, callbackFunction);
          // } else {
            // add DOM event listener
            el.addEventListener(action, () => this.component[`${callback}`]());
          // } 
        }
      }
      if (a.name[0] === '@') {
        el.removeAttribute(`${a.name}`);
      }
    })
  }

  /**
   * :if directive
   * 
   * @param node current parent node
   * @param el element node
   */
  private isIfAllowRender(node: Element, el: Element) {
    if (el && el.attributes) {
      const attr = el.getAttribute(':if');
      el.removeAttribute(':if');
      if (attr) {
        const value = attr[0] === '!' ? !this.component[attr.substring(1)] : this.component[attr];
        if (!value) {
          const comment = VirtualEngine.comment.cloneNode(true);
          node.replaceChild(comment, el);
        }
        return value;
      }
    }
  }

  /**
   * Proceed the :else directive
   * 
   * @param node current parent node
   * @param el current child node
   * @param ifResult previous :if state
   */
  private isElseAllowRender(node: Element, el: Element, ifResult: boolean) {
    if (el && el.attributes) {
      el.removeAttribute(':else');
      if (ifResult) {
        const comment = VirtualEngine.comment.cloneNode(true);
        node.replaceChild(comment, el);
      }
    }
  }

  /**
   * Proceed the :for directive
   * 
   * @param el current node
   */
  private isForRender(el: Element) {
    const expression = el.getAttribute(':for');
    el.removeAttribute(':for');
    const clonedNode = el.cloneNode(true);
    if (expression) {
      const attr = expression.split(' ');
      let currentNode: Node = el;
      const items = this.component[attr[2]];
      if (items) {
        if (items.length === 0 || items === 'undefined') {
          el.remove();
          return;
        }

        const propertyObject = Object.getOwnPropertyNames(items);
        const arraySize = items.length ? items.length : propertyObject.length;
        for (let i = 0; i < arraySize; i++) {
          let value = this.component[attr[2]][i];
          if (!value) {
            value = this.component[attr[2]][propertyObject[i]];
          }
          if (i == 0) {
            this.changeProperty(el, attr[0], value);
            continue;
          }

          const newNode = clonedNode.cloneNode(true);
          this.changeProperty(newNode, attr[0], value)
          this.insertAfter(newNode, currentNode);
          currentNode = newNode;
        }
      } else {
        el.remove();
      }
    }
  }

  /**
   * Changing node property recursively
   * 
   * @param el current node
   * @param attr attribute name
   * @param value component value
   */
  private changeProperty(el: Node, attr: string, value: NodeValue) {
    for (let i = 0; i < el.childNodes.length; i++) {
      const n = el.childNodes[i] as Element;
      let nodeValue = n.nodeValue;
      if (nodeValue) {
        nodeValue = nodeValue.trim();
      }

      if (n.nodeType === Node.ELEMENT_NODE && n.children.length == 0) {
        this.updateTextContent(n, attr, value);
      } else if (n.nodeType === Node.TEXT_NODE && nodeValue) {
        this.updateTextContent(n, attr, value);
      }

      if (n.nodeType === Node.ELEMENT_NODE && n.children.length > 0) {
        this.changeProperty(n, attr, value);
      }
    }
  }

  /**
   * Interpolation updating
   * 
   * @param el current node
   * @param attr attribute name
   * @param value component value
   */
  private updateTextContent(el: Element, attr: string, value: NodeValue) {
    let textContent = el.textContent;
    if (textContent) {
      const parameters = textContent
        .replace(/{{/g, ',')
        .replace(/}}/g, ',')
        .split(',');
      parameters.forEach(element => {
        const p = element.trim();
        if (p) {
          let v = value;
          if (p.includes('.')) {
            p.split('.').forEach(element => {
              if (v[element]) {
                v = v[element];
              }
            });
            v = typeof v === 'string' ? v : '';
          } else {
            if (p === attr) {
              v = typeof value === 'string' ? value : JSON.stringify(value);
            } else {
              v = ''
            }
          }
          if (textContent) {
            textContent = this.replaceAllParameter(textContent, p, v);
          }
        }
      });
      el.textContent = textContent;
    }
  }

  /**
   * Insert node after the existing one
   * 
   * @param newNode 
   * @param existingNode 
   */
  private insertAfter<T extends Node>(newNode: T, existingNode: T) {
    existingNode.parentNode!.insertBefore(newNode, existingNode.nextSibling);
  }

}