var path = require('path')
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
            jsnext: true,
            main: true,
            skip: 'node_modules/three/three.js',
            extensions: [ '.js', '.json' ]
        })
    ]
}).then((bundle) => {
    
    const config = {
        globals: {
            three: 'THREE'
        },
        sourceMap: 'inline',
        format: 'umd',
        moduleId: 'GG',
        moduleName: 'GG'
    }
    
    // todo remove write to editor public folder after distributed as npm package
    bundle.write(Object.assign({}, config, {dest: 'dist/gg.js'}))
    bundle.write(Object.assign({}, config, {dest: path.join(__dirname, '../../editor/public/gg.js')}))
}).catch(function(error) {
    console.warn(error)
})