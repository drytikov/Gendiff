import _ from 'lodash';

const makeSpaces = (num) => {
  if (num === 0) {
    return '';
  }
  return ` ${makeSpaces(num - 1)}`;
};

const valueToString = (value, spaces) => {
  if (value instanceof Object) {
    const result = Object.keys(value).reduce((acc, key) =>
      [...acc, `${makeSpaces(spaces + 6)}${[key]}: ${value[key]}`], []);
    return `${['{', ...result, `${makeSpaces(spaces + 2)}}`].join('\n')}`;
  }
  return value;
};

const result = (ast, spaces = 2) =>
  ast.map((item) => {
    switch (item.type) {
      case 'nested':
        return `${makeSpaces(spaces + 2)}${item.key}: {\n${_.flatten(result(item.children, spaces + 4)).join('\n')}\n${makeSpaces(spaces + 2)}}`;
      case 'removed':
        return `${makeSpaces(spaces)}- ${item.key}: ${valueToString(item.curValue, spaces)}`;
      case 'added':
        return `${makeSpaces(spaces)}+ ${item.key}: ${valueToString(item.curValue, spaces)}`;
      case 'updated':
        return [`${makeSpaces(spaces)}+ ${item.key}: ${valueToString(item.curValue, spaces)}`,
          `${makeSpaces(spaces)}- ${item.key}: ${item.oldValue}`];
      case 'equal':
        return `${makeSpaces(spaces + 2)}${item.key}: ${item.curValue}`;
      default:
        return item;
    }
  });

const renderToStructuredText = ast => `${['{', ...result(ast), '}'].join('\n')}\n`;

export default renderToStructuredText;
