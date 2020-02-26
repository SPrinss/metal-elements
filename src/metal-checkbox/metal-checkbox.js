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
       * Whether the user can interact with the button
       * @type {boolean} 
       * @attr disabled
       * @default false
       */
      disabled: {
        set: Boolean,
        attribute: 'disabled',
        defaultValue: false,
        changedHandler: '_disabledChanged'
      },
      /**
       * Whether the checkbox is checked or not
       * @type {boolean} 
       * @attr checked
       * @default false
       */        
      checked: {
        set: Boolean,
        defaultValue: false,
        attribute: 'checked',
        changedEventName: 'checked-changed'
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

  static get ensuredAttributes() {
    return {
      tabIndex: 0,
      role: 'checkbox'
    };
  }

  get template() {
    return html`
      <link rel="stylesheet" href="../src/metal-checkbox/metal-checkbox.css">
      <metal-button .icon="${this.checked ? 'done' : ''}" @click="${this.toggle}" .disabled="${this.disabled}"></metal-button>
    `;
  }

  toggle() {
    if(this.disabled) return;
    this.checked = !this.checked;
  }

  _disabledChanged(disabled) {
    if(disabled) {
      this._tabIndex = this.getAttribute('tabindex') || this.constructor.ensuredAttributes.tabIndex || 0;
      this.setAttribute('tabindex', -1);
      this.setAttribute('aria-disabled', 'true');
    } else {
      this.removeAttribute('aria-disabled');
      if(this._tabIndex) this.setAttribute('tabindex', this._tabIndex || this.constructor.ensuredAttributes.tabIndex);
    }
  }

}

window.customElements.define('metal-checkbox', MetalCheckboxElement);
