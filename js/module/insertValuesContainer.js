export default class InsertValuesContainer {
  constructor(containers, valuesInsert){
    this.containersAddress = containers.map((item) => {
      return document.querySelector(item);
    });
    this.valuesInsert = valuesInsert;
  }

  relatingContainerWithValue() {
    this.containersAddress.forEach((element, index) => {
      element.innerText = `R$ ${this.valuesInsert[index]}`;
    });
  }

  showContainerValues(){
    this.containerValues = document.querySelector('.tablesValues');
    this.containerValues.classList.add('showContainer');
  }

  init() {
    this.relatingContainerWithValue();
    this.showContainerValues();
  }
}