// var rollup = require('rollup')
// var babel = require('rollup-plugin-babel')
// var npm = require('rollup-plugin-npm')
// var commonjs = require('rollup-plugin-commonjs')

// console.log('building...')

// rollup.rollup({
//     entry: 'src/gg.js',
//     external: [ 'three' ],
//     plugins: [
//         npm({
//             jsnext: true,
//             main: true,
//             skip: 'node_modules/three/three.js'
//         }),
//         commonjs({
//             include: 'node_modules/**'
//         }),
//         babel({
//             babelrc: false,
//             presets: [ 'es2015-rollup' ],
//             plugins: [ 'transform-flow-strip-types', 'transform-class-properties' ],
//             exclude: 'node_modules/**'
//         })
//     ]
// }).then(function(bundle) {
//     bundle.write({
//         globals: {
//             three: 'THREE'
//         },
//         dest: 'dist/gg.js',
//         sourceMap: 'inline',
//         format: 'umd',
//         moduleId: 'GG',
//         moduleName: 'GG'
//     })
// }).then(function() {
//     console.log('build complete!')
// }).catch(function(err) {
//     console.warn(err)
// })

var rollup = require('rollup')
var babel = require('rollup-plugin-babel')
var nodeResolve = require('rollup-plugin-node-resolve')
var commonjs = require('rollup-plugin-commonjs')
var json = require('rollup-plugin-json')

rollup.rollup({
    entry: 'src/index.js',
    external: [ 'three' ],
    plugins: [
        babel({
            babelrc: false,
            presets: [ 'es2015-rollup' ],
            plugins: [ 'transform-flow-strip-types', 'transform-class-properties' ],
            exclude: 'node_modules/**'
        }),
        json(),
        commonjs({
            include: 'node_modules/**'
        }),
        nodeResolve({
            jsnext: false,
            main: true,
            skip: 'node_modules/three/three.js',
            extensions: [ '.js', '.json' ]
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
}).catch(function(error) {
    console.warn(error);
});