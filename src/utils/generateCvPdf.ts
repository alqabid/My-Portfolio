import { jsPDF } from 'jspdf';
import { PersonalInfo, ExperienceItem } from '../types';
import { RECRUITER_DATA } from '../data/portfolioData';

interface GenerateCvOptions {
  personalInfo: PersonalInfo;
  experience: ExperienceItem[];
}

export function generateCvPdf({ personalInfo, experience }: GenerateCvOptions): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 16;
  const contentWidth = pageWidth - marginX * 2;
  let y = 18;

  const ensureSpace = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 16) {
      doc.addPage();
      y = 18;
    }
  };

  const drawSectionHeading = (title: string) => {
    ensureSpace(14);
    y += 3;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(80, 80, 80);
    doc.text(title.toUpperCase(), marginX, y);
    y += 1.8;
    doc.setDrawColor(225, 225, 225);
    doc.setLineWidth(0.3);
    doc.line(marginX, y, pageWidth - marginX, y);
    y += 5;
  };

  const writeWrappedText = (
    text: string,
    fontSize: number,
    style: 'normal' | 'bold' = 'normal',
    color: [number, number, number] = [55, 55, 55],
    indent = 0,
    lineHeightFactor = 1.4
  ) => {
    doc.setFont('helvetica', style);
    doc.setFontSize(fontSize);
    doc.setTextColor(color[0], color[1], color[2]);
    const lines = doc.splitTextToSize(text, contentWidth - indent);
    const lineHeight = fontSize * 0.352778 * lineHeightFactor;

    for (const line of lines) {
      ensureSpace(lineHeight + 1);
      doc.text(line, marginX + indent, y);
      y += lineHeight;
    }
  };

  const cleanText = (str: string) =>
    str
      .replace(/[^\x20-\x7E\n\r\t–—·•&'"+/(),.:;|-]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

  // ================= HEADER =================
  const fullName = cleanText(personalInfo.name || RECRUITER_DATA.name);
  const headline = cleanText(personalInfo.titles || RECRUITER_DATA.title);
  const location = cleanText(personalInfo.location || RECRUITER_DATA.location);
  const phone = cleanText(personalInfo.phone || RECRUITER_DATA.phone);
  const whatsapp = cleanText(personalInfo.whatsappNumber || RECRUITER_DATA.whatsappNumber);
  const email = cleanText(personalInfo.email || RECRUITER_DATA.email);
  const portfolioUrl = cleanText(personalInfo.portfolioUrl || RECRUITER_DATA.portfolioUrl);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(17, 17, 17);
  doc.text(fullName, marginX, y);
  y += 6.5;

  writeWrappedText(headline, 9.5, 'bold', [70, 70, 70], 0, 1.35);
  y += 1.5;

  const contactLine1 = `${location}  |  Phone: ${phone}  |  WhatsApp: ${whatsapp}`;
  const contactLine2 = `Email: ${email}  |  Portfolio: ${portfolioUrl}`;
  writeWrappedText(contactLine1, 8.5, 'normal', [90, 90, 90], 0, 1.35);
  writeWrappedText(contactLine2, 8.5, 'normal', [90, 90, 90], 0, 1.35);

  y += 2;
  doc.setDrawColor(20, 20, 20);
  doc.setLineWidth(0.5);
  doc.line(marginX, y, pageWidth - marginX, y);
  y += 5;

  // ================= 01. PROFESSIONAL SUMMARY =================
  drawSectionHeading('01. Professional Summary');
  const summarySource = personalInfo.bio || RECRUITER_DATA.summary;
  const paragraphs = summarySource.split('\n\n').filter(Boolean);
  paragraphs.forEach((para, idx) => {
    writeWrappedText(cleanText(para), 9, 'normal', [50, 50, 50], 0, 1.42);
    if (idx < paragraphs.length - 1) y += 2;
  });

  // ================= 02. CORE COMPETENCIES =================
  drawSectionHeading('02. Core Technical & Creative Competencies');
  const skillGroups: { label: string; items: string[] }[] = [
    { label: 'Programming & Languages', items: RECRUITER_DATA.skills.programming },
    { label: 'Frontend Architecture', items: RECRUITER_DATA.skills.frontend },
    { label: 'Backend & Cloud APIs', items: RECRUITER_DATA.skills.backend_cloud },
    { label: 'AI, ML & Generative AI', items: [...RECRUITER_DATA.skills.ai_ml, ...RECRUITER_DATA.skills.genai] },
    { label: 'Graphic Design & UI/UX', items: RECRUITER_DATA.skills.design_uiux },
    { label: 'Augmented Reality & 3D', items: RECRUITER_DATA.skills.ar_creative }
  ];

  skillGroups.forEach((group) => {
    ensureSpace(8);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.8);
    doc.setTextColor(25, 25, 25);
    const labelText = `${group.label}: `;
    const labelWidth = doc.getTextWidth(labelText);

    const itemsText = cleanText(group.items.join(', '));
    const firstLineWidth = contentWidth - labelWidth;
    const wrappedAll = doc.splitTextToSize(labelText + itemsText, contentWidth);

    // Render label bold and items normal cleanly across wrapped lines
    if (wrappedAll.length === 1 && firstLineWidth > 10) {
      doc.text(labelText, marginX, y);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(65, 65, 65);
      doc.text(itemsText, marginX + labelWidth, y);
      y += 4.6;
    } else {
      doc.text(labelText, marginX, y);
      y += 4.1;
      writeWrappedText(itemsText, 8.6, 'normal', [65, 65, 65], 2, 1.35);
      y += 1.2;
    }
  });

  // ================= 03. SOFTWARE ENGINEERING PROJECTS =================
  drawSectionHeading('03. Software Engineering & Product Development Projects');
  RECRUITER_DATA.softwareProjects.forEach((proj) => {
    ensureSpace(18);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(17, 17, 17);
    doc.text(`${cleanText(proj.title)} — ${cleanText(proj.role)}`, marginX, y);
    y += 4.2;

    const subWithLink = proj.liveUrl
      ? `${cleanText(proj.subtitle)}  |  ${cleanText(proj.liveUrl)}`
      : cleanText(proj.subtitle);
    writeWrappedText(subWithLink, 8.5, 'normal', [100, 100, 100], 0, 1.3);
    y += 1;

    proj.highlights.forEach((hl) => {
      writeWrappedText(`- ${cleanText(hl)}`, 8.7, 'normal', [55, 55, 55], 2, 1.38);
      y += 0.6;
    });

    writeWrappedText(
      `Technologies: ${cleanText(proj.technologies.join(', '))}`,
      8.3,
      'bold',
      [85, 85, 85],
      2,
      1.3
    );
    y += 3.5;
  });

  // ================= 04. PROFESSIONAL EXPERIENCE =================
  drawSectionHeading('04. Professional & Career Experience');
  const expList =
    experience && experience.length > 0
      ? experience
      : RECRUITER_DATA.entrepreneurialAndCorporate;

  expList.forEach((item) => {
    ensureSpace(18);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(17, 17, 17);
    doc.text(cleanText(item.company), marginX, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 100, 100);
    const periodText = cleanText(item.period);
    const periodW = doc.getTextWidth(periodText);
    doc.text(periodText, pageWidth - marginX - periodW, y);
    y += 4.3;

    writeWrappedText(
      `${cleanText(item.role)}  |  ${cleanText(item.location)}`,
      8.8,
      'bold',
      [65, 65, 65],
      0,
      1.32
    );
    y += 1;

    (item.highlights || []).forEach((hl) => {
      writeWrappedText(`- ${cleanText(hl)}`, 8.6, 'normal', [55, 55, 55], 2, 1.38);
      y += 0.6;
    });

    y += 3;
  });

  // ================= 05. EDUCATION =================
  drawSectionHeading('05. Education');
  RECRUITER_DATA.education.forEach((edu) => {
    ensureSpace(16);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(17, 17, 17);
    doc.text(cleanText(edu.degree), marginX, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 100, 100);
    const periodW = doc.getTextWidth(cleanText(edu.period));
    doc.text(cleanText(edu.period), pageWidth - marginX - periodW, y);
    y += 4.3;

    writeWrappedText(
      `${cleanText(edu.institution)} — ${cleanText(edu.school)} (${cleanText(edu.location)})`,
      8.7,
      'normal',
      [75, 75, 75],
      0,
      1.35
    );
    if (edu.coursework && edu.coursework.length > 0) {
      y += 0.8;
      writeWrappedText(
        `Core Coursework: ${cleanText(edu.coursework.join(', '))}`,
        8.4,
        'normal',
        [90, 90, 90],
        0,
        1.35
      );
    }
    y += 3;
  });

  // ================= 06. EXPERTISE OVERVIEW =================
  drawSectionHeading('06. Professional Expertise Overview');
  writeWrappedText(
    cleanText(RECRUITER_DATA.expertiseOverview.join('  |  ')),
    8.7,
    'normal',
    [60, 60, 60],
    0,
    1.4
  );

  // Trigger clean browser download of genuine application/pdf
  doc.save('Abdul_Qabid_Siaka_CV.pdf');
}
