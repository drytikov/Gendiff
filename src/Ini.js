import fs from 'fs';
import ini from 'ini';

export default class {
  constructor(filePath1, filePath2) {
    this.file1 = ini.parse(fs.readFileSync(filePath1, 'utf8'));
    this.file2 = ini.parse(fs.readFileSync(filePath2, 'utf8'));
  }
}
