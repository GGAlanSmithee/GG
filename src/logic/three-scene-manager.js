/* @flow */

import three from 'three';

export default class ThreeSceneManager {
    scenes : Array<three.Scene>;
    
    constructor() {
        this.scenes = [];
    }
    
    createScene() : number {
        // Create a new scene, add it to the scenes list and return a handle to it
        return this.scenes.push(new three.Scene()) - 1;
    }
    
    getScene(sceneId : number) : three.Scene {
        return this.scenes[sceneId];
    }
    
    addToScene(sceneId : number, object : three.Object3D) : void {
        this.scenes[sceneId].add(object);
    }
}