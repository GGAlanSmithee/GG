var prependFile = require('prepend-file');
var rollup      = require('rollup');
var babel       = require('rollup-plugin-babel');
var npm         = require('rollup-plugin-npm');
var commonjs    = require('rollup-plugin-commonjs');
var json        = require('rollup-plugin-json');
    
module.exports.run = function(output, platform) {
    console.log('building...');
    
    rollup.rollup({
        entry: output,
        plugins: [
            commonjs(),
            json(),
            npm({
                jsnext: true,
                main: true,
                skip: 'node_modules/three/three.js'
            }),
            babel({
                babelrc: false,
                presets: [ 'es2015-rollup' ],
                plugins: [ 'transform-async-to-generator', 'transform-flow-strip-types', 'transform-class-properties' ],
                exclude: 'node_modules/three/**',
            })
        ]
    })
    .then(bundle => {
        bundle.write({
            dest: output,
            format: 'umd',
            moduleId: output,
            moduleName: output,
            globals: {
                three: 'THREE'
            }
        });
    })
    .then(() => {
        console.log('build complete!');
        
        if (platform === 'node') {
            prependFile(output, `require('babel-polyfill');\n\n`, err => {
                if (err) {
                    console.warn('could not add babel polyfill.');
            
                    return;
                }

                console.log('added babel polyfill [--platform=node]');
            });
        }
    })
    .catch(err => console.log(err));
};