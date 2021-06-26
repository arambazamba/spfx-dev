const concat = require('concat');

(async function build() {
  const files = [
    './dist/ngElementsSPFx/runtime.js',
    './dist/ngElementsSPFx/polyfills.js',
    './dist/ngElementsSPFx/scripts.js',
    './dist/ngElementsSPFx/main.js'
  ];
  await concat(files, './dist/ngElementsSPFx/bundle.js');
})();
