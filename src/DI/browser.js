import MainLoopLoopManager from '../logic/mainloop-loop-manager';
import FetchFileLoader     from '../logic/fetch-file-loader';

import ThreeRendererManager from '../view/three-renderer-manager';

const loopManager     = () => new MainLoopLoopManager();
const fileLoader      = () => new FetchFileLoader();
const rendererManager = () => new ThreeRendererManager();

export { loopManager, fileLoader, rendererManager };