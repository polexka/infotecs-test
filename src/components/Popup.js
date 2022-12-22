export default class Popup {
  constructor(popupSelector, submitCallback) {
    this._element = document.querySelector(popupSelector);
    this._form = this._element.querySelector('.edit-form')
    this._inputList = Array.from(this._form.querySelectorAll('.edit-form__input'));

    this._submitCallback = submitCallback;
    this._submit = this._submit.bind(this);
  }

  open(id) {
    this._triggerId = id;
    this._element.classList.add('popup_opened');
  }

  close() {
    this._element.classList.remove('popup_opened');
    this._form.reset();
  }

  setEventListeners() {
    // слушатель на закрытие формы редактирования
    this._element.addEventListener('mouseup', (evt) => {
      if (evt.target.classList.contains('popup__close')) {
        this.close();
      }
    })

    this._form.addEventListener('submit', this._submit);
  }

  _getInputValues() {
    const inputValues = {}
    // для каждого инпута с name = a найдется соответствующее значение inputValues[a]
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    })

    inputValues['id'] = this._triggerId;
    // в данном случае вернется объект {firstName, lastName, about, eyeColor, id}
    return inputValues;
  }

  setInputValues(data) {
    // для каждого инпута с name = a вставится соответствующее значение data[a]
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    })
  }

  _submit(evt) {
    evt.preventDefault();
    this._submitCallback(this._getInputValues());
  }
  
}