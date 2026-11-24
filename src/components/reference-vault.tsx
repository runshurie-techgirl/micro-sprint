import { Award, BadgeCheck, Download, ShieldCheck, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { downloadCertificate } from "@/lib/certificate-pdf";

export function ReferenceVault() {
  const [downloadError, setDownloadError] = useState("");
  function handleDownload() {
    try { setDownloadError(""); downloadCertificate(); }
    catch { setDownloadError("The certificate couldn't be downloaded. Please try again."); }
  }
  return <section id="reference-vault" className="section"><div className="page-container vault-layout">
    <div><div className="eyebrow"><Award size={15} /> The Reference Vault</div><h2 className="section-heading">Not just work done.<br />Experience you can prove.</h2><p className="section-copy">Every completed sprint becomes a verified local reference.<br className="hidden lg:block" /> Take it to your next interview. Open your next door.</p>
      <div className="review"><div className="flex gap-1 text-gold" aria-label="5 out of 5 stars">{[1,2,3,4,5].map(star => <Star key={star} size={15} fill="currentColor" />)}</div><blockquote>“Exceptional attention to detail and clear communication. The mobile experience is noticeably better. We’d happily work with this talent again.”</blockquote><div className="flex items-center gap-2 text-xs font-semibold">Nairobi Tech Collective <BadgeCheck size={14} className="text-primary" /></div><p className="text-[11px] text-muted-foreground mt-1">Verified employer · Completed sprint</p></div>
      <Button variant="outline" className="mt-6 no-print" onClick={handleDownload}><Download /> Download Certificate</Button>
      {downloadError && <p role="alert" className="mt-2 text-sm text-destructive">{downloadError}</p>}
    </div>
    <div className="certificate" aria-label="Verified Local Experience Certificate"><div className="certificate-inner">
      <div className="flex items-center justify-center gap-1 text-sm font-bold"><Zap size={18} className="text-primary" fill="currentColor" /> Micro-Sprint</div>
      <div className="flex justify-center mt-5 text-primary"><Award size={39} strokeWidth={1.4} /></div>
      <h3 className="certificate-title">Verified Local<br />Experience Certificate</h3>
      <p className="text-[10px] text-muted-foreground mt-4">This certifies that</p><p className="text-xl font-bold mt-1">Talent #KE-409</p>
      <p className="text-[10px] text-muted-foreground mt-3">successfully completed</p><p className="text-xs font-semibold mt-2">Frontend Bug Fix & Mobile Polish</p>
      <p className="text-[10px] text-muted-foreground mt-2">for Nairobi Tech Collective</p>
      <div className="certificate-details"><div><span className="text-muted-foreground">Duration</span><p className="font-semibold mt-1">7-day paid sprint</p></div><div><span className="text-muted-foreground">Skills verified</span><p className="font-semibold mt-1">React · CSS · UI testing</p></div><div><span className="text-muted-foreground">Reference ID</span><p className="font-semibold mt-1">MS-2026-0409</p></div></div>
      <div className="flex justify-center items-center gap-1 mt-5 text-[10px] font-semibold text-primary"><ShieldCheck size={13} /> Employer-verified. Privacy-protected.</div>
    </div><p className="text-[9px] text-center text-muted-foreground mt-3">SAMPLE CERTIFICATE · ANONYMOUS DEMO</p></div>
  </div></section>;
}