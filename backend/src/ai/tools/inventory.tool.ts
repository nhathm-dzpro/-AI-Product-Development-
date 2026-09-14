// Controlled extension point. No inventory calculation in the foundation phase.
export async function getLowStockIngredients(): Promise<{ implemented: false }> {
  return { implemented: false };
}
