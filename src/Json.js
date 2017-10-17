import fs from 'fs';

export default class {
  constructor(filePath1, filePath2) {
    this.file1 = JSON.parse(fs.readFileSync(filePath1, 'utf8'));
    this.file2 = JSON.parse(fs.readFileSync(filePath2, 'utf8'));
  }
}
