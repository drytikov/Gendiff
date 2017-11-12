const renderValue = value => (typeof value === 'object' ? 'complex value' : `value: ${value}`);

const result = (ast, name) =>
  ast.map((item) => {
    const itemName = (name === undefined) ? item.key : `${name}.${item.key}`;
    switch (item.type) {
      case 'nested':
        return result(item.curValue, itemName);
      case 'removed':
        return `Property '${itemName}' was removed\n`;
      case 'added':
        return `Property '${itemName}' was added with ${renderValue(item.curValue)}\n`;
      case 'updated':
        return `Property '${itemName}' was updated. From value: ${item.oldValue} to ${renderValue(item.curValue)}\n`;
      default:
        return '';
    }
  }).join('');

const renderToPlain = ast => `${result(ast)}`;

export default renderToPlain;
