var program = require('commander')

var config
var output
var platform

const defaultConfig = {
    components: 'components',
    systems: 'systems',
    entities: 'entities'
}

module.exports.run = function() {
    program.arguments('<file>')
           .option('-c, --config <path>', 'The config file used to initialize the GG engine.')
           .option('-o, --output <file>', 'The output filename.')
           .option('-p, --platform <name>', 'The output platform [ browser or node ].')
           .parse(process.argv);

    config   = program.config ? Object.assign({}, defaultConfig, require(`${process.cwd()}/${program.config}`)) : {}
    output   = program.output
    platform = program.platform
}

module.exports.getConfig = function() {
    return config
}

module.exports.getOutput = function() {
    return output;
}

module.exports.getPlatform = function() {
    return platform;
}