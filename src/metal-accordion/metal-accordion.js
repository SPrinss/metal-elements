import { MetalBaseElement, html } from '../metal-base.js';
import '../metal-button/metal-button.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html'

/**
 * Metal Element Accordion
 * @element metal-accordion
 * 
 * @cssprop --metal-accordion-button-background
 * @cssprop --metal-accordion-button-background--hover
 * @cssprop --metal-accordion-button-background--active
 * @cssprop --metal-accordion-button-background--open
 * @cssprop --metal-accordion-button-color
 * @cssprop --metal-accordion-button-color--open
 * @cssprop --metal-accordion-item-background
 * @cssprop --metal-accordion-item-margin-bottom
 * @cssprop --metal-accordion-item-padding
 * 
 */
class MetalAccordionElement extends MetalBaseElement {

  static get properties() {
    return {
      values: {
        defaultValue: [],
        changedEventName: 'values-changed'
      },
      selectedIndex: {
        set: Number,
        attribute: 'selected-index',
        changedHandler: '_selectedIndexChanged',
        changedEventName: 'selected-index-changed',
        defaultValue: -1
      }
    }
  }

  constructor() {
    super();
    this.shadowRoot.addEventListener('slotchange', this._handleSlotChange.bind(this));
    const resizeObserver = new ResizeObserver(this._handleResize.bind(this));
    resizeObserver.observe(this);
  }

  get template() {
    return html`
      <link rel="stylesheet" href="/src/metal-accordion/metal-accordion.css">
      ${this.values.map((val, i) => html`
        <metal-button
          .icon="${i === this.selectedIndex ? 'close' : 'add'}"
          data-index="${i}"
          @click="${this._handleButtonClick}"
          ?data-opened="${i === this.selectedIndex}"
        >${val}</metal-button>
        <div
          class="container"
          ?data-opened="${i === this.selectedIndex}"
        >${unsafeHTML(this._children[i].outerHTML)}</div>   
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