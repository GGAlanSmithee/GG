/* @flow */

import three from 'three';

export default class ThreePerspectiveCamera {
    perspectiveCamera : three.PerspectiveCamera;
    
    constructor() {
        this.perspectiveCamera = new three.PerspectiveCamera();
    }
    
    updateWorldMatrix() : void {
        this.perspectiveCamera.updateMatrixWorld();
    }
    
    setPosition(x : number, y : number, z : number) : void {
        this.perspectiveCamera.position.x = x;
		this.perspectiveCamera.position.y = y;
		this.perspectiveCamera.position.z = z;
    }
    
    getPosition() : IVector3 {
        return this.perspectiveCamera.position;
    }
    
    lookAt(vector : IVector3) : void {
        this.perspectiveCamera.lookAt(vector);
    }
}