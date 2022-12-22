export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.append(element);
  }

  renderItems(data) {
    this._clearContainer();

    data.forEach(element => {
      this._renderer(element);
    });
  }

  _clearContainer() {
    this._container.innerHTML = '';
  }

}