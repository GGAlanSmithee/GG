'use strict';

var fs = require('fs');

module.exports.getHeader = () => 
`import GG from '../src/gg';

const gg = new GG();

`;

module.exports.getFooter = () => `gg.start();`;

module.exports.getComponentsSection = componentsUrl => {
    var code = '';
    
    fs.readdirSync(componentsUrl).forEach(name => {
        const strippedName = name.substring(0, name.indexOf('.'));
        
        code += `import ${strippedName} from '${process.cwd()}/${componentsUrl}/${name}';\n`;
        code += `gg.entityManager.registerComponent(${strippedName});\n\n`;
    });
    
    return code;
};

module.exports.getSystemsSection = systemsUrl => {
    let code = '';
    
    const logicFolderUrl = `${systemsUrl}/logic`;
    
    if (fs.existsSync(logicFolderUrl)) {
        fs.readdirSync(logicFolderUrl).forEach(name => {
            name = name.substring(0, name.indexOf('.'));
            
            code += `import ${name} from '${process.cwd()}/${logicFolderUrl}/${name}';\n`;
            code += `gg.entityManager.registerLogicSystem(0, 0, ${name});\n\n`;
        });
    }
    
    const renderFolderUrl = `${systemsUrl}/render`;
    
    if (fs.existsSync(renderFolderUrl)) {
        fs.readdirSync(renderFolderUrl).forEach(name => {
            name = name.substring(0, name.indexOf('.'));
            
            code += `import ${name} from '${process.cwd()}/${renderFolderUrl}/${name}';\n`;
            code += `gg.entityManager.registerLogicSystem(0, 0, ${name});\n\n`;
        });
    }
    
    return code;
};