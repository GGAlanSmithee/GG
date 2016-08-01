import {EntityManager}       from 'gg-entities'
import MainLoopLoopManager   from '../logic/mainloop-loop-manager'
// import FetchFileLoader       from '../logic/fetch-file-loader'
import ThreeObjectMeshLoader from '../logic/three-object-mesh-loader'

import ThreeRendererManager from '../view/three-renderer-manager'

const _loopManager     = new MainLoopLoopManager()
// const _fileLoader      = new FetchFileLoader()
const _loader          = new ThreeObjectMeshLoader()
const _rendererManager = new ThreeRendererManager()
const _entityManager   = new EntityManager()

const loopManager     = () => _loopManager
// const fileLoader      = () => _fileLoader
const loader          = () => _loader
const rendererManager = () => _rendererManager
const entityManager   = () => _entityManager

export default {loopManager, loader, rendererManager, entityManager}
export {loopManager, loader, rendererManager, entityManager}