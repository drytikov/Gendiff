import fs from 'fs';
import path from 'path';
import ini from 'ini';
import yaml from 'js-yaml';
import compareParsedData from '../src/compareParsedData';

export default (filePath1, filePath2) => {
  const parsersList = {
    json: data => JSON.parse(data),
    yml: data => yaml.safeLoad(data),
    ini: data => ini.parse(data),
  };
  const typeOfFiles = path.extname(filePath1).slice(1);
  const dataOfFile1 = fs.readFileSync(filePath1, 'utf8');
  const dataOfFile2 = fs.readFileSync(filePath2, 'utf8');
  const getParser = parsersList[typeOfFiles];
  const parsedDataOfFile1 = getParser(dataOfFile1);
  const parsedDataOfFile2 = getParser(dataOfFile2);
  const result = compareParsedData(parsedDataOfFile1, parsedDataOfFile2);
  return ['{', ...result, '}'].join('\n');
};
