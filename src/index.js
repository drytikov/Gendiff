import fs from 'fs';
import path from 'path';
import ini from 'ini';
import yaml from 'js-yaml';
import iterAst from '../src/compareParsedData';
import renderToJson from '../src/renderToJson';
import renderToPlain from '../src/renderToPlain';

const getParsedData = (filePath1, filePath2) => {
  const parsersList = {
    json: data => JSON.parse(data),
    yml: data => yaml.safeLoad(data),
    ini: data => ini.parse(data),
  };
  const typeOfFiles = path.extname(filePath1).slice(1);
  const dataOfFile1 = fs.readFileSync(filePath1, 'utf8');
  const dataOfFile2 = fs.readFileSync(filePath2, 'utf8');
  const parse = parsersList[typeOfFiles];
  const parsedDataOfFile1 = parse(dataOfFile1);
  const parsedDataOfFile2 = parse(dataOfFile2);
  return { parsedDataOfFile1, parsedDataOfFile2 };
};

export const genDiffToJson = (filePath1, filePath2) => {
  const { parsedDataOfFile1, parsedDataOfFile2 } = getParsedData(filePath1, filePath2);
  const result = renderToJson(iterAst(parsedDataOfFile1, parsedDataOfFile2));
  console.log(`${['{', ...result, '}'].join('\n')}\n`);
  return `${['{', ...result, '}'].join('\n')}\n`;
};

export const genDiffToPlain = (filePath1, filePath2) => {
  const { parsedDataOfFile1, parsedDataOfFile2 } = getParsedData(filePath1, filePath2);
  const result = renderToPlain(iterAst(parsedDataOfFile1, parsedDataOfFile2));
  console.log(`${result.join('\n')}\n`);
  return `${result.join('\n')}\n`;
};
