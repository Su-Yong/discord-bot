import { Language } from './language';

import * as en from './languages/en.json';
import * as ko from './languages/ko.json';
import { config } from '../config';

const list = [
  new Language('en', en),
  new Language('ko', ko)
];

export function getLocale (locale: string = config.locale): Language {
  const result = list.filter((e) => e.locale === locale);

  if (result.length <= 0) throw new Error('cannot find language');

  return result[0];
}

export default {
  getLocale
};
