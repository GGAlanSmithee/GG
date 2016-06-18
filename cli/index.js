#!/usr/bin/env node

const program = require('./src/program')

program.run()

const config = program.getConfig()

const fs = require('fs')
const path = require('path')

const generateCode = require('./src/code')

const platform = program.getPlatform()
const output = program.getOutput()
const directory = program.getDirectory()

fs.writeFileSync(
    directory + '/' + output,
    generateCode(platform, directory, config.components, config.systems, config.entities)
)

console.log(path.join(process.cwd(), directory, output))
console.log(process.cwd(), directory + '/' + output)

// require('./src/bundle').run(path.join(process.cwd(), directory, output), program.getPlatform())