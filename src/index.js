import fs from 'fs';
import path from 'path';
import ini from 'ini';
import yaml from 'js-yaml';
import iterAst from '../src/compareParsedData';
import getRender from '../src/rendersToOutputFormats';

export default (filePath1, filePath2, outputFormat) => {
  const parsersList = {
    json: JSON.parse,
    yml: yaml.safeLoad,
    ini: ini.parse,
  };
  const typeOfFiles = path.extname(filePath1).slice(1);
  const dataOfFile1 = fs.readFileSync(filePath1, 'utf8');
  const dataOfFile2 = fs.readFileSync(filePath2, 'utf8');
  const parse = parsersList[typeOfFiles];
  const parsedDataOfFile1 = parse(dataOfFile1);
  const parsedDataOfFile2 = parse(dataOfFile2);
  const render = getRender(outputFormat);
  return render(iterAst(parsedDataOfFile1, parsedDataOfFile2));
};
