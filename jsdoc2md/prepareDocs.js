const fs = require('fs');

const appMin = fs.readFileSync('./docs/js/app.min.js', 'utf8');
let result = appMin.replace(/img\/tree-/g, 'static/jssdkdoc/img/tree-');

fs.writeFileSync('./docs/js/app.min.js', result, 'utf8');

const docmaWeb = fs.readFileSync('./docs/js/docma-web.js', 'utf8');
result = docmaWeb.replace(/content\/readme.html/g, 'static/jssdkdoc/content/readme.html');

fs.writeFileSync('./docs/js/docma-web.js', result, 'utf8');

console.log('Documentation is prepared for deploy');

process.exit(0);