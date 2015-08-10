import Game          from './core/game';
import MainLoop      from 'mainloop.js';
import IRenderer     from './core/renderer/i-renderer';
import DebugRenderer from './core/renderer/debug-renderer';
import ThreeRenderer from './core/renderer/three-renderer';
import Level         from './core/level/level';

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

export { App, Game, Level, IRenderer, DebugRenderer, ThreeRenderer };