import _ from 'lodash';

const iterAst = (parsedData1, parsedData2) => {
  const uniqueItems = _.union(Object.keys(parsedData1), Object.keys(parsedData2));
  return uniqueItems.map((key) => {
    if (parsedData1[key] instanceof Object && parsedData2[key] instanceof Object) {
      return {
        type: 'nested', key, value: '', children: iterAst(parsedData1[key], parsedData2[key]),
      };
    }
    if (!_.has(parsedData2, key)) {
      return { type: 'removed', key, curValue: parsedData1[key] };
    }
    if (!_.has(parsedData1, key)) {
      return { type: 'added', key, curValue: parsedData2[key] };
    }
    if (parsedData2[key] !== parsedData1[key]) {
      return {
        type: 'updated', key, curValue: parsedData2[key], oldValue: parsedData1[key],
      };
    }
    return { type: 'equal', key, curValue: parsedData2[key] };
  }, []);
};

export default iterAst;
