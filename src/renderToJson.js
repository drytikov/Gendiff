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

const renderToJson = (ast, spaces = 2) =>
  ast.map((item) => {
    switch (item.type) {
      case 'keysList':
        return `${makeSpaces(spaces + 2)}${item.key}: {\n${renderToJson(item.children, spaces + 4).join('\n')}\n${makeSpaces(spaces + 2)}}`;
      case 'removed':
        return `${makeSpaces(spaces)}- ${item.key}: ${valueToString(item.value, spaces)}`;
      case 'added':
        return `${makeSpaces(spaces)}+ ${item.key}: ${valueToString(item.value, spaces)}`;
      case 'updated':
        return `${makeSpaces(spaces)}+ ${item.key}: ${valueToString(item.value, spaces)}\n${makeSpaces(spaces)}- ${item.key}: ${item.oldValue}`;
      case 'equal':
        return `${makeSpaces(spaces + 2)}${item.key}: ${item.value}`;
      default:
        return item;
    }
  });

export default renderToJson;
