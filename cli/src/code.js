'use strict'

const fs = require('fs')

const stripName = name => name.substring(0, name.indexOf('.')).replace('-', '')

module.exports = function(platform, url, comp, sys, ent) {
    // todo: require dependency injection from gg as a npm package when released
    // import DI from 'gg/src/DI/${platform}'
    return (
`import GG from 'gg'

${fs.readdirSync(`${url}/${comp}`).map(name => `import ${stripName(name)} from '${process.cwd()}/${url}/${comp}/${name}'`).join('\n')}
${fs.readdirSync(`${url}/${sys}/init`).map(name => `import ${stripName(name)}, { Components as ${stripName(name)}Components } from '${process.cwd()}/${url}/${sys}/init/${name}'`).join('\n')}
${fs.readdirSync(`${url}/${sys}/logic`).map(name => `import ${stripName(name)}, { Components as ${stripName(name)}Components } from '${process.cwd()}/${url}/${sys}/logic/${name}'`).join('\n')}
${fs.readdirSync(`${url}/${sys}/render`).map(name => `import ${stripName(name)}, { Components as ${stripName(name)}Components } from '${process.cwd()}/${url}/${sys}/render/${name}'`).join('\n')}

export default () => {
    const gg = new GG()
    
${fs.readdirSync(`${url}/${comp}`).map(name => `    gg.entityManager.registerComponent('${stripName(name)}', ${stripName(name)})`).join('\n')}

${fs.readdirSync(`${url}/${sys}/init`).map(name => `    gg.entityManager.registerInitSystem('${stripName(name)}', ${stripName(name)}Components, ${stripName(name)})`).join('\n')}

${fs.readdirSync(`${url}/${sys}/logic`).map(name => `    gg.entityManager.registerLogicSystem('${stripName(name)}', ${stripName(name)}Components, ${stripName(name)})`).join('\n')}

${fs.readdirSync(`${url}/${sys}/render`).map(name => `    gg.entityManager.registerRenderSystem('${stripName(name)}', ${stripName(name)}Components, ${stripName(name)})`).join('\n')}

    return gg
}
`
    )
}