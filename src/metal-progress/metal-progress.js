import { MetalProgressMixin, html } from './metal-progress-mixin.js';

/**
 * Metal Elements Progress
 * @element metal-progress
 * 
 * @cssprop --metal-progress-border-radius
 * @cssprop --metal-progress-background
 * @cssprop --metal-progress-value-background
 * @cssprop --metal-progress-gap
 * 
 */
export class MetalProgressElement extends MetalProgressMixin(HTMLElement) {

  get template() {
    return html`
      <!-- <link rel="stylesheet" href="../src/metal-progress/metal-progress.css"> -->
      ${this.metalTemplate}
    `;
  }
}

window.customElements.define('metal-progress', MetalProgressElement);