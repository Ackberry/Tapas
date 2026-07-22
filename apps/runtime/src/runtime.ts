export type RuntimeMode = "healthcheck";

export type RuntimeOptions = {
  mode: RuntimeMode;
};

// Safe success and failure modes for the runtime
export type RuntimeSuccessResult = {
  ok: true;
  service: "tapas-runtime";
  mode: RuntimeMode;
  message: string;
};

export type RuntimeFailureResult = {
  ok: false;
  service: "tapas-runtime";
  mode: string;
  error: string;
};

export type RuntimeResult = RuntimeSuccessResult | RuntimeFailureResult;

export function unsupportedRuntimeMode(mode: string): RuntimeFailureResult {
  return {
    ok: false,
    service: "tapas-runtime",
    mode,
    error: "Unsupported runtime mode",
  };
}

export function runRuntime(options: RuntimeOptions): RuntimeResult {
  return {
    ok: true,
    service: "tapas-runtime",
    mode: options.mode,
    message: "tapas runtime: ALIVE",
  };
}

export function isRuntimeMode(value: string): value is RuntimeMode {
  return value === "healthcheck";
}

export function getCliMode(argv: string[]): string {
  return argv[2] ?? "healthcheck";
}
