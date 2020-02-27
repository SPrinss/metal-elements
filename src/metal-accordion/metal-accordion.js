import { MetalElement, html } from '../metal-element.js';
import '../metal-button/metal-button.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

/**
 * Metal Element Accordion
 * @element metal-accordion
 * @slot
 * 
 * @fires values-changed The values of the data-accname attribute set in the slotted items.
 * @fires selected-index-changed The index of the slotted item that is shadown
 * 
 * @cssprop --metal-accordion-container-background
 * @cssprop --metal-accordion-container-border-color
 * @cssprop --metal-accordion-container-border-color
 * @cssprop --metal-accordion-container-margin
 * @cssprop --metal-accordion-container-padding
 * 
 * @cssprop --metal-accordion-button-text-align
 * @cssprop --metal-accordion-button-height
 * @cssprop --metal-accordion-button-border-radius
 * @cssprop --metal-accordion-button-background
 * @cssprop --metal-accordion-button-color
 * @cssprop --metal-accordion-button-border-color
 * @cssprop --metal-accordion-button-border-width
 * @cssprop --metal-accordion-button-background--hover
 * @cssprop --metal-accordion-button-color--hover
 * @cssprop --metal-accordion-button-border-color--hover
 * @cssprop --metal-accordion-button-border-width--hover
 * @cssprop --metal-accordion-button-background--active
 * @cssprop --metal-accordion-button-color--active
 * @cssprop --metal-accordion-button-border-color--active
 * @cssprop --metal-accordion-button-border-width--active
 * @cssprop --metal-accordion-button-background--selected
 * @cssprop --metal-accordion-button-color--selected
 * @cssprop --metal-accordion-button-border-color--selected
 * @cssprop --metal-accordion-button-border-width--selected
 * 
 * @cssprop --metal-accordion-item-background
 * @cssprop --metal-accordion-item-color
 * @cssprop --metal-accordion-font-family
 * @cssprop --metal-accordion-font-weight
 * @cssprop --metal-accordion-font-size
 * 
 */
export class MetalAccordionElement extends MetalElement {

  static get properties() {
    return {
      /**
       * The values of the data-accname attribute set in the slotted items.
       * @type {array} 
       * @default []
       */
      values: {
        defaultValue: [],
        changedEventName: 'values-changed'
      },
      /**
       * The index of the slotted item that is shadown
       * @type {number} 
       * @attr selected-index
       * @default -1
       */      
      selectedIndex: {
        set: Number,
        attribute: 'selected-index',
        changedHandler: '_selectedIndexChanged',
        changedEventName: 'selected-index-changed',
        defaultValue: -1
      }
    };
  }

  constructor() {
    super();
    this.shadowRoot.addEventListener('slotchange', this._handleSlotChange.bind(this));
    const resizeObserver = new ResizeObserver(this._handleResize.bind(this));
    resizeObserver.observe(this);
  }

  get template() {
    return html`
      <link rel="stylesheet" href="../src/metal-accordion/metal-accordion.css">
      ${this.values.map((val, i) => html`
        <div class="container" ?data-opened="${i === this.selectedIndex}">
          <metal-button
            .icon="${i === this.selectedIndex ? 'arrow_drop_up' : 'arrow_drop_down'}"
            data-index="${i}"
            @click="${this._handleButtonClick}"
            ?data-opened="${i === this.selectedIndex}"
          >${val}</metal-button>
          <div class="item">${unsafeHTML(this._children[i].outerHTML)}</div>
        </div>   
      `)}

      <div id="slotContainer"><slot></slot></div>
    `;
  }
  
  _selectedIndexChanged() {
    this._setContainerHeights();
  }
  
  _handleResize() {
    const oldWidth = this._offsetWidth || 0;
    this._offsetWidth = this.offsetWidth;
    const widthChanged = this._offsetWidth !== oldWidth;
    if(!widthChanged) return;
    window.clearTimeout(this._resizeDebouncer);
    this._resizeDebouncer = window.setTimeout(this._setContainerHeights.bind(this), 100);
  }

  _handleSlotChange(e) {
    const children = e.target.assignedNodes().filter(item => item.dataset && !!item.dataset.accname);
    const values = children.map(item => item.dataset.accname);
    this.values = [...values];
    this._children = [...children];
  }

  _handleButtonClick(evt) {
    const selectedIndex = parseInt(evt.target.dataset.index);
    this.selectedIndex = (selectedIndex === this.selectedIndex) ? -1 : selectedIndex;
  }

  _setContainerHeights() {
    if(!this.shadowRoot) return;
    const btns = this.shadowRoot.querySelectorAll('metal-button');
    if(!btns) return;
    btns.forEach(btn => {
      const container = btn.nextElementSibling;
      const height = (btn.dataset.index == this.selectedIndex) ? container.scrollHeight + 'px' : 0;
      container.style.setProperty('--container-height', height);  
    });
  }

}

window.customElements.define('metal-accordion', MetalAccordionElement);