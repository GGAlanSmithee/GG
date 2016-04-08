import MainLoopLoopManager from '../logic/mainloop-loop-manager';
import FetchFileLoader     from '../logic/fetch-file-loader';

import ConsoleRendererManager from '../view/console-renderer-manager';

const loopManager     = () => new MainLoopLoopManager();
const fileLoader      = () => new FetchFileLoader();
const rendererManager = () => new ConsoleRendererManager();

export { loopManager, fileLoader, rendererManager };