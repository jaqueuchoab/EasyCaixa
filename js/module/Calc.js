export default class Calc {
  constructor(card, received, credit, pix, expenses, closed){
    /**
     * this._specification atributo que guarda todos os inputs de acordo com sua especificação (lista de nodelists)
     * ver como posso colocar uma tag @
     */
    this._specification = [
      this._valuesCard = document.querySelectorAll(card),
      this._valuesReceived = document.querySelectorAll(received),
      this._valuesCredit = document.querySelectorAll(credit),
      this._valuesPix = document.querySelectorAll(pix),
      this._valuesExpenses = document.querySelectorAll(expenses),
      this._valuesCloseds = document.querySelectorAll(closed)
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
    console.log(this._specification)
    this.arrayOfValues(this._specification);
    return this.sumValues(this.arrayOfValues(this._specification));
  }
}
