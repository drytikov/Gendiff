const result = (ast, name) =>
  ast.map((item) => {
    const itemName = (name === undefined) ? item.key : `${name}.${item.key}`;
    const value = (item.curValue instanceof Object) ? 'complex value' : `value: ${item.curValue}`;
    switch (item.type) {
      case 'nested':
        return result(item.children, itemName);
      case 'removed':
        return `Property '${itemName}' was removed\n`;
      case 'added':
        return `Property '${itemName}' was added with ${value}\n`;
      case 'updated':
        return `Property '${itemName}' was updated. From value: ${item.oldValue} to ${value}\n`;
      default:
        return '';
    }
  }).join('');

const renderToPlain = ast => `${result(ast)}`;

export default renderToPlain;
