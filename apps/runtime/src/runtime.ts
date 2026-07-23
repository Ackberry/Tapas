import {
  emptyPageSnapshot,
  type PageSnapshot,
  type PageSnapshotProvider,
} from "./pageSnapshot.js";

export const RUNTIME_COMMANDS = ["healthcheck", "observe"] as const;
export type RuntimeCommand = (typeof RUNTIME_COMMANDS)[number];

export type RuntimeOptions = {
  command: RuntimeCommand;
};

// Safe success and failure commands for the runtime
export type RuntimeHealthcheckResult = {
  ok: true;
  service: "tapas-runtime";
  command: "healthcheck";
  message: string;
};

export type RuntimeObserveResult = {
  ok: true;
  service: "tapas-runtime";
  command: "observe";
  page: PageSnapshot;
};

export type RuntimeFailureResult = {
  ok: false;
  service: "tapas-runtime";
  command: string;
  error: string;
};

export type RuntimeResult =
  RuntimeHealthcheckResult | RuntimeObserveResult | RuntimeFailureResult;

export function unsupportedRuntimeCommand(
  command: string,
): RuntimeFailureResult {
  return {
    ok: false,
    service: "tapas-runtime",
    command,
    error: "Unsupported runtime command",
  };
}

export function runHealthcheck(): RuntimeHealthcheckResult {
  return {
    ok: true,
    service: "tapas-runtime",
    command: "healthcheck",
    message: "tapas runtime: ALIVE",
  };
}

export function runObserve(
  page: PageSnapshot = emptyPageSnapshot(),
): RuntimeObserveResult {
  return {
    ok: true,
    service: "tapas-runtime",
    command: "observe",
    page,
  };
}

export function runObserveWithProvider(
  getSnapshot: PageSnapshotProvider,
): RuntimeObserveResult {
  return runObserve(getSnapshot());
}

export function unimplementedRuntimeCommand(
  command: RuntimeCommand,
): RuntimeFailureResult {
  return {
    ok: false,
    service: "tapas-runtime",
    command,
    error: "Runtime command not implemented",
  };
}

export function runRuntime(options: RuntimeOptions): RuntimeResult {
  if (options.command === "healthcheck") {
    return runHealthcheck();
  }

  if (options.command === "observe") {
    return runObserve();
  }
  return unimplementedRuntimeCommand(options.command);
}

export function isRuntimeCommand(value: string): value is RuntimeCommand {
  return RUNTIME_COMMANDS.includes(value as RuntimeCommand);
}

export function getCliCommand(argv: string[]): string {
  return argv[2] ?? "healthcheck";
}
