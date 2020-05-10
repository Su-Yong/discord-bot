import { Parameter } from './parameter';

function mergeParameter (parameters: string[]) {
  const result: string[] = [];
  let mergeMode = false;

  for (const parameter of parameters) {
    if (mergeMode) {
      if (parameter === '') result[result.length - 1] = result[result.length - 1].substring(1)
      else result[result.length - 1] += ' ' + parameter;
    }
    else result.push(parameter);

    if (parameter === '') mergeMode = !mergeMode;
  }

  return result;
}

export function analyze (message: string): { name: string, parameters: Parameter[] } {
  let blocks = message.split(/"|\s+/g);
  blocks = mergeParameter(blocks);

  const name = blocks.shift() + '';
  const parameters = blocks.map((element) => new Parameter(element));

  return { name, parameters };
}

export default {
  analyze
};
