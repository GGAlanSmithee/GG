const fs = require('fs')
const path = require('path')
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
const threeEditorPath = path.join(__dirname + '/three/editor')
const threeEditorJSPath = path.join(__dirname + '/three/editor/js')
const threeEditorCSSPath = path.join(__dirname + '/three/editor/css')
const threeBuildPath = path.join(__dirname + '/three/build')
const threeExamplesPath = path.join(__dirname + '/three/examples/js')
const compiler = webpack(appConfig)

app.use(express.static(publicPath))
app.use(express.static(distPath))
app.use(express.static(threeEditorPath))
app.use(express.static(threeEditorJSPath))
app.use(express.static(threeEditorCSSPath))
app.use(express.static(threeBuildPath))
app.use(express.static(threeExamplesPath))
app.use(webpackDevMiddleware(compiler, { noInfo: true, lazy: false, hot: true, publicPath: appConfig.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.get('/', (req, res) => {
    res.sendFile(`${publicPath}/index.html`)
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
        fs.writeFile(`${appSrcPath}${name}`, data, err => {
            if (err) {
                throw err
            }
            
            socket.emit('file saved', `${name}.js saved`)
        })
    })
})

server.listen(process.env.PORT || 8080, err => {
    console.log(`listening on port ${server.address().port}`)
})