import { MetalBaseElement, html } from '../metal-base.js';

/**
 * Metal Elements Progress Bar
 * @element metal-progress-bar
 * 
 * @cssprop --metal-progress-bar-height
 * @cssprop --metal-progress-bar-color
 * @cssprop --metal-progress-bar-border-radius
 * 
 */
class MetalProgressBarElement extends MetalBaseElement {
  
  static get properties() {
    return {
      value: {
        set: Number,
        attribute: 'value',
        defaultValue: 1
      },
      max: {
        set: Number,
        attribute: 'max',
        defaultValue: 2
      },
      solid: {
        set: Boolean,
        attribute: 'solid',
        defaultValue: true
      }
    }
  };

  get template() {
    return html`
      <link rel="stylesheet" href="/src/metal-progress-bar/metal-progress-bar.css">
      <div id="progress-bar">
        ${this._maxArray.map((item,i) => html`
          <span ?data-active="${(this.value > i)}"></span>
        `)}
      </div>
    `;
  }

  get _maxArray() {
    const values = [];
    for(let i=0;i<=(this.max || 0)-1; i++) values.push(i);
    return values;
  }
}

window.customElements.define('metal-progress-bar', MetalProgressBarElement);