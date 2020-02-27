import { MetalButtonMixin, html } from './metal-button-mixin.js';

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
export class MetalButtonElement extends MetalButtonMixin(HTMLElement) {

  get template() {
    return html`
      <link rel="stylesheet" href="../src/metal-button/metal-button.css">
      ${html`${this.metalTemplate}`}
    `;
  }

}

window.customElements.define('metal-button', MetalButtonElement)