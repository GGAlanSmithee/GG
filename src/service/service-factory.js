import LevelService      from './level-service';
import ThreeSceneService from './three-scene-service';

function CreateLevelService() {
    return new LevelService();
}

function CreateSceneService() {
    return new ThreeSceneService();
}


export { CreateLevelService, CreateSceneService };