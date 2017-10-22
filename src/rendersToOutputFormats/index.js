import renderToSructuredText from '../rendersToOutputFormats/renderToStructuredText';
import renderToPlain from '../rendersToOutputFormats/renderToPlain';
import renderToJson from '../rendersToOutputFormats/renderToJson';

export default (outputFormat) => {
  const outputFormatsList = {
    sructuredText: renderToSructuredText,
    plain: renderToPlain,
    json: renderToJson,
  };
  return outputFormatsList[outputFormat];
};
