import { MetalBaseElement, html } from '../metal-base.js';

/** 
 * Metal Elements page
 * @element metal-page
 * 
 * @cssprop --metal-page-margin
 * 
 */
class MetalPageElement extends MetalBaseElement {
  get template() {
    return html`
      <link rel="stylesheet" href="/src/metal-page/metal-page.css">
      <header><slot name="header"></slot></header>
      <main><slot name="body"></slot></main>
      <footer><slot name="footer"></slot></footer>
    `;
  }
}

window.customElements.define('metal-page', MetalPageElement);