import { MetalElementMixin, html } from './metal-element-mixin.js';

class MetalElement extends MetalElementMixin(HTMLElement) {
}

export { MetalElement, html };