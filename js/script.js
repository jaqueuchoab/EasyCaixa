import GetDates from './module/GetDates.js';
import CreateTables from './module/createTables.js';
import Calc from './module/calc.js';
import InsertValuesContainer from './module/insertValuesContainer.js';
import GenerateReport from './module/generateReport.js';

const getDates = new GetDates('#input-date-inicio', '#input-date-fim');

const sendDate = document.querySelector('#send-date');
sendDate.addEventListener('click', () => {
  document.querySelector('.tablesInput').classList.add('borderActive');
  document.querySelector('.informeInitial').classList.add('informeInitialNot');

  const createTables = new CreateTables(getDates.getDatesMethod());
  createTables.init();

  setInterval(() => {
    document.querySelector('.calcTotalButton ').classList.add('showButtonSum');
  }, 3000);

  const requireCalc = document.querySelector('#sum-values-button');
  requireCalc.addEventListener('click', () => {
    const calc = new Calc('.card', '.received', '.credit', '.pix', '.expenses', '.closed');

    const insertValues = new InsertValuesContainer(
      [
        '.cardResult',
        '.receivedResult',
        '.creditResult',
        '.pixResult',
        '.expensesResult',
        '.closedResult',
        '.totalResult',
      ],
      calc.init(),
    );
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
    const amountDays = createTables.tablesLength + 1;
    const datesArray = createTables.datesContentArray;

    const generateReport = new GenerateReport(amountDays, datesArray);
    generateReport.createPDF();
  });
});
