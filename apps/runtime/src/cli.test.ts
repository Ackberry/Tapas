import { expect, it } from "vitest";
import { runCli, runCliForProcess } from "./cli.js";

it("defaults to healthcheck when no CLI command is provided", () => {
  expect(runCli(["node", "dist/cli.js"])).toEqual({
    ok: true,
    service: "tapas-runtime",
    command: "healthcheck",
    message: "tapas runtime: ALIVE",
  });
});

it("returns a failure result for an unsupported CLI command", () => {
  expect(runCli(["node", "dist/cli.js", "wrong-command"])).toEqual({
    ok: false,
    service: "tapas-runtime",
    command: "wrong-command",
    error: "Unsupported runtime command",
  });
});

it("returns JSON output and exit code 0 for healthcheck", () => {
  expect(runCliForProcess(["node", "dist/cli.js"])).toEqual({
    output: JSON.stringify({
      ok: true,
      service: "tapas-runtime",
      command: "healthcheck",
      message: "tapas runtime: ALIVE",
    }),
    exitCode: 0,
  });
});

it("returns JSON output and exit code 1 for unsupported command", () => {
  expect(runCliForProcess(["node", "dist/cli.js", "wrong-command"])).toEqual({
    output: JSON.stringify({
      ok: false,
      service: "tapas-runtime",
      command: "wrong-command",
      error: "Unsupported runtime command",
    }),
    exitCode: 1,
  });
});
