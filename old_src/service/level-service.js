/* @flow */

import three from 'three';

import spawn from './../utility/spawn';
import Level from './../model/level';

import ThreeAmbientLight from './../external/model/three-ambient-light';
import ThreeDirectionalLight from './../external/model/three-directional-light';

export default class LevelService {
    sceneService : ISceneService;
    ajaxLoader   : IAjaxLoader;
    meshLoader   : IMeshLoader;
        
    constructor(sceneService : ISceneService, ajaxLoader : IAjaxLoader, meshLoader : IMeshLoader) {
        this.sceneService = sceneService;
        this.ajaxLoader   = ajaxLoader;
        this.meshLoader   = meshLoader;
    }
    
    loadLevel(path : string) : Promise {
        var self = this;

        return new Promise((resolve, reject) => {
            spawn(function *() {
                var levelData = yield self.ajaxLoader.get(path);
                
                if (!levelData) {
                    return reject('Failed to load level ' + path);
                }
                
                var mesh = yield self.meshLoader.load('meshes/' + levelData['mesh']);
                
                if (!mesh) {
                    return reject('Faield to load mesh ' + levelData['mesh']);
                }
                
                let scene = self.sceneService.createScene();
                    
                scene.add(mesh);
                
                // todo move out to external -> di
         		scene.add(new three.AmbientLight(0x101030)); 
        
                let directionalLight = new three.DirectionalLight(0xffeedd);
                directionalLight.x = 0;
                directionalLight.y = 0.5;
                directionalLight.z = 0.5;
                
                scene.add(directionalLight);
         		
                resolve(new Level(levelData.name, scene, 'testgroup'));
            });
        }).then(level => {
            return level;
        }).catch(msg => {
            console.warn(msg);
        });
    }
}