import * as basic from './basic.json';
import { promises as fs } from 'fs';

export const config: any = basic;

export async function init () {
  const file = await fs.readFile(`${process.env.INIT_CWD}/.env`);
  const lines = file.toString().split('\n')

  for (const line of lines) {
    const [key, value] = line.split('=');
    const children = key.split('_');

    children.reduce((acc: any, current: string, index: Number) => {
      if (index === children.length - 1) acc[current.toLowerCase()] = value;
      else acc[current.toLowerCase()] = {};

      return acc[current.toLowerCase()]
    }, config);
  }
}

export default {
  init,
  config
};
