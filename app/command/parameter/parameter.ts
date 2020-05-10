/* eslint-disable no-unused-vars */

import ParameterType from './parameter-type';

import * as lodash from 'lodash';
import { User } from 'discord.js';

function defineType (value: any): ParameterType {
  if (!Number.isNaN(Number(value))) {
    return ParameterType.NUMBER;
  } else {
    if (value.match(/^<@![0-9]*>/)) {
      return ParameterType.USER;
    } else {
      return ParameterType.STRING;
    }
  }
}

function defineValue (value: any, type: ParameterType): any {
  switch (type) {
    case ParameterType.NUMBER:
      return Number(value) as Number;
    case ParameterType.STRING:
      return value as string;
    case ParameterType.USER:
      return null; // TODO: new User
  }
}

function extract (content: any): { value: any, type: ParameterType } {
  const type = defineType(content);
  const value = defineValue(content, type);

  return {
    value,
    type
  };
}

export class Parameter {
  public type: ParameterType;
  public value: any;

  constructor (variable: any) {
    const { type, value } = extract(variable);

    this.type = type;
    this.value = value;
  }
}

export default Parameter;
/* eslint-enable no-unused-vars */
