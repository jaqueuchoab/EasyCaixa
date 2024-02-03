export default class CreateTables {
  constructor(date) {
    this._datesObject = date;
    this._datesInit = this._datesObject.dateInitPeriod;
    this._datesEnd = this._datesObject.dateEndPeriod;
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

  /**
   * pt-BR: lengthTables realiza os devidos calculos para definir a quantidade de tabelas que são necessárias.
   * 
   * en-US: lengthTables performs the necessary calculations to define the number of tables that are needed.
   * 
   * @param {Object} dateInitDetails 
   */
  lengthTables(dateInitDetails) {
    let quantifyTables = 0;
    // Erros
    // O mês de fim vem antes do mês de início, data inválida
    if (this._datesInit.monthCode > this._datesEnd.monthCode && this._datesInit.year == this._datesEnd.year){
      // *ERRO*: Montar página ou meio visual pelo qual o erro será mostrado.
      console.log('Data inválida: Mês de ínicio é após o mês de fim do período.');
      return "ERRO";
    }

    // Dia de início não é maior que o dia de fim
    if (this._datesInit.day > this._datesEnd.day && this._datesInit.monthCode == this._datesEnd.monthCode) {
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
    if (this._datesInit.monthCode !== this._datesEnd.monthCode) {
      // Dias iguais
      if (this._datesInit.day == this._datesEnd.day) {
        return quantifyTables = (this._datesEnd.monthCode - this._datesInit.monthCode) * dateInitDetails.days;
      }
      else {
        // Dia de início maior que o dia final
        if (this._datesInit.day > this._datesEnd.day) {
          return quantifyTables = dateInitDetails.days - ((this._datesInit.day - 1) - this._datesEnd.day);
        }
        else {
          // ELSE: Dia de início não é maior que o dia final
          return quantifyTables = dateInitDetails.days + ((this._datesEnd.day + 1) - this._datesInit.day);
        }
      }
    }

    // Meses iguais
    if (this._datesInit.day == this._datesEnd.day) return quantifyTables = 1;
    else {
      // ELSE: Dias não iguais
      // Dia de início maior que o dia de fim no mesmo mês
      console.log(this._datesEnd.day - (this.datesInit.day - 1));
      return quantifyTables = this._datesEnd.day - (this.datesInit.day - 1);
    }
  }

  /**
   * pt-BR: datesComposition formata as datas a serem mostradas nas celulas de data.
   * 
   * en-US: datesComposition formats the dates to be displayed in the date cells.
   * 
   * @param {Number} initDay 
   * @param {Number} endDay 
   * @param {Number} year 
   * @returns {String}
   */
  datesCompostion(initDay, endDay, year){
    const dayForShow = initDay <= 9 ? `0${initDay}` : `${initDay}`;
    const monthForShow = endDay <= 9 ? `0${endDay}` : `${endDay}`;
    return `${dayForShow}/${monthForShow}`;
  }

  /**
   * pt-BR: structureTables cria as tabelas necessárias para a inserção de dados
   * espelhando-se em uma estrutura inserida no index.html.
   * 
   * en-US: structureTables creates the tables necessary for data insertion
   * mirroring a structure inserted in index.html.
   * 
   * @param {Number} amountTables 
   * @param {Number} dateInitDays 
   * @param {Number} dateInitMonth 
   * @returns
   */
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

  /**
   * pt-BR: insertDateContent realiza principalmente a inserção das datas de cada dia e também cuida da formatação 
   * dessas datas de forma dinâmica seguindo a data limite informada pelo usuário.
   * 
   * en-US: insertDateContent mainly inserts the dates for each day and also takes care of formatting these dates  
   * dynamically following the deadline entered by the user.
   * 
   * @param {Number} dateInitDays 
   * @param {Number} dateInitMonth 
   */
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

        if (this._datesEnd.monthCode == dateInitMonth + 1) {
          incrementMonth += 1;
          this.paraghElement.innerText = this.datesCompostion(incrementDay, this._datesEnd.monthCode);
          this.datescontainerArray[index] = this.datesCompostion(incrementDay, incrementMonth);
        }
      }

      incrementDay++;
    });
  }

  /**
   * pt-BR: fetchDetailsDateReference usando um arquivo json com informações sobre os meses do ano, traz informações 
   * detalhadas de cada mês como dia, e nome do mês. A partir da comparação de um codigo em referência ao mês de 
   * inicio o documento é percorrido e assim os detalhes são retornados.
   * 
   * en-US: fetchDetailsDateReference using a json file with information about the months of the year, brings 
   * detailed information for each month such as day, and name of the month. By comparing a code with reference to 
   * the starting month, the document is scanned and the details are returned.
   * 
   * @param {Number} dateInitDays 
   * @param {Number} dateInitMonth 
   */
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
