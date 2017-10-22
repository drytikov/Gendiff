const result = (ast, name) =>
  ast.filter(item => item.type !== 'equal').map((item) => {
    const itemName = (name === undefined) ? item.key : `${name}.${item.key}`;
    const value = (item.curValue instanceof Object) ? 'complex value' : `value: ${item.curValue}`;
    switch (item.type) {
      case 'nested':
        return result(item.children, itemName).join('\n');
      case 'removed':
        return `Property '${itemName}' was removed`;
      case 'added':
        return `Property '${itemName}' was added with ${value}`;
      case 'updated':
        return `Property '${itemName}' was updated. From value: ${item.oldValue} to ${value}`;
      default:
        return item;
    }
  });

const renderToPlain = ast => `${result(ast).join('\n')}\n`;

export default renderToPlain;
