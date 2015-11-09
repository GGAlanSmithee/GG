/* @flow */

import MainLoop from 'mainloop.js';

export default class MainLoopLoopManager {
    setUpdate(updateMethod : (delta : number) => void) : MainLoopLoopManager {
        MainLoop.setUpdate(updateMethod);
        
        return this;
    }
    
    setRender(renderMethod : (interpolationPercentage : number) => void) : MainLoopLoopManager {
        MainLoop.setDraw(renderMethod);
        
        return this;
    }
    
    start() : void {
        MainLoop.start();
    }
}