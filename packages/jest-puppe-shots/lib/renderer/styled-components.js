const { renderToString } = require('react-dom/server');
const { ServerStyleSheet } = require('styled-components');
const { __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS: { StyleSheet } } = require('styled-components');

const { wrapReactHtmlOutput } = require('./common');

const name = 'STYLED_COMPONENTS';

const extractHtmlFromReactElement = (element) => {
  try {
    return element.props.dangerouslySetInnerHTML.__html;
  } catch (err) {
    console.debug(`Cannot extract HTML from React ${element}`, err);

    return '';
  }
};


async function renderComponent(Component) {
  StyleSheet.reset(true);

  const sheet = new ServerStyleSheet();
  const html = renderToString(sheet.collectStyles(Component));

  // Extract pure CSS from react style component
  const styleElements = sheet.getStyleElement();
  const cssContent = styleElements.map(extractHtmlFromReactElement).join('\n');

  const jsContent = wrapReactHtmlOutput(html);

  return {
    js: jsContent,
    css: cssContent,
  };
}

module.exports = {
  name,
  renderComponent,
};
