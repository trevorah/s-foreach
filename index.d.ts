export default function sForEach<T>(
  fn: (value: T) => Promise<void> | void,
  options?: { concurrency?: number }
): WritableStream<T>;
