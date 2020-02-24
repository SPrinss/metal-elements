import { MetalElement, html } from '../metal-element.js';

/**
 * Metal Elements Button
 * @element metal-button
 * @slot
 *
 * @cssprop --metal-button-background
 * @cssprop --metal-button-background--focus
 * @cssprop --metal-button-background--hover
 * @cssprop --metal-button-background--active
 * @cssprop --metal-button-background--disabled
 
 * @cssprop --metal-button-color
 * @cssprop --metal-button-color--focus
 * @cssprop --metal-button-color--hover
 * @cssprop --metal-button-color--active
 * @cssprop --metal-button-color--disabled
 *
 * @cssprop --metal-button-border-width
 *
 * @cssprop --metal-button-border-color
 * @cssprop --metal-button-border-color--focus
 * @cssprop --metal-button-border-color--hover
 * @cssprop --metal-button-border-color--active
 * @cssprop --metal-button-border-color--disabled
 *
 * @cssprop --metal-button-box-shadow
 * @cssprop --metal-button-box-shadow--focus
 * @cssprop --metal-button-box-shadow--hover
 * @cssprop --metal-button-box-shadow--active
 * @cssprop --metal-button-box-shadow--disabled
 *
 * @cssprop --metal-button-border-radius
 * @cssprop --metal-button-border-radius--no-label
 * @cssprop --metal-button-transition-time
 * @cssprop --metal-button-text-align
 * @cssprop --metal-button-font-size
 * 
 */
export default class MetalButtonElement extends MetalElement {

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
       * What, if any, icon should be displayed on the button. Leave empty to hide icon.
       * @type {string} 
       * @attr icon
       */
      icon: {
        set: String,
        attribute: 'icon',
        changedHandler: '_iconChanged'
      },
      /**
       * What, if any, text should be displayed on the button. Leave empty to hide text.
       * @type {string} 
       * @default ''
       */
      value: {
        set: String,
      }

    };
  }
   
  connectedCallback() {
    super.connectedCallback();
    this.shadowRoot.addEventListener('slotchange', this._handleSlotChange.bind(this));
  }

  get template() {
    return html`
      <link rel="stylesheet" href="../src/metal-button/metal-button.css">
      <button ?data-icon="${!this._hasLabel}" ?disabled="${this.disabled}" .value="${this.value}" tabindex="0">
        <span ?hidden="${!this._hasLabel}"><slot></slot></span>
        ${this.icon ? html`<metal-icon icon="${this.icon}"></metal-icon>` : html`` }
      </button>
    `;
  }

  _handleSlotChange(e) {
    this._hasLabel = e.target.assignedNodes().length > 0;
  }

  _iconChanged(icon) {
    if(icon) import('../metal-icon/metal-icon.js');
  }

  _disabledChanged(disabled) {
    if(disabled) {
      this.removeAttribute('tabindex');
      this.setAttribute('aria-disabled', 'true');
    } else {
      if(!this.hasAttribute('role')) this.setAttribute('role', 'button');
      this.removeAttribute('aria-disabled');
    }
  }

}

window.customElements.define('metal-button', MetalButtonElement)