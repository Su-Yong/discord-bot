import { Parameter } from './parameter';

function mergeParameter (parameters: string[]) {
  const result: string[] = [];
  let mergeMode = false;

  for (const parameter of parameters) {
    if (parameter === '') {
      mergeMode = !mergeMode;

      if (mergeMode) result.push(parameter)
      else result[result.length - 1] = result[result.length - 1].substring(1);
      continue;
    }

    if (mergeMode) result[result.length - 1] += ' ' + parameter;
    else result.push(parameter);
  }
  return result;
}

export function analyze (message: string): { name: string, parameters: Parameter[] } {
  let blocks = message.split(/\s+/g);
  blocks = blocks.flatMap(e => e.split(/"/g));
  blocks = mergeParameter(blocks);

  const name = blocks.shift() + '';
  const parameters = blocks.map((element) => new Parameter(element));

  console.log(name, parameters)
  return { name, parameters };
}

export default {
  analyze
};
