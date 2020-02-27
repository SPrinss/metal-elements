import { MetalProgressBarMixin, html } from './metal-progress-bar-mixin.js';

/**
 * Metal Elements Progress Bar
 * @element metal-progress-bar
 * 
 * @cssprop --metal-progress-bar-border-radius
 * @cssprop --metal-progress-bar-background
 * @cssprop --metal-progress-bar-value-background
 * @cssprop --metal-progress-bar-gap
 * 
 */
export class MetalProgressBarElement extends MetalProgressBarMixin(HTMLElement) {

  get template() {
    return html`
      <link rel="stylesheet" href="../src/metal-progress-bar/metal-progress-bar.css">
      ${this.metalTemplate}
    `;
  }
}

window.customElements.define('metal-progress-bar', MetalProgressBarElement);