var rollup   = require('rollup');
var babel    = require('rollup-plugin-babel');
var npm      = require('rollup-plugin-npm');
var commonjs = require('rollup-plugin-commonjs');
var json     = require('rollup-plugin-json');
    
module.exports.run = function(output) {
    console.log('building...');
    
    rollup.rollup({
        entry: output,
        plugins: [
            commonjs(),
            json(),
            npm({
                jsnext: true,
                main: true
            }),
            babel({
                babelrc: false,
                presets: [ 'es2015-rollup' ],
                plugins: [ 'transform-async-to-generator', 'transform-flow-strip-types', 'transform-class-properties' ]
            })
        ]
    })
    .then(bundle => {
        bundle.write({
            dest: output,
            format: 'umd',
            moduleId: 'Test',
            moduleName: 'Test'
        });
    })
    .then(() => console.log('build complete!'))
    .catch(err => console.log(err));
};