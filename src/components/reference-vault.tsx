import { Award, BadgeCheck, Download, MessageSquarePlus, ShieldCheck, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { downloadCertificate } from "@/lib/certificate-pdf";

export function ReferenceVault({ mode }: { mode: "candidate" | "employer" }) {
  const [note, setNote] = useState("");
  const [downloadError, setDownloadError] = useState("");
  function handleDownload() {
    try { setDownloadError(""); downloadCertificate(); }
    catch { setDownloadError("The certificate couldn't be downloaded. Please try again."); }
  }
  return <div className="vault-stack">
    <div className="review"><div className="flex gap-1 text-gold" aria-label="5 out of 5 stars">{[1,2,3,4,5].map(star => <Star key={star} size={15} fill="currentColor" />)}</div><blockquote>“Exceptional attention to detail and clear communication. The mobile experience is noticeably better. We’d happily work with this talent again.”</blockquote><div className="flex items-center gap-2 text-sm font-semibold">Nairobi Tech Collective <BadgeCheck size={14} className="text-primary" /></div></div>
    <div className="certificate" aria-label="Verified Local Experience Certificate"><div className="certificate-inner">
      <div className="flex items-center justify-center gap-1 text-sm font-bold"><Zap size={18} className="text-primary" fill="currentColor" /> Micro-Sprint</div>
      <div className="flex justify-center mt-3 text-primary"><Award size={34} strokeWidth={1.4} /></div>
      <h3 className="certificate-title">Verified Local Experience Certificate</h3>
      <p className="text-xs text-muted-foreground mt-3">This certifies that</p><p className="text-xl font-bold mt-1">Talent #KE-409</p>
      <p className="text-xs text-muted-foreground mt-2">successfully completed</p><p className="text-sm font-semibold mt-1">Frontend Bug Fix & Mobile Polish</p>
      <p className="text-xs text-muted-foreground mt-1">for Nairobi Tech Collective</p>
      <div className="flex justify-center items-center gap-1 mt-4 text-xs font-semibold text-primary"><ShieldCheck size={13} /> Employer-verified. Privacy-protected.</div>
    </div></div>
    {mode === "employer"
      ? <div className="flex flex-wrap gap-2"><Button onClick={() => setNote("Demo: certificate issued to Talent #KE-409. Nothing was sent.")}><Award /> Issue Certificate</Button><Button variant="outline" onClick={() => setNote("Demo: review saved for this visit only.")}><MessageSquarePlus /> Leave a Review</Button></div>
      : <Button variant="outline" onClick={handleDownload}><Download /> Download Certificate</Button>}
    {note && <p role="status" className="text-sm text-primary">{note}</p>}
    {downloadError && <p role="alert" className="text-sm text-destructive">{downloadError}</p>}
  </div>;
}
