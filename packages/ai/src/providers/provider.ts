export interface AiCompletionRequest {
  prompt: string;
  system?: string;
  maxOutputTokens?: number;
}

export interface AiCompletionResult {
  text: string;
  inputTokens: number;
  outputTokens: number;
}

export interface AiProvider {
  readonly name: string;
  complete(request: AiCompletionRequest): Promise<AiCompletionResult>;
}
