import { MetalElement, html } from '../metal-element.js';

/**
 * Metal Elements Text Input
 * @element metal-text-input
 * 
 * @fires value-changed - Current input value, empty if input's value is invalid.
 *
 * @cssprop --metal-text-input-border-color
 * @cssprop --metal-text-input-border-color--focus
 * @cssprop --metal-text-input-border-color--not-empty
 * @cssprop --metal-text-input-border-color--invalid
 * @cssprop --metal-text-input-label-color
 */
class MetalTextInputElement extends MetalElement {

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
        get: function () { return this['invalid'] ? '' : this['#value']},
        attribute: 'value',
        defaultValue: '',
        changedEventName: 'value-changed'
      },
      /**
       * Label & placeholder String
       * @type {string} 
       * @attr name
       * @default ''
       */
      name: {
        set: String,
        attribute: 'name',
        defaultValue: ''
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
        set: Boolean,
        attribute: 'invalid',
        defaultValue: false
      }
    }
  }

  get template() {
    return html`
      <link rel="stylesheet" href="/src/metal-text-input/metal-text-input.css">
      <input
        .type="${this.type}"
        .value="${this.value}"
        ?disabled="${this.disabled}"
        @input="${this._handleInput}"
      >
      <label>${this.name}</label>
    `;
  }

  /**
  * Getter that returns the validity of the input element
  * @type {object}
  * @return {boolean} invalid | valid
  */
  get getInvalid() {
    const $input = this.shadowRoot.querySelector('input');
    return $input && !$input.checkValidity();
  }

  _handleInput(e) {
    this.value = e.target.value;
    this.invalid = this.getInvalid;
  }

}

window.customElements.define('metal-text-input', MetalTextInputElement);