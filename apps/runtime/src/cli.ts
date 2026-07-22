import {
  getCliCommand,
  isRuntimeCommand,
  runRuntime,
  unsupportedRuntimeCommand,
  type RuntimeResult,
} from "./runtime.js";

export function runCli(argv: string[]): RuntimeResult {
  const command = getCliCommand(argv);

  let result: RuntimeResult;
  if (isRuntimeCommand(command)) {
    result = runRuntime({ command });
  } else {
    result = unsupportedRuntimeCommand(command);
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
