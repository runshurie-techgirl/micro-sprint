import { jsPDF } from "jspdf";

export const certificateFilename = "Micro-Sprint-Verified-Certificate.pdf";
type RGB = [number, number, number];
export type CertificatePalette = { primary: RGB; foreground: RGB; muted: RGB; border: RGB };

export function createCertificatePdf(palette: CertificatePalette) {
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  pdf.setProperties({ title: "Micro-Sprint Verified Local Experience Certificate", author: "Micro-Sprint", subject: "Sample anonymous employer-verified local experience certificate" });
  pdf.setDrawColor(...palette.border);
  pdf.setLineWidth(0.4);
  pdf.rect(16, 20, 178, 248);
  pdf.rect(22, 26, 166, 236);
  pdf.setFillColor(...palette.primary);
  pdf.rect(16, 20, 178, 2, "F");
  function text(value: string, y: number, size: number, bold = false, color: RGB = palette.foreground) {
    pdf.setFont("helvetica", bold ? "bold" : "normal");
    pdf.setFontSize(size);
    pdf.setTextColor(...color);
    pdf.text(value, 105, y, { align: "center" });
  }
  text("Micro-Sprint", 48, 18, true, palette.primary);
  pdf.setDrawColor(...palette.primary);
  pdf.setLineWidth(0.7);
  pdf.circle(105, 70, 8);
  pdf.line(100, 76, 98, 86);
  pdf.line(98, 86, 105, 82);
  pdf.line(105, 82, 112, 86);
  pdf.line(112, 86, 110, 76);
  text("Verified Local", 106, 25, true);
  text("Experience Certificate", 118, 25, true);
  text("This certifies that", 138, 11, false, palette.muted);
  text("Talent #KE-409", 151, 22, true);
  text("successfully completed", 166, 11, false, palette.muted);
  text("Frontend Bug Fix & Mobile Polish", 179, 14, true);
  text("for Nairobi Tech Collective", 190, 11, false, palette.muted);
  pdf.setDrawColor(...palette.border);
  pdf.line(32, 204, 178, 204);
  const columns = [
    { x: 34, label: "Duration", value: "7-day paid sprint" },
    { x: 79, label: "Skills verified", value: "React / CSS / UI testing" },
    { x: 137, label: "Reference ID", value: "MS-2026-0409" },
  ];
  for (const column of columns) {
    pdf.setFont("helvetica", "normal"); pdf.setFontSize(9); pdf.setTextColor(...palette.muted);
    pdf.text(column.label, column.x, 216);
    pdf.setFont("helvetica", "bold"); pdf.setFontSize(8); pdf.setTextColor(...palette.foreground);
    pdf.text(column.value, column.x, 225);
  }
  text("Employer-verified. Privacy-protected.", 246, 10, true, palette.primary);
  text("SAMPLE CERTIFICATE - ANONYMOUS DEMO", 278, 9, false, palette.muted);
  return pdf;
}

export function readCertificatePalette(): CertificatePalette {
  const styles = getComputedStyle(document.documentElement);
  const canvas = document.createElement("canvas");
  canvas.width = 1; canvas.height = 1;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Unable to prepare certificate colors.");
  function color(token: string): RGB {
    if (!context) throw new Error("Unable to prepare certificate colors.");
    context.clearRect(0, 0, 1, 1);
    context.fillStyle = styles.getPropertyValue(token).trim();
    context.fillRect(0, 0, 1, 1);
    const pixels = context.getImageData(0, 0, 1, 1).data;
    return [pixels[0] ?? 0, pixels[1] ?? 0, pixels[2] ?? 0];
  }
  return { primary: color("--primary"), foreground: color("--foreground"), muted: color("--muted-foreground"), border: color("--border") };
}

export function downloadCertificate() {
  const blob = createCertificatePdf(readCertificatePalette()).output("blob");
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url; link.download = certificateFilename;
  document.body.appendChild(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30_000);
}