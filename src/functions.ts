//todo:add unstable tag here

import { configs, cLib } from "./server.ts";
/* ============================================================== */
export function prepareToSendToC_Chars(value: string) {
  const encodedValue = new TextEncoder().encode(value);
  const valueBuffer = new Uint8Array(encodedValue).slice(
    0,
    encodedValue.length,
  );
  return valueBuffer;
}
/* ============================================================== */
export async function init(args: { model: string; configs: any }) {
  const modelBuffer = prepareToSendToC_Chars(args.model);
  const state = cLib.symbols.init(modelBuffer);
  return state;
}
/* ============================================================== */
export async function predict(args: { prompt: string }) {
  const promptBuffer = prepareToSendToC_Chars(args.prompt);
 const tmpMem = new Uint8Array(512);
  cLib.symbols.predict(promptBuffer, tmpMem);
  const res = new TextDecoder("utf-8").decode(tmpMem.buffer.slice(0, 512));
  return res;
} 
/* ============================================================== */
