/* @flow */

import three from 'three';
import MainLoop from 'mainloop.js';
import { EntityManager } from 'gg-entities';

import spawn                  from './utility/spawn';
import Game                   from './core/game';
import RendererManager        from './service/renderer-manager';
import ThreeRenderer          from './external/three-renderer';
import ThreePerspectiveCamera from './external/model/three-perspective-camera';
import LevelService           from './service/level-service';
import SceneService           from './service/three-scene-service';
import AjaxLoader             from './external/qwest-ajax-loader';
import MeshLoader             from './external/three-json-mesh-loader';
import ThreeScene             from './external/model/three-scene';

function test(scene : ThreeScene) : void {
    
}

test(new ThreeScene());

window.onload = function() {
    spawn(function *() {
        let levelService = new LevelService(new SceneService(), new AjaxLoader(), new MeshLoader(new three.JSONLoader()));
        
        let path = 'levels/level-one.js';
        
        let level = yield levelService.loadLevel(path);
        
        if (level === undefined) {
            console.error('Could not load level ', path);
            
            return;
        }
        
        let game = new Game(new EntityManager(), new RendererManager(new ThreeRenderer(), new ThreePerspectiveCamera()), level);

        MainLoop.setUpdate(delta => { game.update(delta); })
                .setDraw(interpolationPercentage => { game.draw(interpolationPercentage); })
                .start();
    });
};