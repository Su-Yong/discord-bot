/* eslint-disable no-unused-vars */

import Language from '../../language'

const language = Language.getLocale();

export enum ParameterType {
  NUMBER = 0b1,
  STRING = 0b10,
  USER = 0b100,

  RAW = 0b1000,
}

export class ParameterTypeUtil {
  static toString (type: ParameterType): string {
    let result = [];

    if (type & ParameterType.NUMBER) result.push(language.format('type.number'))
    if (type & ParameterType.STRING) result.push(language.format('type.string'))
    if (type & ParameterType.USER) result.push(language.format('type.user'))
    if (type & ParameterType.RAW) result.push(language.format('type.raw'))

    return result.join(` ${language.format('or')} `);
  }
}

/* eslint-enable no-unused-vars */

export default ParameterType;
