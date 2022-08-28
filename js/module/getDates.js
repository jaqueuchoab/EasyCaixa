export default class GetDates {
  constructor(dateInit, dateEnd) {
    this.dateInitial = document.querySelector(dateInit);
    this.dateEnd = document.querySelector(dateEnd);
  
    this.getDatesMethod = this.getDatesMethod.bind(this);
  }

  getDatesMethod()
  {
    // Pegam os valores alocados nos elementos
    this.valueDateInitial = this.dateInitial.value;
    this.valueDateEnd = this.dateEnd.value;
    // Limpa a data deixando apenas uma string com mês e dia, respectivamente
    this.dayMonthInitial = this.cleanDates(this.valueDateInitial);
    this.dayMonthEnd = this.cleanDates(this.valueDateEnd);
    // Array com as strings de data incial e data final
    this.dayMonthConst = [this.dayMonthInitial, this.dayMonthEnd];
    // Função que retorna as datas separadas em dia e mês, sendo a primeira array a data inicial e a segunda data final
    this.dates = this.sliceStringDate(this.dayMonthConst);
    return this.dates;
  }

  cleanDates (date)
  {
    this.regex = /(^\d{4})?[-]/g;
    this.dateChange = date.replace(this.regex, '');
    return this.dateChange;
  }

  // Função que retorna dois arrays com dia e mês, incial e final
  sliceStringDate(arrayStringsDate)
  {
    this.arrayDayMonthInit = [Number.parseInt(arrayStringsDate[0].slice(2,4)), Number.parseInt(arrayStringsDate[0].slice(0,2))];
    this.arrayDayMonthEnd = [Number.parseInt(arrayStringsDate[1].slice(2,4)), Number.parseInt(arrayStringsDate[1].slice(0,2))];
    return [this.arrayDayMonthInit, this.arrayDayMonthEnd];
  }
}