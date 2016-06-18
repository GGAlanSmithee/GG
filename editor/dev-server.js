const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const appConfig = require('./webpack.config')

const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)

const publicPath = path.join(__dirname + '/public')
const appSrcPath = path.join(__dirname + '/app/src/')
const distPath = path.join(__dirname + '/../dist/')
const threePath = path.join(__dirname + '/three')
const compiler = webpack(appConfig)

app.use(express.static(threePath))
app.use(express.static(distPath))
app.use(express.static(publicPath))
app.use(webpackDevMiddleware(compiler, { noInfo: true, lazy: false, hot: true, publicPath: appConfig.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.get('/', (req, res) => {
    exec('gg -p browser -d app/src -o index.js', (err, stdout, stderr) => {
        if (err) {
            console.warn(err)
        } else {
            console.log('generated app')
        }
    })
                    
    res.sendFile(path.join(__dirname, `index.html`))
})

io.on('connection', socket => {
    fs.readdir(appSrcPath, (err, files) => socket.emit('connected', files))
    
    socket.on('fetch file', (name) => {
        fs.readFile(`${appSrcPath}${name}`, 'utf8', (err, file) => {
            if (err) {
                throw err
            }
            
            socket.emit('file fetched', file)
        })
    })
    
    socket.on('save file', (name, data) => {
        fs.stat(name, fileIsNew => {
            fs.writeFile(`${appSrcPath}${name}`, data, err => {
                if (err) {
                    throw err
                }
                
                // rebundle if the file is a new one
                if (fileIsNew) {
                    exec('gg -p browser -o app/test-app.js', (err, stdout, stderr) => {
                        if (err) {
                            console.warn(err)
                        } else {
                            console.log('generated app')
                        }
                    })
                }
                
                socket.emit('file saved', `${name}.js saved`)
            })
        })
    })
})

server.listen(process.env.PORT || 8080, err => {
    console.log(`listening on port ${server.address().port}`)
})