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
    
    socket.on('fetch files', (section, uuid) => {
        fs.readdir(path.join(appSrcPath, section), (err, files) => {
            if (err) {
                throw err
            }
            
            if (section === 'components' && uuid != null) {
                fs.readFile(path.join(appSrcPath, 'entities.json'), 'utf8', (err, data) => {
                    if (err) {
                        throw err
                    }
                    
                    const entities = JSON.parse(data)
                    const entityComponents = entities[uuid] || {}
                    
                    socket.emit('files fetched', section, files, entityComponents)
                })
            } else {
                socket.emit('files fetched', section, files)
            }
            
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
    
    socket.on('save file', (section, name, uuid, data) => {
        if (uuid) {
            fs.readFile(path.join(appSrcPath, 'entities.json'), 'utf8', (err, oldData) => {
                if (err) {
                    throw err
                }
                
                let newData = JSON.parse(oldData)
                
                if (newData[uuid] == null) {
                    newData[uuid] = {}
                }
                
                newData[uuid][name.slice(0, -5)] = JSON.parse(data)
                
                fs.writeFile(path.join(appSrcPath, 'entities.json'), JSON.stringify(newData, null, 4), err => {
                    if (err) {
                        throw err
                    }
                    
                    socket.emit('file saved', section, name, uuid)
                })
            })
            
            return
        }
        
        const filename = path.join(appSrcPath, section, name)
        
        fs.access(filename, fs.F_OK, err => {
            const fileIsNew = !!err
            
            fs.writeFile(filename, data, err => {
                if (err) {
                    throw err
                }
                
                if (!fileIsNew) {
                    return socket.emit('file saved', section, name)
                }
                
                bundle().then(() => {
                    socket.emit('file saved', section, name)
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
            
            if (section === 'components') {
                fs.readFile(path.join(appSrcPath, 'entities.json'), 'utf8', (err, data) => {
                    if (err) {
                        throw err
                    }
                    
                    data = JSON.parse(data)
                    const oldComponent = oldName.slice(0, -5)
                    const newComponent = newName.slice(0, -5)
                    
                    Object.keys(Object.assign({}, data)).forEach((uuid) => {
                        if (data[uuid][oldComponent] != null) {
                            data[uuid][newComponent] = data[uuid][oldComponent]
                            delete data[uuid][oldComponent]
                        }
                    })
                    
                    fs.writeFile(path.join(appSrcPath, 'entities.json'), JSON.stringify(data, null, 4), err => {
                        if (err) {
                            throw err
                        }
                        
                        socket.emit('component name change for all entities', oldComponent, newComponent)
                    })
                })
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
            
            if (section === 'components') {
                fs.readFile(path.join(appSrcPath, 'entities.json'), 'utf8', (err, data) => {
                    if (err) {
                        throw err
                    }
                    
                    data = JSON.parse(data)
                    const component = name.slice(0, -5)
                    
                    Object.keys(Object.assign({}, data)).forEach((uuid) => {
                        if (data[uuid][component] != null) {
                            delete data[uuid][component]
                            
                            if (Object.keys(data[uuid]).length === 0) {
                                delete data[uuid]
                            }
                        }
                    })
                    
                    fs.writeFile(path.join(appSrcPath, 'entities.json'), JSON.stringify(data, null, 4), err => {
                        if (err) {
                            throw err
                        }
                        
                        socket.emit('component removed from all entities', name)
                    })
                })
            }
            
            //todo: hot module reloading not properly removing file from bundle....
            bundle().then(() => {
                socket.emit('file deleted', section, name)
            })
        })
    })
    
    socket.on('add component to entity', (uuid, componentFilename, name) => {
        fs.readFile(path.join(appSrcPath, 'entities.json'), 'utf8', (err, oldData) => {
            if (err) {
                throw err
            }
            
            let newData = JSON.parse(oldData)
            
            if (newData[uuid] == null) {
                newData[uuid] = {}
            }
            
            fs.readFile(path.join(appSrcPath, 'components', componentFilename), 'utf8', (err, data) => {
                newData[uuid][name] = JSON.parse(data)
                
                fs.writeFile(path.join(appSrcPath, 'entities.json'), JSON.stringify(newData, null, 4), err => {
                    if (err) {
                        throw err
                    }
                    
                    socket.emit('component added to entity', uuid, name)
                })
            })
        })
    })
    
    socket.on('remove component from entity', (uuid, name) => {
        fs.readFile(path.join(appSrcPath, 'entities.json'), 'utf8', (err, data) => {
            if (err) {
                throw err
            }
            
            data = JSON.parse(data)
            
            if (data[uuid] == null || data[uuid][name] == null) {
                return
            }

            delete data[uuid][name]
            
            if (Object.keys(data[uuid]).length === 0) {
                delete data[uuid]
            }
            
            fs.writeFile(path.join(appSrcPath, 'entities.json'), JSON.stringify(data, null, 4), err => {
                if (err) {
                    throw err
                }
                
                socket.emit('component removed from entity', uuid, name)
            })
        })
    })
})

server.listen(process.env.PORT || 8080, err => {
    bundle()
    
    console.log(`listening on port ${server.address().port}`)
})