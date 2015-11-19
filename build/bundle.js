var rollup = require('rollup');
var babel  = require('rollup-plugin-babel');
var npm  = require('rollup-plugin-npm');
var commonjs  = require('rollup-plugin-commonjs');

rollup.rollup({
  entry: 'test/index.js',
  external: [ 'three' ],
  plugins: [
    npm({
      jsnext: true,
      main: true,
      skip: 'node_modules/three/three.js'
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/three/**',
      presets: [ 'es2015-rollup' ],
      plugins: [ 'transform-async-to-generator', 'transform-flow-strip-types' ]
    })
  ]
}).then(function(bundle) {
  bundle.write({
    globals: {
      three: 'THREE'
    },
    dest: 'test/out.js',
    sourceMap: 'inline',
    format: 'umd',
    moduleId: 'Test',
    moduleName: 'Test'
  });
}).catch(function(err) {
  console.warn(err);
});