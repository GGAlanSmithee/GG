var program = require('commander');

var config;
var output;
var platform;

module.exports.run = function() {
    program.arguments('<file>')
           .option('-c, --config <config>', 'The config file used to initialize the GG engine.')
           .option('-o, --output <output>', 'The output filename.')
           .option('-p, --platform <platform>', 'The output platform.')
           .parse(process.argv);

    const defaultConfig = {
        components: 'components',
        systems: 'systems',
        entities: 'entities'
    };

    config   = Object.assign({}, defaultConfig, require(`${process.cwd()}/${program.config}`));
    output   = program.output;
    platform = program.platform;
};

module.exports.getConfig = function() {
    return config;
};

module.exports.getOutput = function() {
    return output;
};

module.exports.getPlatform = function() {
    return platform;
};