import { describe, expect, it } from "vitest";
import { filterSprints, makeApplication, sprints } from "@/lib/sprints";
describe("Micro-Sprint rules", () => {
  it("offers the four requested paid sprint categories", () => { expect(sprints.map(s => s.category)).toEqual(["Tech", "Data", "Finance", "Operations"]); expect(filterSprints("All")).toHaveLength(4); });
  it("uses the specified 7, 5, 7 and 5-day sprint durations", () => { expect(sprints.map(s => s.days)).toEqual([7, 5, 7, 5]); });
  it("filters each category without returning unrelated tasks", () => { for (const category of ["Tech", "Data", "Finance", "Operations"] as const) { expect(filterSprints(category)).toHaveLength(1); expect(filterSprints(category).map(s => s.category)).toEqual([category]); } });
  it("generates an anonymous ID and a three-step plan without personal data", () => { const sprint = sprints[0]; if (!sprint) throw new Error("Missing sprint"); const app = makeApplication(sprint, ["React"], "4–6 years"); expect(app.talentId).toMatch(/^Talent #KE-[A-F0-9]{8}$/); expect(app.plan).toHaveLength(3); expect(app.plan).toEqual(sprint.plan); expect(Object.keys(app).sort()).toEqual(["experience", "plan", "skills", "sprintId", "talentId"]); });
  it("requires at least one relevant core skill", () => { const sprint = sprints[0]; if (!sprint) throw new Error("Missing sprint"); expect(() => makeApplication(sprint, [], "2–3 years")).toThrow(); expect(() => makeApplication(sprint, ["Bookkeeping"], "2–3 years")).toThrow(); });
  it("tailors each plan to its specific sprint", () => { expect(new Set(sprints.map(s => s.plan.join(" "))).size).toBe(4); });
});