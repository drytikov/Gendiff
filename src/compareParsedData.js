import _ from 'lodash';

export default (parsedData1, parsedData2) => {
  const uniqueItems = _.union(Object.keys(parsedData1), Object.keys(parsedData2));
  return uniqueItems.reduce((acc, key) => {
    if (parsedData1[key] && !parsedData2[key]) {
      return [...acc, `  - ${key}: ${parsedData1[key]}`];
    }
    if (parsedData2[key] && !parsedData1[key]) {
      return [...acc, `  + ${key}: ${parsedData2[key]}`];
    }
    if (parsedData2[key] !== parsedData1[key]) {
      return [...acc, `  + ${key}: ${parsedData2[key]}`, `  - ${key}: ${parsedData1[key]}`];
    }
    return [...acc, `    ${key}: ${parsedData2[key]}`];
  }, []);
};
