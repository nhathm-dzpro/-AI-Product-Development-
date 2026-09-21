// Controlled extension points. No profit or food-cost calculation in the foundation phase.
export async function getTopProfitableProducts(): Promise<{ implemented: false }> {
  return { implemented: false };
}

export async function getProfitSummary(): Promise<{ implemented: false }> {
  return { implemented: false };
}
