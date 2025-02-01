import sForEach from "./index.js";
import { test } from "node:test";
import assert from "node:assert";
import { setTimeout } from "node:timers/promises";

test("sync forEach", async () => {
  const stream = ReadableStream.from([1, 2, 3]);
  const result = [];
  const forEach = sForEach((chunk) => result.push(chunk * 2));
  await stream.pipeTo(forEach);
  assert.deepEqual(result, [2, 4, 6]);
});

test("async forEach", async () => {
  const stream = ReadableStream.from([1, 2, 3]);
  const result = [];
  const forEach = sForEach(async (chunk) => result.push(chunk * 2));
  await stream.pipeTo(forEach);
  assert.deepEqual(result, [2, 4, 6]);
});

test("concurrency", async () => {
  const result = [];
  const forEach = sForEach(
    async (chunk) => {
      await setTimeout(100);
      result.push(chunk * 2);
    },
    { concurrency: 2 }
  );
  const timer = performance.now();
  await ReadableStream.from([1, 2]).pipeTo(forEach);
  assert.deepEqual(result, [2, 4]);
  assert.ok(performance.now() - timer < 200);
});

test.todo("concurrency limit");
