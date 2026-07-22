import { describe, expect, it } from "vitest";
import {
  isRuntimeCommand,
  runRuntime,
  unsupportedRuntimeCommand,
} from "./runtime.js";

describe("runRuntime", () => {
  it("returns a successful healthcheck result", () => {
    expect(runRuntime({ command: "healthcheck" })).toEqual({
      ok: true,
      service: "tapas-runtime",
      command: "healthcheck",
      message: "tapas runtime: ALIVE",
    });
  });
});

it("accepts healthcheck as a runtime command", () => {
  expect(isRuntimeCommand("healthcheck")).toBe(true);
});

it("rejects unknown runtime commands", () => {
  expect(isRuntimeCommand("wrong-command")).toBe(false);
});

it("returns a failure result for unsupported runtime command", () => {
  expect(unsupportedRuntimeCommand("wrong-command")).toEqual({
    ok: false,
    service: "tapas-runtime",
    command: "wrong-command",
    error: "Unsupported runtime command",
  });
});
