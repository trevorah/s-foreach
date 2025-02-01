# s-foreach

`forEach` for web streams. Supports concurrency and can run in web and node.

## Install

```
npm install s-foreach
```

## Usage

```js
import sForEach from "s-foreach";

await ReadableStream.from([1, 2, 3]).pipeTo(
  sForEach(async (chunk) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    console.log("hello", chunk);
  })
);
// prints:
// hello 1
// hello 2
// hello 3
```

## API

```ts
function sForEach<T>(
  fn: (value: T) => Promise<void> | void,
  options?: { concurrency?: number }
): WritableStream<T>;
```

- `fn` - The function to run for each chunk.
- `options.concurrency` - The number of chunks to process concurrently.
