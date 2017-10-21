import fs from 'fs';
import path from 'path';
import ini from 'ini';
import yaml from 'js-yaml';
import iterAst from '../src/compareParsedData';
import renderToSructuredText from '../src/renderToStructuredText';
import renderToPlain from '../src/renderToPlain';
import renderToJson from '../src/renderToJson';

export default (filePath1, filePath2, outputFormat) => {
  const parsersList = {
    json: data => JSON.parse(data),
    yml: data => yaml.safeLoad(data),
    ini: data => ini.parse(data),
  };
  const outputFormatsList = {
    sructuredText: ast => renderToSructuredText(ast),
    plain: ast => renderToPlain(ast),
    json: ast => renderToJson(ast),
  };
  const typeOfFiles = path.extname(filePath1).slice(1);
  const dataOfFile1 = fs.readFileSync(filePath1, 'utf8');
  const dataOfFile2 = fs.readFileSync(filePath2, 'utf8');
  const parse = parsersList[typeOfFiles];
  const parsedDataOfFile1 = parse(dataOfFile1);
  const parsedDataOfFile2 = parse(dataOfFile2);
  const render = outputFormatsList[outputFormat];
  const result = render(iterAst(parsedDataOfFile1, parsedDataOfFile2));
  console.log(result);
  return result;
};
