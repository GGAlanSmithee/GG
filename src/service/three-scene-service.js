import three from 'three';

import spawn from './../utility/spawn';
import ISceneService from './interface/i-scene-service';

export default class ThreeSceneService extends ISceneService {
    constructor() {
        super(ThreeSceneService);
    }
    
    createScene() {
        return new three.Scene();
    }
}