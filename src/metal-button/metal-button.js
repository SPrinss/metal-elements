import { MetalElement, html } from '../metal-element.js';

/**
 * Metal Elements Button
 * @element metal-button
 * @slot
 *
 * @cssprop --metal-button-height
 * @cssprop --metal-button-font-family
 * @cssprop --metal-button-font-size
 * @cssprop --metal-button-font-weight
 * @cssprop --metal-button-line-height
 * @cssprop --metal-button-background
 * @cssprop --metal-button-color
 * @cssprop --metal-button-border-color
 * @cssprop --metal-button-box-shadow
 * @cssprop --metal-button-border-width
 * @cssprop --metal-button-border-style
 * @cssprop --metal-button-border-radius
 * @cssprop --metal-button-text-align
 * @cssprop --metal-button-padding
 * @cssprop --metal-button-transition-duration
 * @cssprop --metal-button-transition-timing-function
 * @cssprop --metal-button-height
 * @cssprop --metal-button-border-radius
 * @cssprop --metal-button-box-shadow--focus
 * @cssprop --metal-button-background--hover
 * @cssprop --metal-button-color--hover
 * @cssprop --metal-button-border-color--hover
 * @cssprop --metal-button-background--active
 * @cssprop --metal-button-color--active
 * @cssprop --metal-button-border-color--active
 * @cssprop --metal-button-background--disabled
 * @cssprop --metal-button-color--disabled
 * @cssprop --metal-button-border-color--disabled
 * @cssprop --metal-button-box-shadow-disabled
 * 
 */
export class MetalButtonElement extends MetalElement {

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
        defaultValue: ''
      }

    };
  }

  static get ensuredAttributes() {
    return { tabindex: 0, role: 'button' }
  }

  static get keyBindings() {
    return {
      'click': {key: 'Enter'}
    }
  }
   
  connectedCallback() {
    super.connectedCallback();
    this.shadowRoot.addEventListener('slotchange', this._handleSlotChange.bind(this));
  }

  get template() {
    return html`
      <link rel="stylesheet" href="../src/metal-button/metal-button.css">
      <div id="button" ?data-icon="${!this._hasLabel}" ?disabled="${this.disabled}">
        <span ?hidden="${!this._hasLabel}"><slot></slot></span>
        ${this.icon ? html`<metal-icon icon="${this.icon}"></metal-icon>` : html`` }
      </div>
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
      this._tabIndex = this.getAttribute('tabindex') || this.constructor.ensuredAttributes.tabIndex || 0;
      this.setAttribute('tabindex', -1);
      this.setAttribute('aria-disabled', 'true');
    } else {
      this.removeAttribute('aria-disabled');
      if(this._tabIndex) this.setAttribute('tabindex', this._tabIndex || this.constructor.ensuredAttributes.tabIndex);
    }
  }

}

window.customElements.define('metal-button', MetalButtonElement)