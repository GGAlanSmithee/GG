import MainLoopLoopManager from '../logic/mainloop-loop-manager';
import NodeFileLoader      from '../logic/node-file-loader';
import FetchFileLoader     from '../logic/fetch-file-loader';

import ThreeRendererManager from '../view/three-renderer-manager';

const loopManager     = () => new MainLoopLoopManager();
const fileLoader      = () => typeof window === 'undefined' ? new NodeFileLoader() : new FetchFileLoader();
const rendererManager = () => new ThreeRendererManager();

export { loopManager, fileLoader, rendererManager };