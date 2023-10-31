export default class GetDates {
  constructor(dateInit, dateEnd) {
    this.dateInitial = document.querySelector(dateInit);
    this.dateEnd = document.querySelector(dateEnd);
  }

  /**
   * pt-BR: cleanDates limpa a formatação padrão de um input do tipo date, substituindo o ano (regex matches) e 
   * todos os hífens encontrados por uma string vazia restando apenas dia e mês.
   * 
   * en-US: cleanDates that clears the default formatting of a date type input, replacing the year (regex matches
   * and all hyphens found with an empty string leaving only the day and month.
   * 
   * @param {String} date 
   * @returns {String this.dateChange} | formatting: '0000'
   */
  cleanDates (date)
  {
    /*
    * pt-BR: Comando regex que captura um grupo com sequência de 4 digitos de [0-9] no incio da string e busca por 
    * hífens.
    * 
    * en-US: Regex command that captures a group with a 4-digit sequence of [0-9] at the beginning of the string and
    * searches for it hyphens.
    */
    this.regex = /(^\d{4})?[-]/g;
    this.dateChange = date.replace(this.regex, '');
    return this.dateChange;
  }

  /**
   * pt-BR: sliceDateParseInt recebe uma array/object com duas posições que correspondem a strings do
   * dia/mês inicial e o dia/mês final do período, o método corta cada string ao meio os organizando em uma array
   * no formato [dia, mês] separando o dia do mês e os transformando em um tipo inteiro.
   * 
   * en-US: sliceDateParseInt receives an array/object with two positions that correspond to strings from the
   * starting day/month and the ending day/month of the period, the method cuts each string in half organizing 
   * them into an array in the format [day, month] separating the day of the month and transforming them into an 
   * integer type.
   * 
   * @param {String[]} arrayStringsDate
   * @returns {int[]} [arrayDayMonthInit, arrayDayMonthEnd]
   */
  sliceDateParseInt(arrayStringsDate)
  {
    this.arrayDayMonthInit = [Number.parseInt(arrayStringsDate[0].slice(2,4)), Number.parseInt(arrayStringsDate[0].slice(0,2))];
    this.arrayDayMonthEnd = [Number.parseInt(arrayStringsDate[1].slice(2,4)), Number.parseInt(arrayStringsDate[1].slice(0,2))];
    return [this.arrayDayMonthInit, this.arrayDayMonthEnd];
  }

  /**
   * pt-BR: formattingDatesMethod é um método que captura os valores dos elementos de input e utiliza outros métodos * da classe GetDates para formatar o dia/mês para que posteriormente ele possa ser usado.
   * 
   * en-US: formattingDatesMethod is a method that captures the values ​​of input elements and uses other methods of * the GetDates class to format the day/month so that it can be used later.
   * 
   * @returns {Object[]} [dateInitPeriod, dateEndPeriod]
   */
  formattingDatesMethod()
  {
    this.valueDateInitial = this.dateInitial.value;
    this.valueDateEnd = this.dateEnd.value;

    this.dayMonthInitial = this.cleanDates(this.valueDateInitial);
    this.dayMonthEnd = this.cleanDates(this.valueDateEnd);

    this.dayMonthConst = [this.dayMonthInitial, this.dayMonthEnd];

    this.arrayDatesInt = this.sliceDateParseInt(this.dayMonthConst);

    const objectDate = {
      dateInitPeriod: {
        day: this.arrayDatesInt[0][0], 
        month: this.arrayDatesInt[0][1]
      },
      dateEndPeriod: {
        day: this.arrayDatesInt[1][0], 
        month: this.arrayDatesInt[1][1]
      }
    };
    return objectDate;
  }

  getDates() {
    return this.formattingDatesMethod();
  }
}