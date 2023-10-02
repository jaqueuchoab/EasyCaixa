export default class GetDates {
  constructor(dateInit, dateEnd) {
    this.dateInitial = document.querySelector(dateInit);
    this.dateEnd = document.querySelector(dateEnd);
  
    this.getDatesMethod = this.getDatesMethod.bind(this);
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

  // Função que retorna dois arrays com dia e mês, incial e final
  /**
   * pt-BR: sliceDateParseInt recebe uma array/object com duas posições que correspondem a strings do
   * dia/mês inicial e o dia/mês final do período, o método corta cada string ao meio os organizando em uma array
   * no formato [dia, mês] separando o dia do mês e os transformando em um tipo inteiro.
   * 
   * 
   * @param {Object[]} arrayStringsDate
   * @returns 
   */
  sliceDateParseInt(arrayStringsDate)
  {
    this.arrayDayMonthInit = [Number.parseInt(arrayStringsDate[0].slice(2,4)), Number.parseInt(arrayStringsDate[0].slice(0,2))];
    this.arrayDayMonthEnd = [Number.parseInt(arrayStringsDate[1].slice(2,4)), Number.parseInt(arrayStringsDate[1].slice(0,2))];
    return [this.arrayDayMonthInit, this.arrayDayMonthEnd];
  }

  getDatesMethod()
  {
    // Armazenam os valores alocados nos elementos de input
    this.valueDateInitial = this.dateInitial.value;
    this.valueDateEnd = this.dateEnd.value;
    // cleanDates limpa as datas removendo o ano e deixando apenas uma string com dia e mês, respectivamente
    this.dayMonthInitial = this.cleanDates(this.valueDateInitial);
    this.dayMonthEnd = this.cleanDates(this.valueDateEnd);
    // Array com as strings de data incial e data final
    this.dayMonthConst = [this.dayMonthInitial, this.dayMonthEnd];
    // slideStringDate retorna as datas separadas em dia e mês, sendo a primeira array a data inicial e a segunda data final
    this.arrayDatesInt = this.sliceDateParseInt(this.dayMonthConst);
    return this.arrayDatesInt;
  }
}