const fs      = require('fs')
const program = require('./src/program')

program.run()

const config = program.getConfig()

const generateCode = require('./src/code')

const platform = program.getPlatform()
const output = program.getOutput()
const directory = program.getDirectory()

fs.writeFileSync(
    directory + '/' + output,
    generateCode(platform, directory, config.components, config.systems, config.entities)
)

// require('./src/bundle').run(path.join(process.cwd(), directory, output), program.getPlatform())