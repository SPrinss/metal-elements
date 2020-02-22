import { MetalBaseElement, html } from '../metal-base.js'

/**
 * Metal Elements Button
 * @element metal-button

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

  * @cssprop --metal-button-border-width

  * @cssprop --metal-button-border-color
  * @cssprop --metal-button-border-color--focus
  * @cssprop --metal-button-border-color--hover
  * @cssprop --metal-button-border-color--active
  * @cssprop --metal-button-border-color--disabled

  * @cssprop --metal-button-box-shadow
  * @cssprop --metal-button-box-shadow--focus
  * @cssprop --metal-button-box-shadow--hover
  * @cssprop --metal-button-box-shadow--active
  * @cssprop --metal-button-box-shadow--disabled
  
  * @cssprop --metal-button-border-radius
  * @cssprop --metal-button-border-radius--no-label
  * @cssprop --metal-button-transition-time
  * @cssprop --metal-button-text-align
  * @cssprop --metal-button-font-size
 * 
 */
export default class MetalButton extends MetalBaseElement {

  static get properties() {
    return { 

      disabled: {
        set: Boolean,
        attribute: 'disabled',
        defaultValue: false,
        changedHandler: '_disabledChanged'
      },

      icon: {
        set: String,
        attribute: 'icon',
        changedHandler: '_iconChanged'
      },

      value: {
        set: String
      }

    };
  }
  
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('no-label', '');
    this.shadowRoot.addEventListener('slotchange', this._handleSlotChange.bind(this));
  }

  get template() {
    return html`
      <link rel="stylesheet" href="/src/metal-button/metal-button.css">
      <button ?disabled="${this.disabled}" .value="${this.value}" tabindex="0">
        <span><slot></slot></span>
        ${this.icon ? html`<metal-icon icon="${this.icon}"></metal-icon>` : html`` }
      </button>
    `;
  }

  _handleSlotChange(e) {
    const noLabel = e.target.assignedNodes().length === 0;
    if(noLabel) return this.setAttribute('no-label', '');
    this.removeAttribute('no-label');
  }

  _iconChanged() {
    if(this.icon) import('../metal-icon/metal-icon.js');
  }

  _disabledChanged() {
    if(this.disabled) {
      this.removeAttribute('tabindex');
      this.setAttribute('aria-disabled', 'true');
    } else {
      if(!this.hasAttribute('role')) this.setAttribute('role', 'button');
      this.removeAttribute('aria-disabled');
    }

  }

}

window.customElements.define('metal-button', MetalButton)