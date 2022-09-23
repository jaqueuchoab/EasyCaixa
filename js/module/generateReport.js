import Calc from './calc.js';

export default class GenerateReport {
  constructor(amountDays, contentDate) {
    this.amountDays = amountDays;
    this.contentDate = contentDate;
  }

  getValues() {
    const calc = new Calc('.card', '.received', '.credit', '.pix', '.expenses');
    const specificationsActivation = calc.specification;
    const valuesArray = calc.arrayOfValues(specificationsActivation);
    const sumArrayValues = calc.init();

    return [valuesArray, sumArrayValues];
  }

  createHeader(doc, img) {
    // Adicionando a imagem do cabeçalho do PDF
    doc.addImage(img, 'PNG', 39, 10);
    doc.setDrawColor(29, 101, 121)
    doc.setLineWidth(0.1);
    doc.line(68, 12, 68, 30);
    doc.setFontSize(12);
    doc.setTextColor(54,54,54);
    doc.text('Relatório mensal | Fechamento de caixa', 72, 17, {
      align: 'left',
    });
    doc.setFontSize(12);
    doc.setTextColor(54,54,54);
    doc.text('Atendente: Izabel Cristina Uchôa Gomes', 72, 22, {
      align: 'left', 
    });
    doc.setFontSize(12);
    doc.setTextColor(54,54,54);
    doc.text('Data de Fechamento: xx/xx/xx', 72, 27, {
      align: 'left', 
    });
  }

  generateTable(doc, contentValue, contentDate, amountDays) {
    this.contentValue = contentValue[0];
    this.contentValueSum = contentValue[1];

    for (let index = 0; index < amountDays; index++) {
      doc.autoTable({
        margin: { top: 40, right: 40, bottom: 10, left: 40 },
        headStyles: { fillColor: [29, 101, 121] },
        theme: 'grid',
        head: [['Especificação', 'Valor', 'Data']],
        body: [
          [
            'Cartão',
            { content: `R$ ${this.contentValue[0][index]}`},
            { content: contentDate[index], colSpan: 1, rowSpan: 5 },
          ],
          ['Recebidos', `R$ ${this.contentValue[1][index]}`],
          ['Crédito', `R$ ${this.contentValue[2][index]}`],
          ['Pix', `R$ ${this.contentValue[3][index]}`],
          ['Despesas', `R$ ${this.contentValue[4][index]}`],
        ],
        columnStyles: { 2: { halign: 'center', valign: 'middle' } },
        tableWidth: 120,
      });
    }
    doc.autoTable({
      margin: { top: 10, right: 40, bottom: 10, left: 40 },
      headStyles: { fillColor: [29, 101, 121] },
      theme: 'grid',
      head: [['Relação Final', 'Total']],
      body: [
        [
          'Cartão',
          { content: `R$ ${this.contentValueSum[0]}`},
        ],
        ['Recebidos', `R$ ${this.contentValueSum[1]}`],
        ['Crédito', `R$ ${this.contentValueSum[2]}`],
        ['Pix', `R$ ${this.contentValueSum[3]}`],
        ['Despesas', `R$ ${this.contentValueSum[4]}`],
      ],
      foot: [['Caixa Total', `R$ ${this.contentValueSum[5]}`]],
      columnStyles: { 2: { halign: 'center', valign: 'middle' } },
      tableWidth: 120,
    });
  }

  imageUrl() {
    const imageUrl = 'data:image/png;base64,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';
    return imageUrl;
  }

  createPDF() {
    // Cria a instância do PDF
    this.report = new jsPDF();
    // Criar header
    this.createHeader(this.report, this.imageUrl());
    // Corpo da tabela
    this.generateTable(this.report, this.getValues(), this.contentDate, this.amountDays);

    this.report.save('table.pdf');
  }
}
