// Controlled extension point. Phase 2 may query through backend services only.
export async function getSalesSummary(): Promise<{ implemented: false }> {
  return { implemented: false };
}
