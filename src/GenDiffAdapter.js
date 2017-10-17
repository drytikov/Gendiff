import _ from 'lodash';

export default class {
  constructor(adaptee) {
    this.adaptee = adaptee;
  }
  compareFiles() {
    const uniqueItems = _.union(Object.keys(this.adaptee.file1), Object.keys(this.adaptee.file2));
    const result = uniqueItems.reduce((acc, key) => {
      if (this.adaptee.file1[key] && !this.adaptee.file2[key]) {
        return [...acc, `  - ${key}: ${this.adaptee.file1[key]}`];
      }
      if (this.adaptee.file2[key] && !this.adaptee.file1[key]) {
        return [...acc, `  + ${key}: ${this.adaptee.file2[key]}`];
      }
      if (this.adaptee.file2[key] !== this.adaptee.file1[key]) {
        return [...acc, `  + ${key}: ${this.adaptee.file2[key]}`, `  - ${key}: ${this.adaptee.file1[key]}`];
      }
      return [...acc, `    ${key}: ${this.adaptee.file2[key]}`];
    }, []);
    return ['{', ...result, '}'].join('\n');
  }
}
