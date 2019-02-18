const context = require.context('./test', true, /\.spec\.js$/);
context.keys().forEach(context);

const srcContext = require.context('./lib', true, /\.js$/);
srcContext.keys().forEach(srcContext);
