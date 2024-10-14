import { jsPDF } from 'jspdf';

// Default export is a4 paper, portrait, using millimeters for units
export const makeResumePdf = () => {
  const doc = new jsPDF();

  doc.text('Hello world!', 10, 10);
  doc.line(15, 19, 195, 19);
  doc.save('a4.pdf');
};
