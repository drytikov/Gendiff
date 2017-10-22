import renderToSructuredText from '../rendersToOutputFormats/renderToStructuredText';
import renderToPlain from '../rendersToOutputFormats/renderToPlain';
import renderToJson from '../rendersToOutputFormats/renderToJson';

export default (outputFormat) => {
  const outputFormatsList = {
    sructuredText: ast => renderToSructuredText(ast),
    plain: ast => renderToPlain(ast),
    json: ast => renderToJson(ast),
  };
  return outputFormatsList[outputFormat];
};
