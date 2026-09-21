// AI foundation only — this service must not call an LLM or access the database directly.
export interface AiPlaceholderResponse {
  success: true;
  message: string;
}

export async function processQuestion(_question: string): Promise<AiPlaceholderResponse> {
  void _question;
  // Future orchestration will choose a controlled tool, then pass only its result to an AI provider.
  return { success: true, message: 'AI Restaurant Copilot is not implemented yet' };
}
