import { MetalElement, html } from '../metal-element.js';

/**
 * Metal Elements icon
 * @element metal-icon
 * 
 */

  export class MetalIconElement extends MetalElement {

  static get properties() {
    return {
      /**
       * The name of the icon that should be displayed
       * @type {string} 
       * @typedef { arrow-left | arrow-down | arrow-right | close | add | logo | heart | done | pencil }
       * @default ''
       */      
      icon: {
        set: String,
        attribute: 'icon'
      }
    };
  }

  constructor() {
    super();
    this.loadFonts();
  }

  async loadFonts() {
    if(document.querySelector('.metal-material-fonts')) return;
    const style = document.createElement('style');
    style.classList.add('metal-material-fonts');
    document.head.appendChild(style);
    const res = await fetch('https://fonts.googleapis.com/icon?family=Material+Icons');
    const txt = await res.text();
    style.innerHTML = txt;
  }

  get template() {
    return html`
      <link rel="stylesheet" href="../src/metal-icon/metal-icon.css">
      ${this.icon}
    `
  }

}

window.customElements.define('metal-icon', MetalIconElement);