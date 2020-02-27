import { html, MetalElementMixin } from '../metal-element-mixin.js';

const MetalButtonMixin = (SuperClass) => class extends MetalElementMixin(SuperClass) {
  
  static get properties() {
    return { 
      /**
       * Whether the user can interact with the button
       * @type {boolean} 
       * @attr disabled
       * @default false
       */
      disabled: {
        set: Boolean,
        attribute: 'disabled',
        defaultValue: false,
      },

    };
  }

  get metalTemplate() {
    return html`
      <button ?disabled="${this.disabled}"><slot></slot></button>
    `;
  }

};

export { MetalButtonMixin, html };