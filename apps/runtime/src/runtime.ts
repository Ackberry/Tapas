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
  const result = runRuntime({ mode: "healthcheck" });
  console.log(JSON.stringify(result));
}
