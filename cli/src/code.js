'use strict'

const fs = require('fs')

module.exports.getHeader = platform =>  (
`import * as DI from '../src/DI/${platform}'

import GG from '../src/gg'

const gg = new GG(DI)

`
)

module.exports.getFooter = () => `gg.start()`

module.exports.getComponentsSection = (componentsUrl = 'components') => {
    let code = ''
    
    fs.readdirSync(componentsUrl).forEach(name => {
        const strippedName = name.substring(0, name.indexOf('.')).replace('-', '')
        
        code += `import ${strippedName} from '${process.cwd()}/${componentsUrl}/${name}'\n`
        code += `gg.entityManager.registerComponent('${strippedName}', ${strippedName})\n\n`
    })
    
    return code
}

module.exports.getSystemsSection = (systemsUrl = 'systems') => {
    let code = ''
    
    const initFolderUrl = `${systemsUrl}/init`
    
    if (fs.existsSync(initFolderUrl)) {
        fs.readdirSync(initFolderUrl).forEach(name => {
            const strippedName = name.substring(0, name.indexOf('.')).replace('-', '')
            
            code += `import ${strippedName}, { Components as ${strippedName}Components } from '${process.cwd()}/${initFolderUrl}/${name}'\n`
            code += `gg.entityManager.registerInitSystem('${strippedName}', ${strippedName}Components, ${strippedName})\n\n`
        })
    }
    
    const logicFolderUrl = `${systemsUrl}/logic`
    
    if (fs.existsSync(logicFolderUrl)) {
        fs.readdirSync(logicFolderUrl).forEach(name => {
            const strippedName = name.substring(0, name.indexOf('.')).replace('-', '')
            
            code += `import ${strippedName}, { Components as ${strippedName}Components } from '${process.cwd()}/${logicFolderUrl}/${name}'\n`
            code += `gg.entityManager.registerLogicSystem('${strippedName}', ${strippedName}Components, ${strippedName})\n\n`
        })
    }
    
    const renderFolderUrl = `${systemsUrl}/render`
    
    if (fs.existsSync(renderFolderUrl)) {
        fs.readdirSync(renderFolderUrl).forEach(name => {
            const strippedName = name.substring(0, name.indexOf('.')).replace('-', '')
            
            code += `import ${strippedName}, { Components as ${strippedName}Components } from '${process.cwd()}/${renderFolderUrl}/${name}'\n`
            code += `gg.entityManager.registerRenderSystem('${strippedName}', ${strippedName}Components, ${strippedName})\n\n`
        })
    }
    
    return code
}

module.exports.getEntitiesSection = (entitiesUrl = 'entities') => {
    let code = ''
    
    fs.readdirSync(entitiesUrl).forEach(name => {
        const strippedName = name.substring(0, name.indexOf('.')).replace('-', '')
        
        code += `import ${strippedName} from '${process.cwd()}/${entitiesUrl}/${name}'\n`
        code += `gg.registerEntityConfiguration('${strippedName}', ${strippedName})\n\n`
    })
    
    return code
}