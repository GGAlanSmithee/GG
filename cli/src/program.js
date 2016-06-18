var program = require('commander')

var config
var directory
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
          .option('-d, --directory <path>', 'The directory of the app.', '.')
          .option('-p, --platform <name>', 'The output platform [ browser or node ].', 'browser')
          .parse(process.argv);

    config    = program.config ? Object.assign({}, defaultConfig, require(`${process.cwd()}/${program.config}`)) : defaultConfig
    output    = program.output
    platform  = program.platform
    directory = program.directory
}

module.exports.getConfig = function() {
    return config
}

module.exports.getOutput = function() {
    return output
}

module.exports.getPlatform = function() {
    return platform
}

module.exports.getDirectory = function() {
    return directory
}