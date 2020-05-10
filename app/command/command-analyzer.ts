import { Parameter } from './parameter';

function mergeParameter (parameters: string[]) {
  const result: string[] = [];
  let mergeMode = false;

  for (const parameter of parameters) {
    if (parameter === '"') {
      mergeMode = !mergeMode;

      if (!mergeMode) result[result.length - 1] = result[result.length - 1].substring(1);
      continue;
    }

    if (mergeMode) result[result.length - 1] += ' ' + parameter;
    else result.push(parameter);
  }
  /*
  let mergeMode = false;

  const cache: string[][] = [];
  blocks.forEach((e, i) => {
    if (e === '') {
      mergeMode = !mergeMode;

      if (mergeMode) {
        cache.push([]);
      } else {
        cache[cache.length - 1].shift();
        result.splice(i - cache.flat().length - 1, 1, cache[cache.length - 1].join(' '));
        cache[cache.length - 1].unshift('');
      }
    }

    if (mergeMode) {
      cache[cache.length - 1].push(e);
      result.splice(i - cache.flat().length + 1, 1);
    }
  });
*/
  return result;
}

export function analyze (message: string): { name: string, parameters: Parameter[] } {
  let blocks = message.split(/\s/g);
  blocks = blocks.flatMap(e => e.split(/"/g));
  blocks = mergeParameter(blocks);

  const name = blocks.shift() + '';
  const parameters = blocks.map((element) => new Parameter(element));

  return { name, parameters };
}

export default {
  analyze
};
