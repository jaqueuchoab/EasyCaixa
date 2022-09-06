import GetDates from "./module/getDates.js";
import CreateTables from "./module/createTables.js";
import Calc from "./module/calc.js";
import InsertValuesContainer from "./module/insertValuesContainer.js";
import GenerateReport from "./module/generateReport.js";

const getDates = new GetDates('#inputDateInicio', '#inputDateFim');

const sendDate = document.querySelector('#sendDate');
sendDate.addEventListener('click', () => {
  document.querySelector('.tablesInput').classList.add('borderActive');
  document.querySelector('.firstTable').classList.add('show');
  document.querySelector('.informeInitial').classList.add('informeInitialNot');


  const createTables = new CreateTables(getDates.getDatesMethod());
  createTables.init();

  setInterval(() => {
    document.querySelector('.sumValues').classList.add('showButtonSum');
  }, 3000);
});

const requireCalc = document.querySelector('#sumValues');
requireCalc.addEventListener('click', () => {
  const calc = new Calc('.card', '.received', '.credit', '.pix', '.expenses');

  const insertValues = new InsertValuesContainer(['.cardResult', '.receivedResult', '.creditResult', '.pixResult', '.expensesResult', '.totalResult'], calc.init());
  insertValues.init();

  const recalc = document.querySelector('.recalc');
  const report = document.querySelector('.generateReport');
  recalc.classList.add('showButtonRecalc');
  report.classList.add('showButtonGenerate');

  recalc.addEventListener('click', () => {
  location.reload();
  });
});

const generateReportButton = document.querySelector('.generateReport');
generateReportButton.addEventListener('click', () => {
  const generateReport = new GenerateReport('.tablesInput');
  generateReport.createPDF();
});