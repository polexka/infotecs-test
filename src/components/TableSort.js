export default class TableSort {
  constructor() {

  }

  reverseSortByName(data, sortingValue) {
    return this.sortByName(data, sortingValue).reverse();
  }

  sortByName(data, sortingValue) {
    const sortedData = JSON.parse(JSON.stringify(data));

    sortedData.sort((a, b) => {
      if (a.name[sortingValue].toLowerCase() < b.name[sortingValue].toLowerCase()) {
        return -1;
      }
      if (a.name[sortingValue].toLowerCase() > b.name[sortingValue].toLowerCase()) {
        return 1;
      }
      return 0;
    })

    return sortedData;
  }

  reverseSortByField(data, sortingValue) {
    return this.sortByField(data, sortingValue).reverse();
  }

  sortByField(data, sortingValue) {
    const sortedData = JSON.parse(JSON.stringify(data));

    sortedData.sort((a, b) => {
      if (a[sortingValue].toLowerCase() < b[sortingValue].toLowerCase()) {
        return -1;
      }
      if (a[sortingValue].toLowerCase() > b[sortingValue].toLowerCase()) {
        return 1;
      }
      return 0;
    })

    return sortedData;
  }

}