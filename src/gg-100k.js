import MainLoop from 'mainloop.js';
import three    from 'three';

import spawn         from './utility/spawn';
import Game          from './core/game';
import IRenderer     from './core/renderer/i-renderer';
import DebugRenderer from './core/renderer/debug-renderer';
import ThreeRenderer from './core/renderer/three-renderer';
import LevelService  from './service/level-service';
    
class App {
    constructor(game = new Game(new ThreeRenderer())) {
        this.game = game;
        this.three = three;
    }
    
    update(delta) {
        this.game.update(delta);
    }
    
    draw(interpolationPercentage) {
        this.game.draw(interpolationPercentage);
    }
    
    run() {
        let levelService = new GG100k.LevelService();
        
        var app = this;
        
        spawn(function *() {
            let level = yield levelService.loadLevel('levels/level-one.js');
            
            let ambient = new three.AmbientLight( 0x101030 ); 
 			level.scene.add(ambient); 

 			let directionalLight = new three.DirectionalLight( 0xffeedd ); 
 			directionalLight.position.set( 0, 0.5, 0.5 ); 
 			level.scene.add( directionalLight ); 

            app.game.setLevel(level);
            
            MainLoop.setUpdate(delta => { app.update(delta); })
                    .setDraw(interpolationPercentage => { app.draw(interpolationPercentage); })
                    .start();
        });
    }
}

export { App,
         Game,
         LevelService,
         IRenderer,
         DebugRenderer,
         ThreeRenderer };