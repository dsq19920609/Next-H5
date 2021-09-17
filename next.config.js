// const withLess = require("@zeit/next-less");

// module.exports = withLess({ cssModules: true, webpack5: false });

const withLess = require("@zeit/next-less");
const withCss = require('@zeit/next-css');

if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {
  }
}

module.exports = withCss(withLess({ webpack5: false }));

