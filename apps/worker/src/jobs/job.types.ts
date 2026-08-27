export interface JobContext {
  jobId: string;
  attempt: number;
}

export interface JobHandler<TInput = unknown, TOutput = void> {
  readonly name: string;
  handle(input: TInput, context: JobContext): Promise<TOutput>;
}
