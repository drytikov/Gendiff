import fs from 'fs';
import yaml from 'js-yaml';

export default class {
  constructor(filePath1, filePath2) {
    this.file1 = yaml.safeLoad(fs.readFileSync(filePath1, 'utf8'));
    this.file2 = yaml.safeLoad(fs.readFileSync(filePath2, 'utf8'));
  }
}
