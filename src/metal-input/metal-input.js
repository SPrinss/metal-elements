import { MetalElement, html } from '../metal-element.js';

/**
 * Metal Elements Text Input
 * @element metal-input
 * 
 * @fires value-changed - Current input value, empty if input's value is invalid.
 *
 * @cssprop --metal-input-height
 * @cssprop --metal-input-font-family
 * @cssprop --metal-input-font-size
 * @cssprop --metal-input-font-weight
 * @cssprop --metal-input-background
 * @cssprop --metal-input-color
 * @cssprop --metal-input-box-shadow
 * @cssprop --metal-input-border-width
 * @cssprop --metal-input-border-style
 * @cssprop --metal-input-border-color
 * @cssprop --metal-input-border-radius
 * @cssprop --metal-input-padding
 * @cssprop --metal-input-transition-duration
 * @cssprop --metal-input-transition-timing-function
 * @cssprop --metal-input-border-width--focus
 * @cssprop --metal-input-border-style--focus
 * @cssprop --metal-input-border-color--focus
 * @cssprop --metal-input-border-radius--focus
 * @cssprop --metal-input-box-shadow--focus
 * @cssprop --metal-input-background--disabled
 * @cssprop --metal-input-color--disabled
 * @cssprop --metal-input-border-color--disabled
 * @cssprop --metal-input-box-shadow-disabled
 * @cssprop --metal-input-placeholder-color
 * @cssprop --metal-input-placeholder-font-family
 * @cssprop --metal-input-placeholder-font-size
 * @cssprop --metal-input-placeholder-font-weight
 * @cssprop --metal-input-label-transition-duration
 * @cssprop --metal-input-label-transition-timing-function
 * @cssprop --metal-input-placeholder-color--enabled
 * @cssprop --metal-input-border-color--invalid
 * @cssprop --metal-input-placeholder-color--invalid
 */
export class MetalInputElement extends MetalElement {

  static get properties() {
    return {
      /**
       * Input type
       * @type {text|password|email} 
       * @attr text
       * @default text
       */
      type: {
        set: String,
        attribute: 'type',
        defaultValue: 'text'
      },
      /**
       * Input value, empty if input is invalid
       * @type {string} 
       * @attr value
       * @default ''
       */
      value: {
        set: String,
        attribute: 'value',
        defaultValue: '',
        changedEventName: 'value-changed',
        changedHandler: '_valueChanged'
      },
      /**
       * Label & placeholder String
       * @type {string} 
       * @attr placeholder
       * @default ''
       */
      placeholder: {
        set: String,
        attribute: 'placeholder',
        defaultValue: ''
      },
      /**
       * Whether input is required
       * @type {boolean} 
       * @attr required
       * @default false
       */
      required: {
        set: Boolean,
        attribute: 'required',
        defaultValue: false
      },
      /**
       * Whether input field can be used
       * @type {boolean} 
       * @attr disabled
       * @default false
       */
      disabled: {
        set: Boolean,
        attribute: 'disabled',
        defaultValue: false
      },
      /**
       * Whether current input value is valid
       * @type {boolean} 
       * @attr invalid
       * @default false
       */      
      invalid: {
        attribute: 'invalid',
        changedEventName: 'invalid-changed',
        defaultValue: false
      }
    };
  }

  get template() {
    return html`
      <link rel="stylesheet" href="../src/metal-input/metal-input.css">
      <input
        .type="${this.type}"
        value="${this.value}"
        ?required="${this.required}"
        ?disabled="${this.disabled}"
        @input="${this._handleInput}"
        @change="${this._handleInput}"
      >
      <label id="placeholder">${this.placeholder}</label>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._valueChanged();
  }

  _handleInput(e) {
    this.value = e.target.value;
  }

  _valueChanged() {
    const $input = this.shadowRoot && this.shadowRoot.querySelector('input');
    if(!$input) return;
    this.invalid = !$input.checkValidity();
  }

}

window.customElements.define('metal-input', MetalInputElement);