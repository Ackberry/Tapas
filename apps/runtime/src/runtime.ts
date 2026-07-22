export type RuntimeMode = "healthcheck";

export type RuntimeOptions = {
  mode: RuntimeMode;
};

export type RuntimeResult = {
  ok: boolean;
  service: "tapas-runtime";
  mode: RuntimeMode;
  message: string;
};

export function runRuntime(options: RuntimeOptions): RuntimeResult {
  return {
    ok: true,
    service: "tapas-runtime",
    mode: options.mode,
    message: "tapas runtime: ALIVE",
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const mode = getCliMode(process.argv);

  if (!isRuntimeMode(mode)) {
    console.log(
      JSON.stringify({
        // JSON.stringify converts a js object to json formatted string.
        ok: false,
        service: "tapas-runtime",
        mode,
        error: "Unsupported runtime mode",
      }),
    );
    process.exitCode = 1; // process.exitCode means let the program finish normally, but then report that it failed.
  } else {
    // 0 = success, 1 = failure.
    const result = runRuntime({ mode });
    console.log(JSON.stringify(result));
  }
}

export function isRuntimeMode(value: string): value is RuntimeMode {
  return value === "healthcheck";
}

export function getCliMode(argv: string[]): string {
  return argv[2] ?? "healthcheck";
}
