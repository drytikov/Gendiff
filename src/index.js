import fs from 'fs';
import path from 'path';
import getParser from './getParser';
import iterAst from './compareParsedData';
import getRender from './rendersToOutputFormats';

export default (filePath1, filePath2, outputFormat = 'sructuredText') => {
  const typeOfFile = path.extname(filePath1).slice(1);
  const dataOfFile1 = fs.readFileSync(filePath1, 'utf8');
  const dataOfFile2 = fs.readFileSync(filePath2, 'utf8');
  const parse = getParser(typeOfFile);
  const parsedDataOfFile1 = parse(dataOfFile1);
  const parsedDataOfFile2 = parse(dataOfFile2);
  const render = getRender(outputFormat);
  return render(iterAst(parsedDataOfFile1, parsedDataOfFile2));
};
