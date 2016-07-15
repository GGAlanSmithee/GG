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

const bundle = () => {
    return new Promise((resolve, reject) => {
        exec('gg -p browser -d app/src -o index.js', (err, stdout, stderr) => {
            if (err) {
                console.warn(err)
                
                reject(err)
            } else {
                console.log('app bundled')
                
                resolve()
            }
        })  
    })
}

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
        console.log(section, name)
        
        const filename = path.join(appSrcPath, section, name)
        
        fs.access(filename, fs.F_OK, err => {
            const fileIsNew = !!err
            
            fs.writeFile(filename, data, err => {
                if (err) {
                    throw err
                }
                
                if (!fileIsNew) {
                    return socket.emit('file saved', section, name, fileIsNew)
                }
                
                bundle().then(() => {
                    socket.emit('file saved', section, name, fileIsNew)
                })
            })
        })
    })
    
    socket.on('change filename', (section, oldName, newName) => {
        if (oldName === newName) {
            return
        }
        
        const oldFilename = path.join(appSrcPath, section, oldName)
        const newFilename = path.join(appSrcPath, section, newName)
        
        fs.rename(oldFilename, newFilename, err => {
            if (err) {
                throw err
            }
                
            bundle().then(() => {
                socket.emit('filename changed', section, newName)
            })
        })
    })
    
    socket.on('delete file', (section, name) => {
        const filename = path.join(appSrcPath, section, name)
        
        fs.unlink(filename, err => {
            if (err) {
                throw err
            }
            
            //todo: hot module reloading not properly removing file from bundle....
            bundle().then(() => {
                socket.emit('file deleted', section, name)
            })
        })
    })
})

server.listen(process.env.PORT || 8080, err => {
    bundle()
    
    console.log(`listening on port ${server.address().port}`)
})