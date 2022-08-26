export default class CreateTables {
  constructor(date) {
    this.datesArray = date;
    this.datesInit = this.datesArray[0];
    this.datesEnd = this.datesArray[1];
  }
  
  fetchMonth(url) {
    fetch(url).then(async response => response.json()).then(response => {
      this.arrayData = response.map(element => {
        return Object.entries(element);
      });
      this.monthAndAmountDays = this.arrayData.map((element) => {
        if (element[2][1] == this.datesInit[1]) {
          this.monthInit = element[0][1];
          this.amountDays = element[1][1];
          
          this.tablesLength = this.lengthTables(this.amountDays);
          this.creatingTables(this.tablesLength, this.amountDays);
          return this.tablesLength;
        }
      });
    });
  }

  lengthTables(monthInitIndex) {
    if (this.datesInit[1] > this.datesEnd[1])
    {
      //indicar invalido
      console.log("aaaaaaa");
    }
    else
    {
      if (this.datesInit[1] !== this.datesEnd[1])
      {
        if (this.datesInit[0] == this.datesEnd[0])
        {
          this.quantDays = (this.datesEnd[1] - this.datesInit[1]) * monthInitIndex;
        }
        else
        {
          if (this.datesInit[0] > this.datesEnd[0])
          {
            this.quantDays = monthInitIndex - (this.datesInit[0] - this.datesEnd[0]) + 1;
          }
          else
          {
            this.quantDays = monthInitIndex + (this.datesEnd[0] - this.datesInit[0]);
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
              this.quantDays = this.datesEnd[0] - this.datesInit[0] + 1;
            }
          }
        }
      }
    }
    this.quantDays -= 1
    return this.quantDays;
  }

  datesCompostion(initDay, initEnd){
    this.dayForShow = initDay <= 9 ? `0${initDay}` : `${initDay}`;
    this.monthForShow = initEnd <= 9 ? `0${initEnd}` : `${initEnd}`;
    const dateObj = new Date();
    return `${this.dayForShow}/${this.monthForShow}/${dateObj.getFullYear()}`;
  }

  creatingTables(amountDays, amountDaysMonth){
    this.contentTable = document.querySelector('.tablesInput');
    this.tableComponent = document.querySelector('.tableComponentInput');

    for (let index = 0; index < amountDays; index++) {
      this.tableElement = document.createElement('table');
      this.contentTable.appendChild(this.tableElement);
      this.tableElement.setAttribute('border', '1px');
      this.tableElement.classList.add('tableComponentInput');
      this.tableElement.innerHTML = `<table border="1px">${this.tableComponent.innerHTML}</table>`;
    }

    this.contentDate = document.querySelectorAll('.celulaDate');
    this.contentDate.forEach(element => {
      this.paraghElement = document.createElement('p');
      element.appendChild(this.paraghElement);
      this.paraghElement.classList.add('dateContainer');

      if (this.datesInit[0] <= amountDaysMonth)
      {
        this.paraghElement.innerText = this.datesCompostion(this.datesInit[0], this.datesInit[1]);
      }
      else
      {
        this.paraghElement.innerText = this.datesCompostion(this.datesInit[0], this.datesInit[1]);
      }

      this.datesInit[0]++;
    });
  }

  init() {
    this.fetchMonth('../quantMeses.json');
    return this;
  }
}
