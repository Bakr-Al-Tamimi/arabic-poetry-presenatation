import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Paragraph, TextRun, AlignmentType, Packer, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';

export interface PoemData {
  title: string;
  poetName: string;
  poetInfo: string;
  beits: string[][];
  comments: string;
}

export const exportToPDF = async (elementId: string, filename: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const imgWidth = 210;
  const pageHeight = 297;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(filename);
};

export const exportToWord = async (poemData: PoemData, filename: string) => {
  const { title, poetName, poetInfo, beits, comments } = poemData;

  const children: Paragraph[] = [];

  // Title
  children.push(
    new Paragraph({
      text: title,
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.RIGHT,
      spacing: { after: 200 },
      bidirectional: true,
    })
  );

  // Poet Info
  if (poetName) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'الشاعر: ',
            bold: true,
          }),
          new TextRun({
            text: poetName,
          }),
        ],
        alignment: AlignmentType.RIGHT,
        spacing: { after: 100 },
        bidirectional: true,
      })
    );
  }

  if (poetInfo) {
    children.push(
      new Paragraph({
        text: poetInfo,
        alignment: AlignmentType.RIGHT,
        spacing: { after: 400 },
        bidirectional: true,
      })
    );
  }

  // Poem beits
  beits.forEach(([frontVerse, backVerse]) => {
    children.push(
      new Paragraph({
        text: `${frontVerse}\t\t${backVerse}`,
        alignment: AlignmentType.RIGHT,
        spacing: { after: 200 },
        bidirectional: true,
      })
    );
  });

  // Comments section
  if (comments) {
    children.push(
      new Paragraph({
        text: '',
        spacing: { before: 400, after: 200 },
      })
    );

    children.push(
      new Paragraph({
        text: 'التعليقات والمفردات',
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.RIGHT,
        spacing: { after: 200 },
        bidirectional: true,
      })
    );

    children.push(
      new Paragraph({
        text: comments,
        alignment: AlignmentType.RIGHT,
        bidirectional: true,
      })
    );
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440,
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, filename);
};

export const printPoem = () => {
  window.print();
};
