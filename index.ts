import { generateWithType } from "polyfact";
import * as t from "io-ts";

async function mapFunction(command: string, lib: Function) {
  const functionNamesList = Object.keys(lib).join(", ");

  const prompt = `I want to do this: ${command} with a library. 
    There are ${lib.length} functions in this library. 
    Here is the list of function names: ${functionNamesList}. 
    If you know which function to use, just answer with its name. 
    If you don't, or aren't sure, answer with the names of the functions you want to learn more about.
    `;

  const result = await generateWithType(
    prompt,
    t.type({ result: t.array(t.string) })
  );

  return result;
}

async function mapParams() {
  const result = await generateWithType(
    "Count from 1 to 5",
    t.type({ result: t.array(t.number) })
  );

  console.log(result);
}

async function saveMapping() {}

async function loadMapping() {}

async function runMapping() {}

async function wrapper(data: object, command: string, lib: Function) {
  const functionNames = await mapFunction(command, lib);

  console.log(functionNames);
  return;

  mapParams();
  saveMapping();
  loadMapping();
  runMapping();
}

export function wrap(lib: Function) {
  return (data: object, command: string) => wrapper(data, command, lib);
}
