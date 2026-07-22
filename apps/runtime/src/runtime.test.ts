import { describe, expect, it } from "vitest";
import {
  isRuntimeCommand,
  runHealthcheck,
  runRuntime,
  RUNTIME_COMMANDS,
  unimplementedRuntimeCommand,
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

it("lists the supported runtime commands", () => {
  expect(RUNTIME_COMMANDS).toEqual(["healthcheck", "observe"]);
});

it("accepts healthcheck as a runtime command", () => {
  expect(isRuntimeCommand("healthcheck")).toBe(true);
});

it("accepts observe as a runtime command", () => {
  expect(isRuntimeCommand("observe")).toBe(true);
});

it("returns not implemented for observe", () => {
  expect(runRuntime({ command: "observe" })).toEqual({
    ok: false,
    service: "tapas-runtime",
    command: "observe",
    error: "Runtime command not implemented",
  });
});

it("rejects unknown runtime commands", () => {
  expect(isRuntimeCommand("wrong-command")).toBe(false);
});

it("returns healthcheck success result", () => {
  expect(runHealthcheck()).toEqual({
    ok: true,
    service: "tapas-runtime",
    command: "healthcheck",
    message: "tapas runtime: ALIVE",
  });
});

it("returns unimplemented failure for a valid command", () => {
  expect(unimplementedRuntimeCommand("observe")).toEqual({
    ok: false,
    service: "tapas-runtime",
    command: "observe",
    error: "Runtime command not implemented",
  });
});

it("returns a failure result for unsupported runtime command", () => {
  expect(unsupportedRuntimeCommand("wrong-command")).toEqual({
    ok: false,
    service: "tapas-runtime",
    command: "wrong-command",
    error: "Unsupported runtime command",
  });
});
