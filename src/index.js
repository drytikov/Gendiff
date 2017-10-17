import fs from 'fs';
import _ from 'lodash';

export default (filePath1, filePath2) => {
  const file1 = JSON.parse(fs.readFileSync(filePath1, 'utf8'));
  const file2 = JSON.parse(fs.readFileSync(filePath2, 'utf8'));
  const uniqueItems = _.union(Object.keys(file1), Object.keys(file2));
  const result = uniqueItems.reduce((acc, key) => {
    if (file1[key] && !file2[key]) {
      return [...acc, `  - ${key}: ${file1[key]}`];
    }
    if (file2[key] && !file1[key]) {
      return [...acc, `  + ${key}: ${file2[key]}`];
    }
    if (file2[key] !== file1[key]) {
      return [...acc, `  + ${key}: ${file2[key]}`, `  - ${key}: ${file1[key]}`];
    }
    return [...acc, `    ${key}: ${file2[key]}`];
  }, []);
  return ['{', ...result, '}'].join('\n');
};
