/* @flow */

import three from 'three';

export default class ThreeRendererManager {
    renderer     : three.WebGLRenderer;
    camera       : three.Camera;
    
    constructor() {
        this.renderer = new three.WebGLRenderer({ antialias : true });
        this.camera   = new three.PerspectiveCamera();
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        document.body.appendChild(this.renderer.domElement);
        
        this.camera.position.y = 20;
        this.camera.position.z = 20;
        
        this.camera.lookAt(new three.Vector3(0.0, 0.0, 0.0));
    }
    
    render(scene : three.Scene, interpolationPercentage : number) : void {
        this.renderer.render(scene, this.camera);
    }
}
