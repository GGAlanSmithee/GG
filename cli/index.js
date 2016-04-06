#!/usr/bin/env node

var program = require('./src/program');

program.run();

var config = program.getConfig();

var fs = require('fs');

var codeGenerator = require('./src/code');

var code = codeGenerator.getHeader() +
           codeGenerator.getComponentsSection(config.components) +
           codeGenerator.getSystemsSection(config.systems) +
           codeGenerator.getFooter();

var output = program.getOutput();

fs.writeFileSync(output, code);

require('./src/bundle').run(output);