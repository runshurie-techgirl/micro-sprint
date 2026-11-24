import { useState } from "react";
import { ArrowRight, Check, CircleCheck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { makeApplication, type Application, type Sprint } from "@/lib/sprints";

export function ApplicationModal({ sprint, existing, onClose, onSubmit }: { sprint: Sprint; existing: Application | undefined; onClose: () => void; onSubmit: (application: Application) => void }) {
  const [skills, setSkills] = useState<string[]>([]);
  const [experience, setExperience] = useState("");
  const [application, setApplication] = useState<Application | undefined>(existing);
  const [error, setError] = useState("");
  function submit(event: React.FormEvent) {
    event.preventDefault();
    try { const result = makeApplication(sprint, skills, experience); setApplication(result); onSubmit(result); }
    catch (err) { setError(err instanceof Error ? err.message : "Please check your selections."); }
  }
  return <Dialog open onOpenChange={open => { if (!open) onClose(); }}>
    <DialogContent className="application-dialog">
      <DialogHeader>
        <div className="eyebrow mb-3"><ShieldCheck size={15} /> Privacy-first matching</div>
        <DialogTitle className="text-2xl leading-snug">{application ? "Your next chapter starts here." : "Let your skills introduce you."}</DialogTitle>
        <DialogDescription className="pt-2">{sprint.title} · {sprint.days} days · Paid stipend</DialogDescription>
      </DialogHeader>
      <div className="privacy-badge"><ShieldCheck size={23} className="shrink-0" /><div><strong>Protected by design</strong><br />Zero personal names, photos, or legal documents shared</div></div>
      {application ? <div className="space-y-5">
        <div className="rounded-md border border-border bg-muted p-4"><div className="flex items-center gap-2 text-primary text-xs font-semibold"><CircleCheck size={15} /> Anonymous application ready</div><h3 className="mt-2 text-xl font-bold">{application.talentId}</h3><p className="text-xs text-muted-foreground mt-2">{application.skills.join(" · ")} · {application.experience}</p></div>
        <div><h3 className="font-semibold mb-4">Your 3-step sprint plan</h3><ol className="plan-list">{application.plan.map((step, i) => <li key={step}><span className="plan-number">{i + 1}</span><span>{step}</span></li>)}</ol></div>
        <p className="text-xs text-muted-foreground">Demo application only. No information has been sent to an employer. You can review this application in Employer View.</p>
        <Button className="w-full" onClick={onClose}>Back to micro-sprints <ArrowRight /></Button>
      </div> : <form onSubmit={submit} className="space-y-5">
        <fieldset><legend className="form-label">Your core skills</legend><div className="flex flex-wrap gap-2">{sprint.skills.map(skill => <Button type="button" aria-pressed={skills.includes(skill)} key={skill} variant={skills.includes(skill) ? "filterActive" : "filter"} onClick={() => { setError(""); setSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]); }}>{skills.includes(skill) && <Check size={12} />}{skill}</Button>)}</div></fieldset>
        <div><label className="form-label" htmlFor="experience">Years of professional experience</label><select id="experience" className="experience-select" value={experience} onChange={event => { setExperience(event.target.value); setError(""); }} required><option value="" disabled>Select your experience</option>{["0–1 years", "2–3 years", "4–6 years", "7+ years"].map(value => <option key={value}>{value}</option>)}</select></div>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <Button type="submit" className="w-full h-11">Generate ID & sprint plan <ArrowRight /></Button>
        <p className="text-center text-xs text-muted-foreground">Your experience matters. Your personal details stay yours.</p>
      </form>}
    </DialogContent>
  </Dialog>;
}