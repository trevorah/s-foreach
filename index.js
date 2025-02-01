import sCompose from "s-compose";
import pLimit from "p-limit";

export default function sForEach(fn, { concurrency = 1 } = {}) {
  const limit = pLimit(concurrency);

  return sCompose(
    new TransformStream(
      {
        async transform(chunk, controller) {
          const p = limit(() => fn(chunk));
          controller.enqueue(p);
        },
      },
      {},
      { highWaterMark: concurrency * 2 - 1 }
    ),
    new WritableStream({
      async write(chunk) {
        await chunk;
      },
    })
  );
}
