const rollup = require('rollup')
const babel = require('rollup-plugin-babel')

rollup.rollup({
    entry: 'src/index.js',
    plugins: [
        babel({
            babelrc: false,
            presets: [ 'es2015-rollup' ],
            exclude: 'node_modules/**'
        })
    ]
}).then(bundle => {
    bundle.write({
        dest: 'dist/gg-entities.js',
        sourceMap: 'inline',
        format: 'umd',
        moduleId: 'GGEntities',
        moduleName: 'GGEntities'
    })
}).catch(error => {
    console.warn(error)
})