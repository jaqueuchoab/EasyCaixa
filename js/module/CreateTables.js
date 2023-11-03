export default class CreateTables {
  constructor(date) {
    this.datesObject = date;
    this.datesInit = this.datesObject.dateInitPeriod;
    this.datesEnd = this.datesObject.dateEndPeriod;
  }

  creatingTables(dateInitMonth, dateInitDetails) {
    if (dateInitMonth == dateInitDetails.month) {
      this.tablesLength = this.lengthTables(dateInitDetails.days);
      this.structureTables(this.tablesLength, dateInitDetails.days, this.dateInitDetails.month);
      return this.tablesLength;
    }
  }

  lengthTables(amountDaysMonth) {
    console.log(this.datesInit, this.datesEnd);
    if (this.datesInit[1] > this.datesEnd[1])
    {
      //indicar invalido - não tratado
      console.log("aaaaaaa");
    }
    else
    {
      if (this.datesInit[1] !== this.datesEnd[1])
      {
        if (this.datesInit[0] == this.datesEnd[0])
        {
          this.quantDays = (this.datesEnd[1] - this.datesInit[1]) * amountDaysMonth;
        }
        else
        {
          if (this.datesInit[0] > this.datesEnd[0])
          {
            this.quantDays = amountDaysMonth - (this.datesInit[0] - this.datesEnd[0]);
          }
          else
          {
            this.quantDays = amountDaysMonth + (this.datesEnd[0] - this.datesInit[0]);
          }
        }
      }
      else
      {
        if (this.datesInit[0] == this.datesEnd[0])
        {
          this.quantDays = 1;
        }
        else
        {
          if (this.datesInit[0] > this.datesEnd[0])
          {
            console.log("Data inválida!");
          }
          else
          {
            if (this.datesInit[1] == this.datesEnd[1]) {
              this.quantDays = this.datesEnd[0] - this.datesInit[0];
            }
          }
        }
      }
    }
    return this.quantDays;
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

    for (let index = 0; index < amountDaysMonth; index++) {
      this.tableElement = document.createElement('table');
      this.contentTable.appendChild(this.tableElement);
      this.tableElement.setAttribute('border', '1px');
      this.tableElement.classList.add('tableComponentInput');
      this.tableElement.innerHTML = `<table border="1px">${this.tableComponent.innerHTML}</table>`;
    }

    this.contentDate = document.querySelectorAll('.celulaDate');

    this.incrementDay = this.datesInit[0];
    this.incrementMonth = this.datesInit[1];

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

        if (this.datesEnd[1] == monthReference + 1) {
          this.incrementMonth += 1;
          this.paraghElement.innerText = this.datesCompostion(this.incrementDay, this.datesEnd[1]);
          this.datesContentArray[index] = this.datesCompostion(this.incrementDay, this.incrementMonth);
        }
      }

      this.incrementDay++;
    });

    this.qtdTablesCreated = amountDays + 1;
    console.log(this.qtdTablesCreated)

    return this.qtdTablesCreated;
  }
  
  fetchDetailsDateReference = async(url, monthCode) => {
    try {
      this.dateInitDetails = await fetch(url)
        .then(response => response.json())
        .then(response => response.filter(element => element.code === monthCode)[0]);

      this.creatingTables(this.datesInit.month, this.dateInitDetails);
    }
    catch(err) {
      console.log(err);
    }
  }

  initFetch() {
    this.fetchDetailsDateReference('../../months.json', this.datesInit.month);
  }
}
