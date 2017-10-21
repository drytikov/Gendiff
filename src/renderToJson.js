const result = ast =>
  ast.reduce((acc, item) => {
    if (item.type === 'nested') {
      const value = { ...acc[item.type], [item.key]: { ...result(item.children) } };
      return { ...acc, [item.type]: value };
    }
    return { ...acc, [item.type]: { ...acc[item.type], [item.key]: item.curValue } };
  }, {});

const renderToJson = ast => `${JSON.stringify(result(ast))}\n`;

export default renderToJson;
