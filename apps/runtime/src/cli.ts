import {
  getCliMode,
  isRuntimeMode,
  runRuntime,
  unsupportedRuntimeMode,
  type RuntimeResult,
} from "./runtime.js";

export function runCli(argv: string[]): RuntimeResult {
  const mode = getCliMode(argv);

  let result: RuntimeResult;
  if (isRuntimeMode(mode)) {
    result = runRuntime({ mode });
  } else {
    result = unsupportedRuntimeMode(mode);
  }

  return result;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = runCli(process.argv);
  console.log(JSON.stringify(result));

  if (!result.ok) {
    process.exitCode = 1;
  }
}
