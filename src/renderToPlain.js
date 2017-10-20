const renderToPlain = (ast, name) =>
  ast.filter(item => item.type !== 'equal').map((item) => {
    const itemName = (name === undefined) ? item.key : `${name}.${item.key}`;
    switch (item.type) {
      case 'keysList':
        return renderToPlain(item.children, itemName).join('\n');
      case 'removed':
        return `Property '${itemName}' was removed`;
      case 'added':
        return `Property '${itemName}' was added with value: ${item.value}`;
      case 'updated':
        return `Property '${itemName}' was updated. From '${item.oldValue}' to '${item.value}'`;
      case 'removedWithChildren':
        return `Property '${itemName}' was removed`;
      case 'addedWithChildren':
        return `Property '${itemName}' was added with complex value`;
      case 'updatedWithChildren':
        return `Property '${itemName}' was updated. From '${item.oldValue}' to complex value`;
      default:
        return item;
    }
  });

export default renderToPlain;
