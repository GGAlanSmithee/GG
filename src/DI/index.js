import MainLoopLoopManager from '../logic/mainloop-loop-manager';
import NodeFileLoader          from '../logic/node-file-loader';
import FetchFileLoader          from '../logic/fetch-file-loader';

export function loopManager() {
    return new MainLoopLoopManager();
}

export function fileLoader() {
    return typeof window === 'undefined' ? new NodeFileLoader() : new FetchFileLoader();
}