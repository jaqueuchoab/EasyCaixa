export default class InsertValuesContainer {
  constructor(containers, valuesInsert){
    this.containersAddress = containers.map((item) => {
      return document.querySelector(item);
    });
    this.valuesInsert = valuesInsert;
  }

  relatingContainerWithValue() {
    this.containersAddress.forEach((element, index) => {
      element.innerText = `R$ ${this.valuesInsert[index].toFixed(2)}`;
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