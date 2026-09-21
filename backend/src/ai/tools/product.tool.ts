// Controlled extension point. No database access in the foundation phase.
export async function getTopProducts(): Promise<{ implemented: false }> {
  return { implemented: false };
}
