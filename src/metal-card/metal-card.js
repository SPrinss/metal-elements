import { MetalBaseElement, html } from '../metal-base.js';

/**
 * Metal Elements Card
 * @element metal-card
 * 
 * @cssprop --metal-card-background
 * @cssprop --metal-card-color
 * @cssprop --metal-card-border-radius
 * @cssprop --metal-card-object-fit
 * @cssprop --metal-card-padding
 * @cssprop --metal-card-font-weight
 * 
 */
class MetalCardElement extends MetalBaseElement {

  static get properties() {
    return {
      imageUrl: {
        set: String,
        attribute: 'image-url'
      },
      title: {
        set: String
      }
    }
  }

  get template() {
    return html`
      <link rel="stylesheet" href="/src/metal-card/metal-card.css">

      <header>
        <img src="${this.imageUrl}">
      </header>
      <main>
        <h3>${this.title}</h3>
      </main>
    `;
  }

}

window.customElements.define('metal-card', MetalCardElement);