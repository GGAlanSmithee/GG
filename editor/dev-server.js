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

const publicPath = path.join(__dirname, 'public')
const appSrcPath = path.join(__dirname, 'app/src/')
const acePath = path.join(__dirname, '../lib//ace/src')
const threePath = path.join(__dirname, '../lib/three')

const compiler = webpack(appConfig)

app.use(express.static(threePath))
app.use(express.static(acePath))
app.use(express.static(publicPath))
app.use(webpackDevMiddleware(compiler, { noInfo: true, lazy: false, hot: true, publicPath: appConfig.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, `index.html`))
})

io.on('connection', socket => {
    fs.readdir(path.join(appSrcPath, 'components'), (err, files) => socket.emit('connected', files))
    
    socket.on('fetch files', section => {
        fs.readdir(path.join(appSrcPath, section), (err, files) => {
            if (err) {
                throw err
            }
            
            socket.emit('files fetched', section, files)
        })
    })
    
    socket.on('fetch file', (section, name) => {
        fs.readFile(path.join(appSrcPath, section, name), 'utf8', (err, file) => {
            if (err) {
                throw err
            }
            
            socket.emit('file fetched', file)
        })
    })
    
    socket.on('save file', (section, name, data) => {
        fs.stat(name, fileIsNew => {
            fs.writeFile(path.join(appSrcPath, section, name), data, err => {
                if (err) {
                    throw err
                }
                
                // rebundle if the file is a new one
                // if (fileIsNew) {
                //     exec('gg -p browser -d app/src -o index.js', (err, stdout, stderr) => {
                //         if (err) {
                //             console.warn(err)
                //         } else {
                //             console.log('generated app')
                //         }
                //     })
                // }
                
                socket.emit('file saved', `${name}.js saved`)
            })
        })
    })
})

server.listen(process.env.PORT || 8080, err => {
    console.log(`listening on port ${server.address().port}`)
})