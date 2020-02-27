import { html, MetalElementMixin } from '../metal-element-mixin.js';

const MetalProgressBarMixin = (SuperClass) => class extends MetalElementMixin(SuperClass) {
  
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

  get metalTemplate() {
    return html`
      ${this._maxArray.map((item,i) => html`
        <progress min="0" max="1" value="${(this.value > i) ? 1 : 0}"></progress>
      `)}
    `;
  }

  get _maxArray() {
    const values = [];
    for(let i=0;i<=(this.max || 0)-1; i++) values.push(i);
    return values;
  }

};


export { MetalProgressBarMixin, html };