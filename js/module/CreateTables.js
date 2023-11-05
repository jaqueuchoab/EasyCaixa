export default class CreateTables {
  constructor(date) {
    this.datesObject = date;
    this.datesInit = this.datesObject.dateInitPeriod;
    this.datesEnd = this.datesObject.dateEndPeriod;
  }

  // OK
  creatingTables(dateInitMonth, dateInitDetails) {
    if (dateInitMonth == dateInitDetails.code) {
      const tablesLength = this.lengthTables(dateInitDetails);

      this.structureTables(tablesLength, dateInitDetails.days, dateInitDetails.month);
    }
  }

  // OK, só falta tratar de um ano para outro e de meses em que a quantidade de seus dias se diferem
  lengthTables(dateInitDetails) {
    let quantifyTables = 0;
    // Erros
    // O mês de fim vem antes do mês de início, data inválida
    if (this.datesInit.monthCode > this.datesEnd.monthCode && this.datesInit.year == this.datesEnd.year){
      // *ERRO*: Montar página ou meio visual pelo qual o erro será mostrado.
      console.log('Data inválida: Mês de ínicio é após o mês de fim do período.');
      return "ERRO";
    }

    // Dia de início não é maior que o dia de fim
    if (this.datesInit.day > this.datesEnd.day && this.datesInit.monthCode == this.datesEnd.monthCode) {
      /**
      * *ERRO*: Não há a possibilide de haver um período em que no mesmo mês há o seu e início e fim, e o seu 
       * dia de início é MAIOR que seu dia de fim, exemplo:
       * - data de início: 
       *  mês: novembro, dia início: 10
       * - data de fim: 
       *  mês: novembro, dia fim: 09
       */
      console.log("Data inválida: O dia de início é maior que o dia de fim no mesmo mês.");
      return "ERRO";
    } 

    // Meses diferentes
    if (this.datesInit.monthCode !== this.datesEnd.monthCode) {
      // Dias iguais
      if (this.datesInit.day == this.datesEnd.day) {
        return quantifyTables = (this.datesEnd.monthCode - this.datesInit.monthCode) * dateInitDetails.days;
      }
      else {
        // Dia de início maior que o dia final
        if (this.datesInit.day > this.datesEnd.day) {
          return quantifyTables = dateInitDetails.days - ((this.datesInit.day - 1) - this.datesEnd.day);
        }
        else {
          // ELSE: Dia de início não é maior que o dia final
          return quantifyTables = dateInitDetails.days + ((this.datesEnd.day + 1) - this.datesInit.day);
        }
      }
    }

    // Meses iguais
    if (this.datesInit.day == this.datesEnd.day) return quantifyTables = 1;
    else {
      // ELSE: Dias não iguais
      // Dia de início maior que o dia de fim no mesmo mês
      console.log(this.datesEnd.day - (this.datesInit.day - 1));
      return quantifyTables = this.datesEnd.day - (this.datesInit.day - 1);
    }
  }

  // OK, futuramente indicar o ano também
  datesCompostion(initDay, endDay, year){
    const dayForShow = initDay <= 9 ? `0${initDay}` : `${initDay}`;
    const monthForShow = endDay <= 9 ? `0${endDay}` : `${endDay}`;
    return `${dayForShow}/${monthForShow}`;
  }

  structureTables(amountTables, dateInitDays, dateInitMonth){
    this.containerTable = document.querySelector('.tablesContainer');
    this.tableComponent = document.querySelector('.tableComponentInput');

    for (let index = 1; index < amountTables; index++) {
      this.tableElement = document.createElement('table');
      console.log(this.tableElement);
      this.containerTable.appendChild(this.tableElement);
      this.tableElement.setAttribute('border', '1px');
      this.tableElement.classList.add('tableComponentInput');
      this.tableElement.innerHTML = `<table border="1px">${this.tableComponent.innerHTML}</table>`;
    }

    // Cortar a função aqui
    this.containerDate = document.querySelectorAll('.celulaDate');
    this.datescontainerArray = [];

    this.incrementDay = this.datesInit.day;
    this.incrementMonth = this.datesInit.monthCode;

    this.containerDate.forEach((element, index) => {
      this.paraghElement = document.createElement('p');
      element.appendChild(this.paraghElement);
      this.paraghElement.classList.add('dateContainer');

      if (this.incrementDay <= dateInitDays)
      {
        this.paraghElement.innerText = this.datesCompostion(this.incrementDay, this.incrementMonth);
        this.datescontainerArray[index] = this.datesCompostion(this.incrementDay, this.incrementMonth);
      }
      else
      {
        if (this.incrementDay > dateInitDays) {
          this.incrementDay *= 0;
          this.incrementDay += 1;
        }

        if (this.datesEnd.monthCode == dateInitMonth + 1) {
          this.incrementMonth += 1;
          this.paraghElement.innerText = this.datesCompostion(this.incrementDay, this.datesEnd.monthCode);
          this.datescontainerArray[index] = this.datesCompostion(this.incrementDay, this.incrementMonth);
        }
      }

      this.incrementDay++;
    });

    return this.qtdTablesCreated;
  }
  
  // OK
  fetchDetailsDateReference = async(url, monthCode) => {
    try {
      this.dateInitDetails = await fetch(url)
        .then(response => response.json())
        .then(response => response.filter(element => element.code === monthCode)[0]);

      this.creatingTables(this.datesInit.monthCode, this.dateInitDetails);
    }
    catch(err) {
      console.log(err);
    }
  }

  // OK
  initFetch() {
    this.fetchDetailsDateReference('../../months.json', this.datesInit.monthCode);

  }
}
