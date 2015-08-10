import MainLoop from 'mainloop.js';

import Game             from './core/game';
import Level            from './core/level/level';
import IRenderer        from './core/renderer/i-renderer';
import DebugRenderer    from './core/renderer/debug-renderer';
import ThreeRenderer    from './core/renderer/three-renderer';
import IResourceManager from './core/loader/i-loader';
import ThreeJSONLoader  from './core/loader/three-json-loader';

class App {
    constructor(game = new Game(new ThreeRenderer())) {
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

export { App,
         Game,
         Level,
         IRenderer,
         DebugRenderer,
         ThreeRenderer,
         IResourceManager,
         ThreeJSONLoader };