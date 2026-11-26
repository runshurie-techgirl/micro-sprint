import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Award, BriefcaseBusiness, Check, CheckCircle2, Clock3, Code2, Database, Globe2, ShieldCheck, UserRound, UsersRound, Wallet, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ApplicationModal } from "@/components/application-modal";
import { ReferenceVault } from "@/components/reference-vault";
import { SiteMenu, type MenuItemId } from "@/components/site-menu";
import { downloadCertificate } from "@/lib/certificate-pdf";
import { categories, filterSprints, type Application, type Category, type Sprint } from "@/lib/sprints";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Micro-Sprint | Turn hidden skills into verified local experience" },
    { name: "description", content: "Find short, paid micro-sprints, apply anonymously, and earn employer-verified local references. A privacy-first opportunity for skilled refugees and emerging tech talent." },
    { property: "og:title", content: "Micro-Sprint | Skills without borders" },
    { property: "og:description", content: "Turn hidden skills into verified local experience through short, paid projects and privacy-first matching." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

const categoryIcons = { Tech: Code2, Data: Database, Finance: Wallet, Operations: Globe2 };
const steps = [
  { icon: UserRound, title: "Match anonymously", description: "Lead with your skills, not your background. A unique Talent ID keeps your identity private." },
  { icon: BriefcaseBusiness, title: "Complete a paid sprint", description: "Put your expertise to work on a focused 1–2-week project for a local organization." },
  { icon: Award, title: "Earn a verified reference", description: "Get an employer-verified certificate and a trusted local reference for your next opportunity." },
];
type Popup = Exclude<MenuItemId, "home" | "download">;

function Index() {
  const [mode, setMode] = useState<"candidate" | "employer">("candidate");
  const [category, setCategory] = useState<Category>("All");
  const [selectedSprint, setSelectedSprint] = useState<Sprint | null>(null);
  const [reviewSprint, setReviewSprint] = useState<Sprint | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [shortlisted, setShortlisted] = useState<string[]>([]);
  const [popup, setPopup] = useState<Popup | null>(null);
  const [downloadError, setDownloadError] = useState("");
  const filtered = filterSprints(category);

  function selectMenu(id: MenuItemId) {
    setDownloadError("");
    if (id === "home") { setPopup(null); window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    if (id === "download") { try { downloadCertificate(); } catch { setDownloadError("The certificate couldn't be downloaded. Please try again."); } return; }
    setPopup(id);
  }
  const reviewApps = applications.filter(app => app.sprintId === reviewSprint?.id);

  return <>
    <header className="site-header"><div className="page-container h-full flex items-center justify-between gap-3">
      <a href="#" className="brand" aria-label="Micro-Sprint home"><Zap className="brand-mark" strokeWidth={2.4} fill="currentColor" /><span>Micro-Sprint</span></a>
      <div className="flex items-center gap-2">
        <div className="demo-pill"><span className="demo-label">Demo Mode</span><div className="mode-switch" role="group" aria-label="Demo Mode view">
          <Button variant={mode === "candidate" ? "mode" : "modeInactive"} aria-pressed={mode === "candidate"} onClick={() => setMode("candidate")}>Candidate</Button>
          <Button variant={mode === "employer" ? "mode" : "modeInactive"} aria-pressed={mode === "employer"} onClick={() => setMode("employer")}>Employer</Button>
        </div></div>
        <SiteMenu active={popup ?? "home"} onSelect={selectMenu} />
      </div>
    </div></header>
    {downloadError && <p role="alert" className="page-container text-sm text-destructive pt-2">{downloadError}</p>}
    <main>
      <section className="hero"><div className="page-container hero-content">
        <h1>Turn Hidden Skills into <span>Verified Local Experience.</span></h1>
        <p className="hero-copy">Privacy-first, 1-to-2-week paid micro-projects that help skilled refugees and tech talent earn verified local references—without exposing sensitive personal data.</p>
        <Button variant="hero" className="mt-5" asChild><a href="#live-sprints">Browse Micro-Sprints <ArrowRight size={17} /></a></Button>
      </div></section>
      <section id="live-sprints" className="section board-section"><div className="page-container">
        <h2 className="section-heading">{mode === "candidate" ? "Live Micro-Sprints" : "Your sprint board"}</h2>
        <p className="section-copy">{mode === "candidate" ? "Pick a sprint that fits your skills and apply anonymously." : "Review anonymous applicants. Skills first, personal details never."}</p>
        <div className="filter-row" role="group" aria-label="Sprint categories">{categories.map(cat => <Button key={cat} variant={category === cat ? "filterActive" : "filter"} aria-pressed={category === cat} onClick={() => setCategory(cat)}>{cat}</Button>)}</div>
        <div className="sprint-grid">{filtered.map(sprint => { const Icon = categoryIcons[sprint.category]; const applied = applications.some(a => a.sprintId === sprint.id); const count = applications.filter(a => a.sprintId === sprint.id).length; return <article className="sprint-card" key={sprint.id}>
          <div className="flex items-center justify-between gap-2"><span className="category-tag"><Icon size={12} />{sprint.category}</span>{mode === "employer" && <span className="text-xs text-muted-foreground">{count} applicant{count === 1 ? "" : "s"}</span>}</div>
          <h3>{sprint.title}</h3>
          <div className="sprint-meta"><span><Clock3 size={14} /> {sprint.days} Days</span><span><Wallet size={14} /> Paid Stipend</span></div>
          <Button className="mt-auto w-full" onClick={() => mode === "candidate" ? setSelectedSprint(sprint) : setReviewSprint(sprint)}>{mode === "employer" ? "View Anonymous Applicants" : applied ? "View application" : "Apply Anonymously"}{applied && mode === "candidate" ? <Check size={14} /> : <ArrowRight size={14} />}</Button>
        </article>; })}</div>
      </div></section>
    </main>

    {selectedSprint && <ApplicationModal key={selectedSprint.id} sprint={selectedSprint} existing={applications.find(a => a.sprintId === selectedSprint.id)} onClose={() => setSelectedSprint(null)} onSubmit={app => setApplications(prev => [...prev.filter(a => a.sprintId !== app.sprintId), app])} />}

    <Dialog open={Boolean(reviewSprint)} onOpenChange={open => { if (!open) setReviewSprint(null); }}><DialogContent className="application-dialog"><DialogHeader><DialogTitle>Anonymous applicants</DialogTitle><DialogDescription>{reviewSprint?.title}</DialogDescription></DialogHeader>
      <div className="privacy-badge"><ShieldCheck className="shrink-0" size={21} /> Talent IDs, skills and years of experience only. No names or photos.</div>
      {reviewApps.length === 0 ? <div className="py-6 text-center"><UsersRound className="mx-auto text-muted-foreground mb-3" size={32} /><h3 className="font-semibold">No applications yet</h3><Button variant="outline" className="mt-4" onClick={() => { setReviewSprint(null); setMode("candidate"); }}>Switch to Candidate <ArrowRight /></Button></div>
      : reviewApps.map(app => <div key={app.talentId} className="space-y-3 rounded-xl border border-border p-4"><h3 className="font-bold text-lg">{app.talentId}</h3><p className="text-sm text-muted-foreground">{app.skills.join(" · ")} · {app.experience}</p><Button className="w-full" disabled={shortlisted.includes(app.talentId)} onClick={() => setShortlisted(prev => [...prev, app.talentId])}>{shortlisted.includes(app.talentId) ? <><CheckCircle2 /> Shortlisted</> : <>Shortlist talent <ArrowRight /></>}</Button></div>)}
    </DialogContent></Dialog>

    <Dialog open={popup !== null} onOpenChange={open => { if (!open) setPopup(null); }}><DialogContent className="application-dialog">
      {popup === "how" && <><DialogHeader><DialogTitle>How It Works</DialogTitle><DialogDescription>Three steps from overlooked to on the record.</DialogDescription></DialogHeader><div className="steps">{steps.map((s, i) => <article className="step-card" key={s.title}><span className="step-number">0{i + 1}</span><span className="step-icon"><s.icon size={22} /></span><h3>{s.title}</h3><p>{s.description}</p></article>)}</div></>}
      {popup === "vault" && <><DialogHeader><DialogTitle>Reference Vault</DialogTitle><DialogDescription>Every completed sprint becomes a verified local reference.</DialogDescription></DialogHeader><ReferenceVault mode={mode} /></>}
      {popup === "privacy" && <><DialogHeader><DialogTitle>Privacy Shield</DialogTitle><DialogDescription>How your identity stays protected.</DialogDescription></DialogHeader><div className="privacy-badge"><ShieldCheck size={23} className="shrink-0" /><strong>Zero personal names, photos, or legal documents shared</strong></div><p className="text-base text-muted-foreground">Employers only see your Talent ID, selected skills and years of experience.</p></>}
      {popup === "sdg" && <><DialogHeader><DialogTitle>UN Sustainable Development Goals</DialogTitle><DialogDescription>Micro-Sprint is aligned with three goals.</DialogDescription></DialogHeader><ul className="space-y-3 text-base">{[["8", "Decent Work", "Every sprint is paid and builds real, verifiable experience."], ["10", "Reduced Inequalities", "Anonymous matching removes bias against refugees and newcomers."], ["17", "Partnerships", "Local employers, NGOs and talent work together on real projects."]].map(([n, t, d]) => <li key={n} className="flex gap-3"><b className="sdg-number">{n}</b><span><strong>{t}</strong><br /><span className="text-muted-foreground">{d}</span></span></li>)}</ul></>}
    </DialogContent></Dialog>
  </>;
}
