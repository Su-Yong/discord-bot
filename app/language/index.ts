import { Language } from './language';

import * as en from './languages/en.json';
import * as ko from './languages/ko.json';
import { config } from '../config';

const list = [
  new Language('en', en),
  new Language('ko', ko)
];

let defaultLocale = config.locale;

export function setDefaultLocale (locale: string) {
  if (list.some((e) => e.locale === locale)) {
    defaultLocale = locale;
  } else throw new Error('cannot find language');
}

export function getLocale (locale: string = ''): Language {
  if (locale === '') locale = defaultLocale;
  console.log(locale);

  const result = list.filter((e) => e.locale === locale);
  if (result.length <= 0) throw new Error('cannot find language');

  return result[0];
}

export function getAll (): Language[] {
  return list;
}

export function existLocale (locale: string): boolean {
  return list.some((language: Language) => language.locale === locale);
}

export default {
  setDefaultLocale,
  getLocale,
  getAll,
  existLocale
};
