import _ from 'lodash';

const makeSpaces = (num) => {
  if (num === 0) {
    return '';
  }
  return ` ${makeSpaces(num - 1)}`;
};

// const objToString = (obj, spaces) => JSON.stringify(obj, null, spaces).replace(/"/g, '');
const objToString = (obj, spaces) => {
  const result = Object.keys(obj).reduce((acc, key) =>
    [...acc, `${makeSpaces(spaces + 6)}${[key]}: ${obj[key]}`], []);
  return `${['{', ...result, `${makeSpaces(spaces + 2)}}`].join('\n')}`;
};

export const iterAst = (parsedData1, parsedData2, numOfSpaces = 0) => {
  const uniqueItems = _.union(Object.keys(parsedData1), Object.keys(parsedData2));
  return uniqueItems.reduce((acc, key) => {
    if (parsedData1[key] instanceof Object && parsedData2[key] instanceof Object) {
      return [...acc, {
        type: 'obj', spaces: numOfSpaces + 4, key, value: iterAst(parsedData1[key], parsedData2[key], numOfSpaces + 4),
      }];
    }
    if (parsedData1[key] && !parsedData2[key]) {
      return [...acc, {
        type: 'remove', spaces: numOfSpaces + 2, key, value: parsedData1[key],
      }];
    }
    if (parsedData2[key] && !parsedData1[key]) {
      return [...acc, {
        type: 'add', spaces: numOfSpaces + 2, key, value: parsedData2[key],
      }];
    }
    if (parsedData2[key] !== parsedData1[key]) {
      return [...acc, {
        type: 'update', spaces: numOfSpaces + 2, key, value: parsedData2[key], oldValue: parsedData1[key],
      }];
    }
    return [...acc, {
      type: 'equal', spaces: numOfSpaces + 4, key, value: parsedData2[key],
    }];
  }, []);
};

export const render = ast =>
  ast.map((item) => {
    switch (item.type) {
      case 'obj':
        return `${makeSpaces(item.spaces)}${item.key}: {\n${render(item.value).join('\n')}\n${makeSpaces(item.spaces)}}`;
      case 'remove':
        if (item.value instanceof Object) {
          return `${makeSpaces(item.spaces)}- ${item.key}: ${objToString(item.value, item.spaces)}`;
        }
        return `${makeSpaces(item.spaces)}- ${item.key}: ${item.value}`;
      case 'add':
        if (item.value instanceof Object) {
          return `${makeSpaces(item.spaces)}+ ${item.key}: ${objToString(item.value, item.spaces)}`;
        }
        return `${makeSpaces(item.spaces)}+ ${item.key}: ${item.value}`;
      case 'update':
        return `${makeSpaces(item.spaces)}+ ${item.key}: ${item.value}\n${makeSpaces(item.spaces)}- ${item.key}: ${item.oldValue}`;
      case 'equal':
        return `${makeSpaces(item.spaces)}${item.key}: ${item.value}`;
      default:
        return item;
    }
  });
