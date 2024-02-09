export default class Calc {
  constructor(card, received, credit, pix, expenses, closed){
    /**
     * this._specification atributo que guarda todos os inputs de acordo com sua especificação (lista de nodelists)
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

  /**
   * pt-BR: O "transformadosEspecificação" é um método que recebe um objeto com especificações agrupadas, indicando 
   * o elemento HTML associado ao valor. Ele extrai cada valor, converte-o em número (considerando seu tipo 
   * primitivo como String) e retorna um array organizando os valores como números para cada especificação. 
   * 
   * en-US: "transformadosEspecificação" is a method that takes an object with grouped specifications, indicating 
   * the HTML element associated with the value. It extracts each value, converts it into a number (considering its 
   * primitive type as String), and returns an array organizing the values as numbers for each specification.
   * 
   * @param {Object} arrayValues 
   * @returns {Object} valuesTransformed
   */
  processedValueSpecification(arrayValues) {
    this.valuesTransformed = arrayValues.map(element => {
      return Number(element.value);
    });
    console.log(typeof(this.valuesTransformed));
    return this.valuesTransformed;
  }

  arrayOfValues(containersValues) {
    this.valuesContainer = containersValues.map((specification) => {
      return this.processedValueSpecification(Object.values(specification));
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
