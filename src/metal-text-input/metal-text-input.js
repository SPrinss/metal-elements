import { MetalElement, html } from '../metal-element.js';

/**
 * Metal Elements Text Input
 * @element metal-text-input
 * @slot
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
      type: {
        set: String,
        attribute: 'type',
        defaultValue: 'text'
      },
      value: {
        set: function(val) { return this['__value'] = String(val || '')},
        get: function () { return this['invalid'] ? '' : this['__value']},
        attribute: 'value',
        changedEventName: 'value-changed'
      },
      name: {
        set: String,
        attribute: 'name',
        defaultValue: ''
      },
      disabled: {
        set: Boolean,
        attribute: 'disabled',
        defaultValue: false
      },
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
        type="${this.type}"
        value="${this.value}"
        ?disabled="${this.disabled}"
        @input="${this._handleInput}"
      >
      <label>${this.name}</label>
    `;
  }

  _handleInput(e) {
    this.value = e.target.value;
    this.invalid = this.getInvalid;
  }

  get getInvalid() {
    const $input = this.shadowRoot.querySelector('input');
    return $input && !$input.checkValidity();
  }

}

window.customElements.define('metal-text-input', MetalTextInputElement);