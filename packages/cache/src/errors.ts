export async function safely<T>(
  operation: () => Promise<T>,
  fallback: T,
  onError?: (error: unknown) => void,
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    onError?.(error);

    return fallback;
  }
}
