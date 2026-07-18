import { describe, expect, it } from "vitest";
import { runRuntime } from "./runtime.js";

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
