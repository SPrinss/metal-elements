import { MetalBaseElement, html } from '../metal-base.js';
import '../metal-button/metal-button.js';
import '../metal-selector/metal-selector.js';

/**
 * Metal Elements Button Group
 * @element metal-button-group
 * 
 * @cssprop --metal-button-group-background
 * @cssprop --metal-button-group-text-color
 * @cssprop --metal-button-group-border-color
 * @cssprop --metal-button-group-border-width
 * @cssprop --metal-button-group-border-radius
 * @cssprop --metal-button-group-box-shadow
 * 
 * @cssprop --metal-button-group-background--selected
 * @cssprop --metal-button-group-text-color--selected
 * @cssprop --metal-button-group-box-shadow--selected
 */
class MetalButtonGroupElement extends MetalBaseElement {

  static get properties() {
    return {
      options: {
        defaultValue: [],
        changedHandler: '_optionsChanged'
      },
      selectedValues: {
        attribute: 'selected-values',
        defaultValue: [],
        changedEventName: 'selected-values-changed'
      },
      multi: {
        set: Boolean,
        defaultValue: false
      },
      switch: {
        set: Boolean,
        attribute: 'switch',
        defaultValue: false
      }
    }
  }

  get template() {
    return html`
      <link rel="stylesheet" href="/src/metal-button-group/metal-button-group.css">

      <metal-selector
        .multi="${this.multi}"
        .values="${this.selectedValues}"
        @values-changed="${this._valuesChanged}"
      >
        ${this.options.map(item => {
          return html`
            <metal-button
              .value="${item.value}"
            >${item.label}</metal-button>
          `;
        })}
      </metal-selector>
    `;
  }

  _optionsChanged() {
    this.style.setProperty('--metal-button-group-numitems', this.options.length);
  }

  _valuesChanged(evt) {
    this.selectedValues = [...evt.detail.value];
  }
}

window.customElements.define('metal-button-group', MetalButtonGroupElement);