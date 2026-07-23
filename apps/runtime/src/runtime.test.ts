import { describe, expect, it } from "vitest";
import {
  isRuntimeCommand,
  runHealthcheck,
  runObserve,
  runRuntime,
  RUNTIME_COMMANDS,
  unimplementedRuntimeCommand,
  unsupportedRuntimeCommand,
  emptyPageSnapshot,
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
  it("returns a successful observe result", () => {
    expect(runRuntime({ command: "observe" })).toEqual({
      ok: true,
      service: "tapas-runtime",
      command: "observe",
      page: {
        url: null,
        title: null,
      },
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

it("returns observe success result", () => {
  expect(runObserve()).toEqual({
    ok: true,
    service: "tapas-runtime",
    command: "observe",
    page: {
      url: null,
      title: null,
    },
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

it("returns an empty page snapshot", () => {
  expect(emptyPageSnapshot()).toEqual({
    url: null,
    title: null,
  });
});
