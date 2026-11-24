import { describe, expect, it } from "vitest";
import { certificateFilename, createCertificatePdf } from "@/lib/certificate-pdf";

describe("Certificate PDF", () => {
  it("generates a real one-page PDF with the requested download filename", () => {
    const pdf = createCertificatePdf({ primary: [5, 150, 105], foreground: [15, 23, 42], muted: [100, 116, 139], border: [226, 232, 240] });
    expect(certificateFilename).toBe("Micro-Sprint-Verified-Certificate.pdf");
    expect(pdf.output().startsWith("%PDF-")).toBe(true);
    expect(pdf.getNumberOfPages()).toBe(1);
    expect(pdf.output()).toContain("Talent #KE-409");
    expect(pdf.output()).toContain("MS-2026-0409");
  });
});