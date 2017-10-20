const makeSpaces = (num) => {
  if (num === 0) {
    return '';
  }
  return ` ${makeSpaces(num - 1)}`;
};

const objToString = (obj, spaces) => {
  const result = Object.keys(obj).reduce((acc, key) =>
    [...acc, `${makeSpaces(spaces + 6)}${[key]}: ${obj[key]}`], []);
  return `${['{', ...result, `${makeSpaces(spaces + 2)}}`].join('\n')}`;
};

const renderToJson = (ast, spaces = 2) =>
  ast.map((item) => {
    switch (item.type) {
      case 'keysList':
        return `${makeSpaces(spaces + 2)}${item.key}: {\n${renderToJson(item.children, spaces + 4).join('\n')}\n${makeSpaces(spaces + 2)}}`;
      case 'removed':
        return `${makeSpaces(spaces)}- ${item.key}: ${item.value}`;
      case 'added':
        return `${makeSpaces(spaces)}+ ${item.key}: ${item.value}`;
      case 'updated':
        return `${makeSpaces(spaces)}+ ${item.key}: ${item.value}\n${makeSpaces(spaces)}- ${item.key}: ${item.oldValue}`;
      case 'removedWithChildren':
        return `${makeSpaces(spaces)}- ${item.key}: ${objToString(item.childrenValue, spaces)}`;
      case 'addedWithChildren':
        return `${makeSpaces(spaces)}+ ${item.key}: ${objToString(item.childrenValue, spaces)}`;
      case 'updatedWithChildren':
        return `${makeSpaces(spaces)}+ ${item.key}: ${objToString(item.childrenValue, spaces)}\n${makeSpaces(spaces)}- ${item.key}: ${item.oldValue}`;
      case 'equal':
        return `${makeSpaces(spaces + 2)}${item.key}: ${item.value}`;
      default:
        return item;
    }
  });

export default renderToJson;
