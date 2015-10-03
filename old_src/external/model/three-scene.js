/* @flow */

import three from 'three';

export default class ThreeScene {
    scene : three.Scene;
    
    constructor() {
        this.scene = new three.Scene();
    }    

    updateWorldMatrix() : void {
        this.scene.updateMatrixWorld();
    }
    
    add(object : IObject) : IObject {
        if (object instanceof three.Object3D) {
            this.scene.add(object);
        }
        
        return object;
    }
    
    getPosition() : IVector3 {
        return this.scene.position;
    }
}