import './styles/index.css';

import Record from './components/Record';
import Section from './components/Section';
import TableSort from './components/TableSort';

import { aboutField, eyeColorField, firstNameField, lastNameField } from './utils/constants';

// при импорте webpack сразу передает данные из json как обычный объект
import data from './utils/list.json'
import Popup from './components/Popup';

// порядок data, отображаемый в таблице
let dataState = JSON.parse(JSON.stringify(data));

// статусы сортировки
// 0 - исходный порядок 1 - прямой алфавитный -1 - обратный алфавитный
let firstNameSortStatus = 0;
let lastNameSortStatus = 0;
let aboutSortStatus = 0;
let eyeColorSortStatus = 0;

// чтобы сбросить значение статуса сортировки для всех столбцов
// если этого не сделать, после сортировки одного столбца, 
// другой будет сортироваться не с исходного порядка, а от прошлого статуса сортировки
const nullSortStatus = () => {
  firstNameSortStatus = 0;
  lastNameSortStatus = 0;
  aboutSortStatus = 0;
  eyeColorSortStatus = 0;
}

const submitCallback = ({firstName, lastName, about, eyeColor, id}) => {
  //находим объект, который нужно изменить
  const element = data.find((element) => element.id == id);
  element.name.firstName = firstName;
  element.name.lastName = lastName;
  element.about = about;
  element.eyeColor = eyeColor;

  const elementInDataState = dataState.find((element) => element.id == id);
  elementInDataState.name.firstName = firstName;
  elementInDataState.name.lastName = lastName;
  elementInDataState.about = about;
  elementInDataState.eyeColor = eyeColor;

  // в зависимости от порядка data отображаемого в таблице заново отрисовывается массив данных
  table.renderItems(dataState);

  // закрываем форму редактирования
  popup.close();
}

// форма редактирования
const popup = new Popup(
  '.popup',
  submitCallback
)

const handleRecordClick = ({id, about, eyeColor}, firstName, lastName) => {
  //сброс формы редактирования, если она была открыта
  popup.close();

  // открывает форму редактирования
  popup.open(id);
  // устанавливает значения полей формы редактирования
  popup.setInputValues({
    firstName,
    lastName,
    about,
    eyeColor
  })
  
  // идея работы с редактированием - передаем данные в форму редактирования, 
  // при сабмите она возвращает объект с новыми данными и id объекта, который изменяем
  // коллбек сабмита получает этот объект в качестве агрумента,
  // ищет объект в массиве данных по его id, и заменяет поля объекта на новые данные
  // после этого происходит повторный рендер массива данных в зависимости от dataState
}

// возвращает новую строку таблицы
const createRecord = (item) => {
  const record = new Record(item, handleRecordClick);
  return record.generateRecord();
}

// вставка новой строки таблицы в контейнер
const tableRenderer = (item) => {
  table.addItem(createRecord(item))
}

// компонент Section получает на вход функцию-рендер и селектор таблицы
// рендерит данные в таблицу
const table = new Section(
  tableRenderer,
  'tbody'
)

// класс сортировок, методы возвращают отсортированную data, не меняя исходный массив данных
const tableSort = new TableSort(); 

// коллбеки клика по заголовку таблицы действуют аналогично
// если данные не отсортированы, происходит изменение статуса сортировки и сортировка и рендер в прямом алфавитном порядке
// если данные в прямом алфавитном порядке, происходит изменение статуса сортировки и сортировка и рендер в обратном алфавитном порядке
// если данные в обратном алфавитном порядке, то происходит изменение статуса сортировки и сортировка и рендер данные в исходном порядке
const firstNameCallback = () => {
  if (firstNameSortStatus === 0) {
    dataState = tableSort.sortByName(data, 'firstName');
    table.renderItems(dataState);
    nullSortStatus();
    firstNameSortStatus = 1;
  } else if (firstNameSortStatus === 1) {
    dataState = tableSort.reverseSortByName(data, 'firstName');
    table.renderItems(dataState);
    nullSortStatus();
    firstNameSortStatus = -1;
  } else if (firstNameSortStatus === -1) {
    dataState = JSON.parse(JSON.stringify(data));
    table.renderItems(data);
    nullSortStatus();
    firstNameSortStatus = 0;
  }
}

const lastNameCallback = () => {
  if (lastNameSortStatus === 0) {
    dataState = tableSort.sortByName(data, 'lastName');
    table.renderItems(dataState);
    nullSortStatus();
    lastNameSortStatus = 1;
  } else if (lastNameSortStatus === 1) {
    dataState = tableSort.reverseSortByName(data, 'lastName');
    table.renderItems(dataState);
    nullSortStatus();
    lastNameSortStatus = -1;
  } else if (lastNameSortStatus === -1) {
    dataState = JSON.parse(JSON.stringify(data));
    table.renderItems(data);
    nullSortStatus();
    lastNameSortStatus = 0;
  }
}

const aboutCallback = () => {
  if (aboutSortStatus === 0) {
    dataState = tableSort.sortByField(data, 'about');
    table.renderItems(dataState);
    nullSortStatus();
    aboutSortStatus = 1;
  } else if (aboutSortStatus === 1) {
    dataState = tableSort.reverseSortByField(data, 'about');
    table.renderItems(dataState);
    nullSortStatus();
    aboutSortStatus = -1;
  } else if (aboutSortStatus === -1) {
    dataState = JSON.parse(JSON.stringify(data));
    table.renderItems(data);
    nullSortStatus();
    aboutSortStatus = 0;
  }
}

const eyeColorCallback = () => {
  if (eyeColorSortStatus === 0) {
    dataState = tableSort.sortByField(data, 'eyeColor');
    table.renderItems(dataState);
    nullSortStatus();
    eyeColorSortStatus = 1;
  } else if (eyeColorSortStatus === 1) {
    dataState = tableSort.reverseSortByField(data, 'eyeColor')
    table.renderItems(dataState);
    nullSortStatus();
    eyeColorSortStatus = -1;
  } else if (eyeColorSortStatus === -1) {
    dataState = JSON.parse(JSON.stringify(data));
    table.renderItems(data);
    nullSortStatus();
    eyeColorSortStatus = 0;
  }
}

// устанавливает слушатель на закрытие формы редактирования
popup.setEventListeners();

// первый рендер - данные в их исходном виде и порядке
table.renderItems(data);

// слушатели на заголовки таблицы, для запуска сортировки
firstNameField.addEventListener('click', firstNameCallback);
lastNameField.addEventListener('click', lastNameCallback);
aboutField.addEventListener('click', aboutCallback);
eyeColorField.addEventListener('click', eyeColorCallback);
