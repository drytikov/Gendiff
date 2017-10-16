import fs from 'fs';

export default (filePath1, filePath2) => {
  const file1 = JSON.parse(fs.readFileSync(filePath1, 'utf8'));
  const file2 = JSON.parse(fs.readFileSync(filePath2, 'utf8'));
  const newKeys = Object.keys(file2).reduce((acc, key) =>
    (file1[key] ? acc : [...acc, `  + ${key}: ${file2[key]}`]), []);
  const processedFile1 = Object.keys(file1).reduce((acc, key) => {
    if (file2[key]) {
      if (file2[key] === file1[key]) {
        return [...acc, `    ${key}: ${file2[key]}`];
      }
      return [...acc, `  + ${key}: ${file2[key]}`, `  - ${key}: ${file1[key]}`];
    }
    return [...acc, `  - ${key}: ${file1[key]}`];
  }, []);
  return ['{', ...processedFile1, ...newKeys, '}'].join('\n');
};
