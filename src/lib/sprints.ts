export const categories = ["All", "Tech", "Data", "Finance", "Operations"] as const;
export type Category = (typeof categories)[number];
export type Sprint = {
  id: string;
  title: string;
  category: Exclude<Category, "All">;
  days: number;
  company: string;
  description: string;
  skills: string[];
  plan: [string, string, string];
};
export const sprints: Sprint[] = [
  { id: "frontend", title: "Frontend Bug Fix & Mobile Polish", category: "Tech", days: 7, company: "Nairobi Tech Collective", description: "Make a community platform work beautifully on every screen. Fix UI bugs and improve the mobile experience.", skills: ["React", "TypeScript", "CSS", "UI testing"], plan: ["Audit the interface on mobile and desktop; document and prioritize reproducible bugs.", "Fix the agreed bugs and improve responsive layouts using your selected frontend skills.", "Test across devices and deliver a reviewed pull request with before-and-after evidence."] },
  { id: "data", title: "NGO Donor Excel Data Cleanup", category: "Data", days: 5, company: "Impact Bridge Kenya", description: "Turn a messy donor spreadsheet into reliable data. Clean, organize, and validate records for a local NGO.", skills: ["Excel", "Data cleaning", "Python", "Data validation"], plan: ["Review the donor dataset and agree on duplicate, formatting, and validation rules.", "Clean duplicate records and standardize fields using your selected data skills.", "Validate the cleaned dataset and deliver the spreadsheet with a clear cleanup report."] },
  { id: "finance", title: "Monthly Bookkeeping Reconciliation", category: "Finance", days: 7, company: "Greenway Social Enterprise", description: "Help a growing social enterprise close the month with confidence. Reconcile transactions and flag discrepancies.", skills: ["Bookkeeping", "Excel", "Reconciliation", "QuickBooks"], plan: ["Review the month’s ledger and bank statements; agree on reconciliation scope.", "Match transactions, investigate discrepancies, and prepare proposed adjustments.", "Deliver a reconciled ledger and exception report for the employer’s final approval."] },
  { id: "operations", title: "Bilingual Community Health Guide Localization", category: "Operations", days: 5, company: "Afya Community Network", description: "Make essential health information more accessible. Adapt a community guide into clear, culturally relevant language.", skills: ["Translation", "Swahili", "English", "Content editing"], plan: ["Review the source guide and agree on the target language, audience, and terminology.", "Translate and adapt the guide using your selected language and content skills.", "Proofread with a community reviewer and deliver a bilingual, publication-ready guide."] },
];
export function filterSprints(category: Category) { return category === "All" ? sprints : sprints.filter(s => s.category === category); }
export function createTalentId() { return `Talent #KE-${crypto.randomUUID().slice(0, 8).toUpperCase()}`; }
export const experienceLevels = ["0–1 years", "2–4 years", "5+ years"];
export function makeApplication(sprint: Sprint, skills: string[], experience: string) {
  if (!skills.length || !skills.every(skill => sprint.skills.includes(skill))) throw new Error("Select at least one relevant skill.");
  if (!experienceLevels.includes(experience)) throw new Error("Select your experience.");
  return { talentId: createTalentId(), sprintId: sprint.id, skills, experience, plan: sprint.plan };
}
export type Application = ReturnType<typeof makeApplication>;