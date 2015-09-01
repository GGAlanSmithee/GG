import spawn from './../utility/spawn';

import { CreateMeshLoader, CreateAjaxLoader }          from './../external/external-factory';
import { CreateSceneService } from './service-factory';
         
import ILevelService from './interface/i-level-service';

import Level from './../model/level';

export default class LevelService extends ILevelService {
    constructor() {
        super(LevelService);
        
        this.ajaxLOader   = CreateAjaxLoader();
        this.sceneService = CreateSceneService();
        this.meshLoader   = CreateMeshLoader();
    }
    
    loadLevel(path) {
        let self = this;

        return new Promise((resolve, reject) => {
            spawn(function *() {
                let scene = self.sceneService.createScene();

                let levelData = yield self.ajaxLOader.get(path);
                
                if (!levelData) {
                    reject('Failed to load level ' + level);
                }
                
                let mesh = yield self.meshLoader.load('meshes/' + levelData['mesh']);
                
                if (!mesh) {
                    reject('Faield to load mesh ' + levelData['mesh']);
                }
                
                scene.add(mesh);
                
                let navMesh = yield self.meshLoader.load('meshes/' + levelData['nav-mesh']);
                
                if (!navMesh) {
                    reject('Faield to load mesh ' + levelData['nav-mesh']);
                }
                
                scene.add(navMesh);
                
                resolve(new Level(levelData['name'], scene, 'testgroup'));
            });
        }).then(level => {
            return level;
        }).catch(msg => {
            console.warn(msg);
        });
    }
}