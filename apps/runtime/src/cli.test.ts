import { expect, it } from "vitest";
import { runCli } from "./cli.js";

it("no mode provided for CLI check", () => {
  expect(runCli(["node", "dist/cli.js"])).toEqual({
    ok: true,
    service: "tapas-runtime",
    mode: "healthcheck",
    message: "tapas runtime: ALIVE",
  });
});

it("returns a failure result for an unsupported CLI mode", () => {
  expect(runCli(["node", "dist/cli.js", "wrong-mode"])).toEqual({
    ok: false,
    service: "tapas-runtime",
    mode: "wrong-mode",
    error: "Unsupported runtime mode",
  });
});
