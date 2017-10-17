import _ from 'lodash';
import Json from '../src/Json';
import Yaml from '../src/Yaml';
import Ini from '../src/Ini';
import GenDiffAdapter from '../src/GenDiffAdapter';

export default (filePath1, filePath2) => {
  const parserList = [
    {
      name: Json,
      check: arg => (arg.indexOf('json') + 1),
    },
    {
      name: Yaml,
      check: arg => (arg.indexOf('yml') + 1),
    },
    {
      name: Ini,
      check: arg => (arg.indexOf('ini') + 1),
    },
  ];
  const getParser = arg => _.find(parserList, ({ check }) => check(arg));
  const Parser = getParser(filePath1).name;
  const genDiff = new Parser(filePath1, filePath2);
  const genDiffAdapter = new GenDiffAdapter(genDiff);
  return genDiffAdapter.compareFiles();
};
