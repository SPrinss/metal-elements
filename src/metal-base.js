import { Property } from 'html-element-mixins';
import { html } from 'lit-html';

class MetalBaseElement extends Property(HTMLElement) {
  static get properties() {
    return {}
  }

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
  }
  
  get template () {
    return html``;
  }

  connectedCallback() {
    this.render();
  }
  
  propertiesChangedCallback(propNames, oldValues, newValues) {
    super.propertiesChangedCallback(propNames, oldValues, newValues);
    this.render();
  }

  render() {
    if(window.ShadyCSS) return this.__shadyRender();
    this.__shadowRender();
  }

  __shadyRender() {
    import('lit-html/lib/shady-render.js').then(module => module.render(this.template, this.shadowRoot, {eventContext: this, scopeName: this.localName}));
  }

  __shadowRender() {
    import('lit-html/lib/render.js').then(module => module.render(this.template, this.shadowRoot, {eventContext: this}));
  }

}

export { MetalBaseElement, html };