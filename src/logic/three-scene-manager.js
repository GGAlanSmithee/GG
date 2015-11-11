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
    
    addAmbientLightToScene(sceneId : number, color : number) : void {
        this.scenes[sceneId].add(new three.AmbientLight(color));
    }
    
    addDirectionalLightToScene(sceneId : number, color : number, x : number, y : number, z : number) : void {
        const light = new three.DirectionalLight(color);
	    light.position.set(x, y, z);
	
        this.scenes[sceneId].add(light);
    }
}