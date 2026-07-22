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

export type CliExitResult = {
  output: string;
  exitCode: number;
};

export function runCliForProcess(argv: string[]): CliExitResult {
  const result = runCli(argv);

  return {
    output: JSON.stringify(result),
    exitCode: result.ok ? 0 : 1,
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = runCliForProcess(process.argv);
  console.log(result.output);
  process.exitCode = result.exitCode;
}
