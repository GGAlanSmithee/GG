var program = require('commander');

var config;
var output;

module.exports.run = function() {
    program.arguments('<file>')
           .option('-c, --config <config>', 'The config file used to initialize the GG engine.')
           .option('-o, --output <output>', 'The output filename.')
           .parse(process.argv);

    const defaultConfig = {
        components: 'components',
        systems: 'systems',
        entities: 'entities'
    };

    config = Object.assign({}, defaultConfig, require(`${process.cwd()}/${program.config}`));
    output = program.output;
};

module.exports.getConfig = function() {
    return config;
};

module.exports.getOutput = function() {
    return output;
};