import { expect, it } from "vitest";
import { runCli, runCliForProcess } from "./cli.js";

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

it("returns JSON output and exit code 0 for healthcheck", () => {
  expect(runCliForProcess(["node", "dist/cli.js"])).toEqual({
    output: JSON.stringify({
      ok: true,
      service: "tapas-runtime",
      mode: "healthcheck",
      message: "tapas runtime: ALIVE",
    }),
    exitCode: 0,
  });
});

it("returns JSON output and exit code 1 for unsupported mode", () => {
  expect(runCliForProcess(["node", "dist/cli.js", "wrong-mode"])).toEqual({
    output: JSON.stringify({
      ok: false,
      service: "tapas-runtime",
      mode: "wrong-mode",
      error: "Unsupported runtime mode",
    }),
    exitCode: 1,
  });
});
