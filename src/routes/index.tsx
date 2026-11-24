import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDown, ArrowRight, Award, BadgeCheck, BriefcaseBusiness, Check, CheckCircle2, Clock3, Code2, Database, Globe2, HeartHandshake, Leaf, LockKeyhole, ShieldCheck, Sparkles, UserRound, UsersRound, Wallet, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ApplicationModal } from "@/components/application-modal";
import { ReferenceVault } from "@/components/reference-vault";
import { categories, filterSprints, type Application, type Category, type Sprint } from "@/lib/sprints";
import teamAsset from "@/assets/micro-sprint-team.asset.json";

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
function Index() {
  const [mode, setMode] = useState<"candidate" | "employer">("candidate");
  const [category, setCategory] = useState<Category>("All");
  const [selectedSprint, setSelectedSprint] = useState<Sprint | null>(null);
  const [reviewSprint, setReviewSprint] = useState<Sprint | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [shortlisted, setShortlisted] = useState<string[]>([]);
  const filtered = filterSprints(category);
  return <>
    <header className="site-header"><div className="page-container h-full flex items-center justify-between gap-4">
      <a href="#" className="brand" aria-label="Micro-Sprint home"><Zap className="brand-mark" strokeWidth={2.4} fill="currentColor" /><span>Micro<span className="text-primary">-</span>Sprint<span className="text-primary">.</span></span></a>
      <nav className="nav-links" aria-label="Main navigation"><a href="#how-it-works">How It Works</a><a href="#live-sprints">Live Sprints</a><a href="#reference-vault">Reference Vault</a></nav>
      <div><p className="demo-label flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-primary" /> Anonymous Demo Mode</p><div className="mode-switch" role="group" aria-label="Anonymous demo view"><Button variant={mode === "candidate" ? "mode" : "modeInactive"} aria-pressed={mode === "candidate"} onClick={() => setMode("candidate")}><UserRound /> Candidate</Button><Button variant={mode === "employer" ? "mode" : "modeInactive"} aria-pressed={mode === "employer"} onClick={() => setMode("employer")}><BriefcaseBusiness /> Employer</Button></div></div>
    </div></header>
    <main>
      <section className="hero"><img className="hero-photo" src={teamAsset.url} alt="A diverse team of professionals collaborating on a laptop in a coworking space" fetchPriority="high" /><div className="page-container hero-content">
        <div className="eyebrow"><Sparkles size={12} /> Big talent. Small sprints. Real opportunity.</div>
        <h1>Turn Hidden Skills into<br /><span>Verified Local</span><br /><span>Experience.</span></h1>
        <p className="hero-copy">Your skills deserve a starting point, not another barrier. Build local experience through 1–2-week paid projects, earn verified references, and keep your personal story private.</p>
        <div className="hero-actions"><Button variant="hero" asChild><a href="#live-sprints">{mode === "candidate" ? "Browse Micro-Sprints" : "Explore Your Sprint Board"}<ArrowRight size={17} /></a></Button><Button variant="heroLink" asChild><a href="#how-it-works">See how it works <ArrowDown size={15} /></a></Button></div>
        <p className="hero-trust"><ShieldCheck size={14} /> No names. No documents. Just your skills.</p>
        <div className="hero-float"><span className="step-icon"><BadgeCheck size={23} /></span><div><p className="text-xs font-bold">Skills without borders.</p><p className="text-[10px] text-muted-foreground mt-1">Potential, recognized. Experience, verified.</p></div></div>
      </div></section>
      <div className="trust-band"><div className="page-container"><div className="trust-item"><ShieldCheck size={17} className="text-primary" /> Privacy-first, always</div><div className="trust-item"><Wallet size={17} className="text-primary" /> Every sprint is paid</div><div className="trust-item"><BadgeCheck size={17} className="text-primary" /> Employer-verified references</div><div className="trust-item"><Globe2 size={17} className="text-primary" /> Opportunity without barriers</div></div></div>
      <section id="how-it-works" className="section"><div className="page-container"><div className="text-center"><div className="eyebrow">A small sprint. A meaningful first step.</div><h2 className="section-heading">From overlooked to on the record.</h2><p className="section-copy">Three simple steps to turn what you know into experience that counts.</p></div>
        <div className="steps">{[{ icon: UserRound, title: "Match anonymously", description: "Lead with your skills, not your background. A unique Talent ID keeps your identity private." }, { icon: BriefcaseBusiness, title: "Complete a paid sprint", description: "Put your expertise to work on a focused, one-week project for a local organization." }, { icon: Award, title: "Earn a verified reference", description: "Get an employer-verified certificate and a trusted local reference for your next opportunity." }].map((step,i) => <article className="step-card" key={step.title}><span className="step-number">0{i+1}</span><span className="step-icon"><step.icon size={24} strokeWidth={1.7} /></span><h3>{step.title}</h3><p>{step.description}</p></article>)}</div>
      </div></section>
      <section id="live-sprints" className="section board-section"><div className="page-container"><div className="section-top"><div><div className="eyebrow"><span className="size-1.5 rounded-full bg-primary" /> {mode === "candidate" ? "Open for opportunity" : "Employer workspace"}</div><h2 className="section-heading">{mode === "candidate" ? "Small projects. Real-world impact." : "Find the skills behind the Talent ID."}</h2><p className="section-copy">{mode === "candidate" ? "Find a sprint that fits your skills. Take the first step, anonymously." : "Review anonymous applicants for your projects. Skills first. Personal details never."}</p></div><span className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground shrink-0"><BriefcaseBusiness size={14} /> 4 live sprints</span></div>
        <div className="filter-row" role="group" aria-label="Sprint categories">{categories.map(cat => <Button key={cat} variant={category === cat ? "filterActive" : "filter"} aria-pressed={category === cat} onClick={() => setCategory(cat)}>{cat === "All" ? "All Sprints" : cat}{cat === "All" && <span className="opacity-70">4</span>}</Button>)}</div>
        <div className="sprint-grid">{filtered.map(sprint => { const Icon = categoryIcons[sprint.category]; const applied = applications.find(a => a.sprintId === sprint.id); const sprintApps = applications.filter(a => a.sprintId === sprint.id); return <article className="sprint-card" key={sprint.id}><div className="flex items-center justify-between"><span className="category-tag"><Icon size={12} />{sprint.category}</span><span className="text-[10px] text-muted-foreground flex items-center gap-1"><span className="size-1 rounded-full bg-primary" /> {mode === "candidate" ? "Accepting applications" : `${sprintApps.length} anonymous applicant${sprintApps.length === 1 ? "" : "s"}`}</span></div><h3>{sprint.title}</h3><p>{sprint.description}</p><div className="sprint-meta"><span><Clock3 size={13} /> {sprint.days} days</span><span><Wallet size={13} /> Paid stipend</span><span><Globe2 size={13} /> Remote</span></div><div className="sprint-bottom"><div className="company"><span className="company-logo">{sprint.category === "Finance" ? <Leaf size={15} /> : sprint.category === "Operations" ? <HeartHandshake size={15} /> : sprint.category === "Data" ? <UsersRound size={15} /> : <Code2 size={15} />}</span>{sprint.company}</div><Button size="sm" onClick={() => mode === "candidate" ? setSelectedSprint(sprint) : setReviewSprint(sprint)}>{mode === "employer" ? "Review applicants" : applied ? "View application" : "Apply Anonymously"}{applied && mode === "candidate" ? <Check size={13} /> : <ArrowRight size={13} />}</Button></div></article>; })}</div>
        <p className="text-center text-[11px] text-muted-foreground mt-6 flex justify-center items-center gap-1.5"><LockKeyhole size={12} /> {mode === "candidate" ? "Your identity stays private. Your skills do the talking." : "Demo workspace · Applications are available during this visit only."}</p>
      </div></section>
      <ReferenceVault />
    </main>
    <footer className="footer"><div className="page-container"><div className="footer-top"><div><a href="#" className="brand text-lg"><Zap size={25} className="text-emerald-bright" fill="currentColor" /> Micro-Sprint<span className="text-emerald-bright">.</span></a><p className="text-[11px] mt-2 opacity-65">Building a world where talent has a fair starting line.</p></div><div><p className="text-[9px] uppercase opacity-60 mb-3">Aligned with the UN Sustainable Development Goals</p><div className="sdg-list"><span><b className="sdg-number">8</b> Decent Work</span><span><b className="sdg-number">10</b> Reduced Inequalities</span><span><b className="sdg-number">17</b> Partnerships</span></div></div></div><div className="footer-bottom"><p>© 2026 Micro-Sprint. Opportunity without borders.</p><p className="flex items-center gap-1.5"><ShieldCheck size={11} /> Privacy by design. Dignity by default.</p></div></div></footer>
    {selectedSprint && <ApplicationModal key={selectedSprint.id} sprint={selectedSprint} existing={applications.find(a => a.sprintId === selectedSprint.id)} onClose={() => setSelectedSprint(null)} onSubmit={app => setApplications(prev => [...prev.filter(a => a.sprintId !== app.sprintId), app])} />}
    <Dialog open={Boolean(reviewSprint)} onOpenChange={open => { if (!open) setReviewSprint(null); }}><DialogContent className="application-dialog"><DialogHeader><DialogTitle>Anonymous applicants</DialogTitle><DialogDescription>{reviewSprint?.title}</DialogDescription></DialogHeader><div className="privacy-badge"><ShieldCheck className="shrink-0" size={21} /> Evaluate skills and experience, not names or personal documents.</div>{applications.filter(app => app.sprintId === reviewSprint?.id).length === 0 ? <div className="py-8 text-center"><UsersRound className="mx-auto text-muted-foreground mb-4" size={35} /><h3 className="font-semibold">No applications yet</h3><p className="text-sm text-muted-foreground mt-2">Applications for this sprint will appear here.</p><Button variant="outline" className="mt-5" onClick={() => { setReviewSprint(null); setMode("candidate"); }}>Switch to Candidate View <ArrowRight /></Button></div> : applications.filter(app => app.sprintId === reviewSprint?.id).map(app => <div key={app.talentId} className="space-y-4"><div><h3 className="font-bold text-xl">{app.talentId}</h3><p className="text-sm text-muted-foreground mt-2">{app.skills.join(" · ")} · {app.experience}</p></div><ol className="plan-list">{app.plan.map((step,i) => <li key={step}><span className="plan-number">{i+1}</span><span>{step}</span></li>)}</ol><Button className="w-full" disabled={shortlisted.includes(app.talentId)} onClick={() => setShortlisted(prev => [...prev,app.talentId])}>{shortlisted.includes(app.talentId) ? <><CheckCircle2 /> Shortlisted</> : <>Shortlist talent <ArrowRight /></>}</Button><p className="text-xs text-muted-foreground">Demo only. No employer notifications are sent.</p></div>)}</DialogContent></Dialog>
  </>;
}
