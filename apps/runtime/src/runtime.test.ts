import { describe, expect, it } from "vitest";
import { isRuntimeMode, runRuntime } from "./runtime.js";

describe("runRuntime", () => {
  it("returns a successful healthcheck result", () => {
    expect(runRuntime({ mode: "healthcheck" })).toEqual({
      ok: true,
      service: "tapas-runtime",
      mode: "healthcheck",
      message: "tapas runtime: ALIVE",
    });
  });
});

it("accepts healthcheck as a runtime mode", () => {
  expect(isRuntimeMode("healthcheck")).toBe(true);
});

it("rejects unknown runtime modes", () => {
  expect(isRuntimeMode("wrong-mode")).toBe(false);
});
