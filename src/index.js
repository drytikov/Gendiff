import fs from 'fs';
import ini from 'ini';
import yaml from 'js-yaml';
import _ from 'lodash';
import compareParsedData from '../src/compareParsedData';

export default (filePath1, filePath2) => {
  const parsersList = [
    {
      parser: data => JSON.parse(data),
      check: arg => (arg.indexOf('json') + 1),
    },
    {
      parser: data => yaml.safeLoad(data),
      check: arg => (arg.indexOf('yml') + 1),
    },
    {
      parser: data => ini.parse(data),
      check: arg => (arg.indexOf('ini') + 1),
    },
  ];
  const dataOfFile1 = fs.readFileSync(filePath1, 'utf8');
  const dataOfFile2 = fs.readFileSync(filePath2, 'utf8');
  const getParser = arg => _.find(parsersList, ({ check }) => check(arg));
  const { parser } = getParser(filePath1);
  const parsedDataOfFile1 = parser(dataOfFile1);
  const parsedDataOfFile2 = parser(dataOfFile2);
  const result = compareParsedData(parsedDataOfFile1, parsedDataOfFile2);
  return ['{', ...result, '}'].join('\n');
};
