import { MetalElement, html } from '../metal-element.js';

/**
 * Metal Elements Progress Bar
 * @element metal-progress-bar
 * 
 * @cssprop --metal-progress-bar-height
 * @cssprop --metal-progress-bar-color
 * @cssprop --metal-progress-bar-border-radius
 * 
 */
export class MetalProgressBarElement extends MetalElement {
  
  static get properties() {
    return {
      /**
       * The current progress step
       * @type {number} 
       * @attr value
       * @default 1
       */
      value: {
        set: Number,
        attribute: 'value',
        defaultValue: 1
      },
      /**
       * The maximum amount of steps
       * @type {number} 
       * @attr max
       * @default 2
       */      
      max: {
        set: Number,
        attribute: 'max',
        defaultValue: 2
      },
      /**
       * Whether the progress bar should be displayed a a solid block, or as seperate steps
       * @type {boolean} 
       * @attr solid
       * @default true
       */        
      solid: {
        set: Boolean,
        attribute: 'solid',
        defaultValue: false
      }
    };
  }

  get template() {
    return html`
      <link rel="stylesheet" href="../src/metal-progress-bar/metal-progress-bar.css">
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