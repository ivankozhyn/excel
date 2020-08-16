import {DomListener} from './domListener';

export class ExcelComponent extends DomListener {
  constructor(root, options={}) {
    super(root, options.listeners)
    this.name = options.name || ''
  }

  toHtml() {
    return ''
  }

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
  }
}
