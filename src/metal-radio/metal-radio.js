import { MetalElement, html } from '../metal-element.js';
import '../metal-button/metal-button.js';

/**
 * Metal Elements Radio
 * @element metal-radio
 * 
 * @cssprop --metal-radio-background
 * @cssprop --metal-radio-background--active
 * @cssprop --metal-radio-background--focus
 * @cssprop --metal-radio-background--hover
 * @cssprop --metal-radio-background--disabled
 * @cssprop --metal-radio-color
 * @cssprop --metal-radio-color--active
 * @cssprop --metal-radio-color--focus
 * @cssprop --metal-radio-color--hover
 * @cssprop --metal-radio-color--disabled
 * @cssprop --metal-radio-border-radius
 * @cssprop --metal-radio-border-color
 * @cssprop --metal-radio-border-width
 * @cssprop --metal-radio-label-padding
 * 
 */
export class MetalRadioElement extends MetalElement {

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
       * Whether the radio is checked or not
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
       * The label that's displayed next to the radio
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
      role: 'radio'
    };
  }

  get template() {
    return html`
      <link rel="stylesheet" href="../src/metal-radio/metal-radio.css">
      <metal-button
        .icon="${this.checked ? 'fiber_manual_record' : ''}"
        .disabled="${this.disabled}"
        @click="${this.enable}"
      ></metal-button>
    `;
  }

  enable() {
    if(this.disabled) return;
    this.checked = true;
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

window.customElements.define('metal-radio', MetalRadioElement);
