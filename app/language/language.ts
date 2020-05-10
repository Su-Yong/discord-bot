export class Language {
  locale: string
  object: any

  constructor (locale: string, object: any) {
    this.locale = locale;
    this.object = object;
  }

  format (index: string, ...variables: string[]): string {
    const indexList = index.split('.');

    let result = this.object;
    indexList.forEach(i => {
      result = result[i];
    });

    if (variables) {
      variables.forEach(e => {
        result = result.replace(/%s/, e);
      });
    }

    if (!result) throw new Error(`cannot find ${index}`);
    else return result;
  }
}
