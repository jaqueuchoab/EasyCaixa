export default class CreateTables {
  constructor(date) {
    this.datesObject = date;
    this.datesInit = this.datesObject.dateInitPeriod;
    this.datesEnd = this.datesObject.dateEndPeriod;
  }

  /**
   * pt-BR: creatingTables incializa a criação das tabelas a partir de uma verificação no mês de inicio e o código   * do mês em referência, se forem iguais, as tabelas podem ser criadas. Seguindo, usa-se uma função para denominar * a quantidade de tabelas a serem criadas, esse dado é repassado para a função que estrutura as tabelas 
   * juntamente com outras informações.
   * 
   * en-US: creatingTables starts the creation of tables by checking the starting month and the code of the month in * reference, if they are the same, the tables can be created. Next, a function is used to name the number of 
   * tables to be created, this data is passed on to the function that structures the tables
   * along with other information.
   * 
   * @param {} dateInitMonth 
   * @param {Object} dateInitDetails 
   */
  creatingTables(dateInitMonth, dateInitDetails) {
    if (dateInitMonth == dateInitDetails.code) {
      const tablesLength = this.lengthTables(dateInitDetails);

      this.structureTables(tablesLength, dateInitDetails.days, dateInitDetails.month);
    }
  }

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

    this.insertDateContent(dateInitDays, dateInitMonth);

    return this.qtdTablesCreated;
  }

  insertDateContent(dateInitDays, dateInitMonth) {
    this.containerDate = document.querySelectorAll('.celulaDate');
    this.datesContainerArray = [];

    let incrementDay = this.datesInit.day;
    let incrementMonth = this.datesInit.monthCode;

    this.containerDate.forEach((element, index) => {
      this.paraghElement = document.createElement('p');
      element.appendChild(this.paraghElement);
      this.paraghElement.classList.add('dateContainer');

      if (incrementDay <= dateInitDays)
      {
        this.paraghElement.innerText = this.datesCompostion(incrementDay, incrementMonth);
        this.datesContainerArray[index] = this.datesCompostion(incrementDay, incrementMonth);
      }
      else
      {
        if (incrementDay > dateInitDays) {
          incrementDay *= 0;
          incrementDay += 1;
        }

        if (this.datesEnd.monthCode == dateInitMonth + 1) {
          incrementMonth += 1;
          this.paraghElement.innerText = this.datesCompostion(incrementDay, this.datesEnd.monthCode);
          this.datescontainerArray[index] = this.datesCompostion(incrementDay, incrementMonth);
        }
      }

      incrementDay++;
    });
  }

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

  initFetch() {
    this.fetchDetailsDateReference('../../months.json', this.datesInit.monthCode);

  }
}
