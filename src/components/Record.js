export default class Record {
  constructor(data, handleClick) {
    this._data = data;
    this._name = data.name.firstName;
    this._surname = data.name.lastName;
    this._about = data.about;
    this._eyeColor = data.eyeColor;

    this._handleClick = handleClick;
    this._clickCallback = this._clickCallback.bind(this);
  }

  _getTemplate() {
    const recordElement = document
      .querySelector('.record-template')
      .content
      .querySelector('.table__record')
      .cloneNode(true);

    return recordElement;
  }

  _clickCallback() {
    this._handleClick(this._data, this._name, this._surname);
  }

  _setEventListeners() {
    this._element.addEventListener('click', this._clickCallback);
  }

  generateRecord() {
    this._element = this._getTemplate();

    this._element.querySelector('.table__name').textContent = this._name;
    this._element.querySelector('.table__surname').textContent = this._surname;
    this._element.querySelector('.table__about').textContent = this._about;
    this._element.querySelector('.table__eye').textContent = this._eyeColor;

    this._setEventListeners();
    return this._element;
  }

}
