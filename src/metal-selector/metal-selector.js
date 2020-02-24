import { MetalElement, html } from '../metal-element.js';

/**
 * Metal Elements Selector
 * @element metal-selector
 * @slot
 * 
 * @fires values-changed Values of attributes of slotted content, defined by attrForSelected, that have been selected.
 * 
 */
export class MetalSelectorElement extends MetalElement {

  static get properties() {
    return {
      /**
       * Values of attributes of slotted content, defined by attrForSelected.
       * @type {array} 
       * @default []
       */      
      options: {
        defaultValue: []
      },
      /**
       * Values of attributes of slotted content, defined by attrForSelected, that have been selected.
       * @type {array} 
       * @default []
       */
      values: {
        defaultValue: [],
        changedEventName: 'values-changed'
      },
      /**
       * Whether multiple options can be selected
       * @type {boolean} 
       * @attr multi
       * @default false
       */
      multi: {
        set: Boolean,
        attribute: 'multi',
        defaultValue: false
      },
      /**
       * The attribute name that should be used as value
       * @type {string} 
       * @attr attr-for-selected
       * @default 'value'
       */
      attrForSelected: {
        set: String,
        attribute: 'attr-for-selected',
        defaultValue: 'value'
      },
      /**
       * The class name that should be set when an option is selected
       * @type {string} 
       * @attr selected-class-name
       * @default 'metal-selected'
       */
      selectedClassName: {
        set: String,
        attribute: 'selected-class-name',
        defaultValue: 'metal-selected'
      },
      _children: {
        defaultValue: [],
        changedHandler: '_childrenChanged'
      }
    };
  }

  constructor() {
    super();
    this.shadowRoot.addEventListener('slotchange', this._handleSlotChange.bind(this));
  }

  static get propertiesChangedHandlers() {
    return {
      '_valuesChanged': ['values', '_children']
    };
  }

  get template() {
    return html`
      <slot></slot>
    `;
  }

  _handleSlotChange(e) {
    const nodes = Array.from(e.target.assignedNodes());
    const children = nodes.filter(item => item[this.attrForSelected] || item.getAttribute && item.getAttribute(this.attrForSelected));
    const options = children.map(item => item[this.attrForSelected] || item.getAttribute && item.getAttribute(this.attrForSelected));
    this.options = options;
    this._children = children;
  }

  _childrenChanged(children, oldValues = []) {
    (oldValues || []).map(item => {
      const itemIsDeleted = children.indexOf(item) === -1;
      if(itemIsDeleted) this._removeClickEvent(item);
    });
    (children || []).map(item => {
      const itemIsAdded = oldValues.indexOf(item) === -1;
      if(itemIsAdded) this._addClickEvent(item);
    });
  }

  _addClickEvent(item) {
    item.addEventListener('click', this._handleButtonClick.bind(this));
  }

  _removeClickEvent(item) {
    item.removeEventListener('click', this._handleButtonClick.bind(this));
  }

  _handleButtonClick(evt) {
    const $item = evt.target;
    const value = $item[this.attrForSelected] || $item.getAttribute && $item.getAttribute(this.attrForSelected);

    const valueIndex = this.values.indexOf(value);
    const valueExists = valueIndex !== -1;

    const newValues = [];
    if(this.multi === true) {
      for(var i in this.values) {
        if(this.values[i] !== value) newValues.push(this.values[i]);
      }
      if(!valueExists) newValues.push(value);
    } else {
      newValues.push(value);
    }
    this.values = newValues;
  }

  _valuesChanged() {
    if(!this._children) return;
    this._children.map($child => {
      const value = $child[this.attrForSelected] || $child.getAttribute && $child.getAttribute(this.attrForSelected);

      const valueExists = this.values.indexOf(value) !== -1;
      if(valueExists) $child.classList.add(this.selectedClassName);
      else $child.classList.remove(this.selectedClassName);
    });
  }
}

window.customElements.define('metal-selector', MetalSelectorElement);