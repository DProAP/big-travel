import Abstract from './abstract.js';

export default class Smart extends Abstract {
  constructor() {
    super();
    this._state = {};
  }

  updateState(update, justStateUpdating) {
    if (!update) {
      return;
    }
    this._state = Object.assign({}, this._state, update);
    if (justStateUpdating) {
      return;
    }
    this.updateElement();
  }

  updateElement() {
    const currentElement = this.getElement();
    const parent = currentElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, currentElement);

    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }

}