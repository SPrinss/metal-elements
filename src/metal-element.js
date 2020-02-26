import { Property, EnsuredAttributes } from 'html-element-mixins';
import { html } from 'lit-html';

class MetalElement extends EnsuredAttributes(Property(HTMLElement)) {
  static get properties() {
    return {};
  }

  constructor() {
    super();
    this.constructor.__setDefaultPropertyValues.call(this);
    this.addEventListener('keydown', this.__handleKeydown.bind(this));
    this.attachShadow({mode: 'open'});
  }
  
  get template () {
    return html``;
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
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

  static __setDefaultPropertyValues() {
    for(var propName in this.constructor.properties) {
      const defaultValue = this.constructor.properties[propName].defaultValue;
      this[propName] = defaultValue;
    }
  }

  __shadyRender() {
    import('lit-html/lib/shady-render.js').then(module => module.render(this.template, this.shadowRoot, {eventContext: this, scopeName: this.localName}));
  }

  __shadowRender() {
    import('lit-html/lib/render.js').then(module => module.render(this.template, this.shadowRoot, {eventContext: this}));
  }

  __handleKeydown(e) {
    for(var methodName in this.constructor.keyBindings) {
      const requirements = this.constructor.keyBindings[methodName];
      for(var requirement in requirements) {
        if(e[requirement] !== requirements[requirement]) continue;
      }
      this[methodName].call(this, e);
    }
  }

  static get keyBindings() {
    return {}
  }

}

export { MetalElement, html };