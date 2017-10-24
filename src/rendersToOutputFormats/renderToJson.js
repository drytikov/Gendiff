const result = ast =>
  ast.reduce((acc, item) => {
    if (item.type === 'nested') {
      console.log(acc[item.type]);
      const value = { ...acc[item.type], [item.key]: { ...result(item.children) } };
      return { ...acc, [item.type]: value };
    }
    return { ...acc, [item.type]: { ...acc[item.type], [item.key]: item.curValue } };
  }, {});

const renderToJson = ast => `${JSON.stringify(result(ast), null, 2)}\n`;

export default renderToJson;
