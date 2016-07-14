import EntityManager       from 'gg-entities'
import MainLoopLoopManager from '../logic/mainloop-loop-manager'
import FetchFileLoader     from '../logic/fetch-file-loader'

import ConsoleRendererManager from '../view/console-renderer-manager'

const _loopManager     = new MainLoopLoopManager()
const _fileLoader      = new FetchFileLoader()
const _loader          = {} //todo add some node loader
const _rendererManager = new ConsoleRendererManager()
const _entityManager   = new EntityManager()

const loopManager     = () => _loopManager
const fileLoader      = () => _fileLoader
const loader          = () => _loader
const rendererManager = () => _rendererManager
const entityManager   = () => _entityManager

export {loopManager, fileLoader, loader, rendererManager, entityManager}