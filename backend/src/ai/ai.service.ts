// AI foundation only — DO NOT call an LLM here.
export const aiService = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async ask(_question: string): Promise<never> {
    throw new Error('AI not implemented in foundation phase');
  },
};
