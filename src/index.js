import Json from '../src/Json';
import Yaml from '../src/Yaml';
import GenDiffAdapter from '../src/GenDiffAdapter';

export default (filePath1, filePath2) => {
  const genDiff = (filePath1.indexOf('json') + 1)
    ? new Json(filePath1, filePath2) : new Yaml(filePath1, filePath2);
  const genDiffAdapter = new GenDiffAdapter(genDiff);
  return genDiffAdapter.compareFiles();
};
