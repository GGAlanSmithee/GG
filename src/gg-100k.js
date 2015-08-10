import MainLoop from 'mainloop.js';

import Game                    from './core/game';
import Level                   from './core/level/level';
import IRenderer               from './core/renderer/i-renderer';
import DebugRenderer           from './core/renderer/debug-renderer';
import Renderer3D              from './core/renderer/renderer-3d';
import IResourceManager        from './core/resource_manager/i-resource-manager';
import GraphicsResourceManager from './core/resource_manager/graphics-resource-manager';

class App {
    constructor(game = new Game(new Renderer3D())) {
        this.game = game;
    }
    
    update(delta) {
        this.game.update(delta);
    }
    
    draw(interpolationPercentage) {
        this.game.draw(interpolationPercentage);
    }
    
    run() {
        MainLoop.setUpdate(delta => { this.update(delta); })
                .setDraw(interpolationPercentage => { this.draw(interpolationPercentage); })
                .start();
    }
}

export { App, Game, Level, IRenderer, DebugRenderer, Renderer3D, IResourceManager, GraphicsResourceManager };