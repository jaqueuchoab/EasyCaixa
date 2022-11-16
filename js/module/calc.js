export default class Calc {
  constructor(card, received, credit, pix, expenses, closed){
    this.specification = [
      this.valuesCard = document.querySelectorAll(card),
      this.valuesReceived = document.querySelectorAll(received),
      this.valuesCredit = document.querySelectorAll(credit),
      this.valuesPix = document.querySelectorAll(pix),
      this.valuesExpenses = document.querySelectorAll(expenses),
      this.valuesExpenses = document.querySelectorAll(closed)
    ]
  }

  getValueSpecification(arrayValues) {
    this.values = arrayValues.map(element => {
      return Number(element.value);
    });
    return this.values;
  }

  arrayOfValues(containersValues) {
    this.valuesContainer = containersValues.map((specification) => {
      return this.getValueSpecification(Object.values(specification));
    });
    return this.valuesContainer;
  }

  sumTotalBuys(arraySpecificationValues) {
    return arraySpecificationValues.reduce((acumulator, atual) => {
      return acumulator + atual;
    });
  }

  sumValues(arraySpecificationValues) {
    this.sumValuesSpecifcation = arraySpecificationValues.map((element) => {
      return element.reduce((acumulator, atual) => {
        return acumulator + atual;
      });
    });
    this.valueTotal = this.sumTotalBuys(this.sumValuesSpecifcation);
    this.sumValuesSpecifcation.push(this.valueTotal);
    return this.sumValuesSpecifcation;
  }

  init() {
    this.arrayOfValues(this.specification);
    return this.sumValues(this.arrayOfValues(this.specification));
  }
}
