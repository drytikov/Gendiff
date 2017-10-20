import _ from 'lodash';

const iterAst = (parsedData1, parsedData2) => {
  const uniqueItems = _.union(Object.keys(parsedData1), Object.keys(parsedData2));
  return uniqueItems.reduce((acc, key) => {
    if (parsedData1[key] instanceof Object && parsedData2[key] instanceof Object) {
      return [...acc, {
        type: 'keysList', key, value: '', children: iterAst(parsedData1[key], parsedData2[key]),
      }];
    }
    if (parsedData1[key] && !parsedData2[key]) {
      return [...acc, { type: 'removed', key, value: parsedData1[key] }];
    }
    if (parsedData2[key] && !parsedData1[key]) {
      return [...acc, { type: 'added', key, value: parsedData2[key] }];
    }
    if (parsedData2[key] !== parsedData1[key]) {
      return [...acc, {
        type: 'updated', key, value: parsedData2[key], oldValue: parsedData1[key],
      }];
    }
    return [...acc, { type: 'equal', key, value: parsedData2[key] }];
  }, []);
};

export default iterAst;
