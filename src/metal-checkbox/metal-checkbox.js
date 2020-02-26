import { MetalElement, html } from '../metal-element.js';
import '../metal-button/metal-button.js';

/**
 * Metal Elements Checkbox
 * @element metal-checkbox
 * 
 * @cssprop --metal-checkbox-background
 * @cssprop --metal-checkbox-background--active
 * @cssprop --metal-checkbox-background--focus
 * @cssprop --metal-checkbox-background--hover
 * @cssprop --metal-checkbox-background--disabled
 * @cssprop --metal-checkbox-color
 * @cssprop --metal-checkbox-color--active
 * @cssprop --metal-checkbox-color--focus
 * @cssprop --metal-checkbox-color--hover
 * @cssprop --metal-checkbox-color--disabled
 * @cssprop --metal-checkbox-border-radius
 * @cssprop --metal-checkbox-border-color
 * @cssprop --metal-checkbox-border-width
 * @cssprop --metal-checkbox-label-padding
 * 
 */
export class MetalCheckboxElement extends MetalElement {

  static get properties() {
    return {
      /**
       * Whether the checkbox is checked or not
       * @type {boolean} 
       * @attr checked
       * @default false
       */        
      checked: {
        set: Boolean,
        defaultValue: false,
        attribute: 'checked'
      },
      /**
       * The label that's displayed next to the checkbox
       * @type {string} 
       * @attr label
       * @default ''
       */
      label: {
        set: String,
        attribute: 'label'
      }
    };
  }

  constructor() {
    super();
    this.addEventListener('click', this._handleClick.bind(this));
  }

  static get ensuredAttributes() {
    return {
      tabIndex: 0
    };
  }

  get template() {
    return html`
      <link rel="stylesheet" href="../src/metal-checkbox/metal-checkbox.css">
      <metal-button .icon="${this.checked ? 'done' : ''}"></metal-button>
    `;
  }

  _handleClick() {
    this.checked = !this.checked;
  }

}

window.customElements.define('metal-checkbox', MetalCheckboxElement);
