export default class CreateTables {
  constructor(date) {
    this.datesObject = date;
    this.datesInit = this.datesObject.dateInitPeriod;
    this.datesEnd = this.datesObject.dateEndPeriod;
  }

  creatingTables(dateInitMonth, dateInitDetails) {
    if (dateInitMonth == dateInitDetails.code) {
      const tablesLength = this.lengthTables(dateInitDetails.days);

      this.structureTables(tablesLength, dateInitDetails.days, dateInitDetails.month);
    }
  }

  lengthTables(amountDaysMonth) {
    let quantifyTables = 0;
    if (this.datesInit.monthCode > this.datesEnd.monthCode)
    {
      /**  BUG/INCONSTÂNCIA: A possibilide de determinar um período que se incia em um ano e acaba em outro, exemplo:
      *   - data de início: 
      *      mês: novembro, código: 11, ano: 2018
      *   - data de fim: 
      *      mês: janeiro, código: 01, ano: 2019
      *   esse caso não passará nesta condição do if atual, pois ao comparar os códigos dos meses o 
      *   de novembro(início) é maior que o de janeiro(final) porém é uma data válida por serem em anos diferentes.
      */
      // *ERRO*: Montar página ou meio visual pelo qual o erro será mostrado.
      console.log('Data inválida: Mês de ínicio é após o mês de fim do período.');
    }
    else
    {
      // Meses diferentes
      if (this.datesInit.monthCode !== this.datesEnd.monthCode)
      {
        // Dias iguais
        if (this.datesInit.day == this.datesEnd.day)
        {
          quantifyTables = (this.datesEnd.monthCode - this.datesInit.monthCode) * amountDaysMonth;
        }
        else
        {
          // Dia de início maior que o dia final
          if (this.datesInit.day > this.datesEnd.day)
          {
            quantifyTables = amountDaysMonth - (this.datesInit.day - this.datesEnd.day);
          }
          else
          {
            // ELSE: Dia de início não é maior que o dia final
            quantifyTables = amountDaysMonth + (this.datesEnd.day - this.datesInit.day);
          }
        }
      }
      else
      {
        // ELSE: Meses iguais
        // Dias de início e fim iguais 
        if (this.datesInit.day == this.datesEnd.day) quantifyTables = 1;
        else
        {
          // ELSE: Dias não iguais
          // Dia de início maior que o dia de fim
          if (this.datesInit.day > this.datesEnd.day)
          {
            /**
             * *ERRO*: Não há a possibilide de haver um período em que no mesmo mês há o seu e início e fim, e o seu 
             * dia de início é MAIOR que seu dia de fim, exemplo:
             * - data de início: 
             *  mês: novembro, dia início: 10
             * - data de fim: 
             *  mês: novembro, dia fim: 09
             */
            console.log("Data inválida: O dia de início é maior que o dia de fim no mesmo mês.");
          }
          else
          {
            // ELSE: Dia de início não é maior que o dia de fim
            quantifyTables = this.datesEnd.day - this.datesInit.day;
          }
        }
      }
    }
    console.log(quantifyTables);
    return quantifyTables;
  }

  datesCompostion(initDay, initEnd){
    this.dayForShow = initDay <= 9 ? `0${initDay}` : `${initDay}`;
    this.monthForShow = initEnd <= 9 ? `0${initEnd}` : `${initEnd}`;
    const dateObj = new Date();
    return `${this.dayForShow}/${this.monthForShow}/${dateObj.getFullYear()}`;
  }

  structureTables(amountTables, amountDaysMonth, monthReference){
    this.contentTable = document.querySelector('.tablesInput');
    this.tableComponent = document.querySelector('.tableComponentInput');
    this.datesContentArray = [];

    for (let index = 0; index < amountTables; index++) {
      this.tableElement = document.createElement('table');
      this.contentTable.appendChild(this.tableElement);
      this.tableElement.setAttribute('border', '1px');
      this.tableElement.classList.add('tableComponentInput');
      this.tableElement.innerHTML = `<table border="1px">${this.tableComponent.innerHTML}</table>`;
    }

    this.contentDate = document.querySelectorAll('.celulaDate');

    this.incrementDay = this.datesInit.day;
    this.incrementMonth = this.datesInit.monthCode;

    this.contentDate.forEach((element, index) => {
      this.paraghElement = document.createElement('p');
      element.appendChild(this.paraghElement);
      this.paraghElement.classList.add('dateContainer');

      if (this.incrementDay <= amountDaysMonth)
      {
        this.paraghElement.innerText = this.datesCompostion(this.incrementDay, this.incrementMonth);
        this.datesContentArray[index] = this.datesCompostion(this.incrementDay, this.incrementMonth);
      }
      else
      {
        if (this.incrementDay > amountDaysMonth) {
          this.incrementDay *= 0;
          this.incrementDay += 1;
        }

        if (this.datesEnd.monthCode == monthReference + 1) {
          this.incrementMonth += 1;
          this.paraghElement.innerText = this.datesCompostion(this.incrementDay, this.datesEnd.monthCode);
          this.datesContentArray[index] = this.datesCompostion(this.incrementDay, this.incrementMonth);
        }
      }

      this.incrementDay++;
    });

    this.qtdTablesCreated = amountTables + 1;
    console.log(this.qtdTablesCreated)

    return this.qtdTablesCreated;
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
