#!/usr/bin/env node

const program = require('./src/program')

program.run()

const config = program.getConfig()

const fs = require('fs')

const codeGenerator = require('./src/code')

const platform = program.getPlatform()

const code = (
    codeGenerator.getHeader(platform) +
    codeGenerator.getComponentsSection(config.components) +
    codeGenerator.getSystemsSection(config.systems) +
    codeGenerator.getEntitiesSection(config.systems) +
    codeGenerator.getFooter()
)

const output = program.getOutput()

fs.writeFileSync(output, code)

require('./src/bundle').run(output, program.getPlatform())