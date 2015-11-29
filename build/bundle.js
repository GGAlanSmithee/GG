var rollup = require('rollup');
var babel  = require('rollup-plugin-babel');
var npm  = require('rollup-plugin-npm');
var commonjs  = require('rollup-plugin-commonjs');

rollup.rollup({
  entry: 'src/gg.js',
  external: [ 'three' ],
  plugins: [
    npm({
      jsnext: true,
      main: true,
      skip: 'node_modules/three/three.js'
    }),
    commonjs({
      include: [ 'node_modules/**', 'src/external/**' ]
    }),
    babel({
      exclude: 'node_modules/three/**',
      presets: [ 'es2015-rollup' ],
      plugins: [ 'transform-async-to-generator', 'transform-flow-strip-types', 'transform-class-properties' ]
    })
  ]
}).then(function(bundle) {
  bundle.write({
    globals: {
      three: 'THREE'
    },
    dest: 'dist/gg.js',
    sourceMap: 'inline',
    format: 'umd',
    moduleId: 'GG',
    moduleName: 'GG'
  });
}).catch(function(err) {
  console.warn(err);
});