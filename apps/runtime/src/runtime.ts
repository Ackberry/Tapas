export const RUNTIME_COMMANDS = ["healthcheck", "observe"] as const;
export type RuntimeCommand = (typeof RUNTIME_COMMANDS)[number];

export type RuntimeOptions = {
  command: RuntimeCommand;
};

// Safe success and failure commands for the runtime
export type RuntimeSuccessResult = {
  ok: true;
  service: "tapas-runtime";
  command: RuntimeCommand;
  message: string;
};

export type RuntimeFailureResult = {
  ok: false;
  service: "tapas-runtime";
  command: string;
  error: string;
};

export type RuntimeResult = RuntimeSuccessResult | RuntimeFailureResult;

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

export function runRuntime(options: RuntimeOptions): RuntimeResult {
  if (options.command === "healthcheck") {
    return {
      ok: true,
      service: "tapas-runtime",
      command: options.command,
      message: "tapas runtime: ALIVE",
    };
  }
  return {
    ok: false,
    service: "tapas-runtime",
    command: options.command,
    error: "Runtime command not implemented",
  };
}

export function isRuntimeCommand(value: string): value is RuntimeCommand {
  return RUNTIME_COMMANDS.includes(value as RuntimeCommand);
}

export function getCliCommand(argv: string[]): string {
  return argv[2] ?? "healthcheck";
}
