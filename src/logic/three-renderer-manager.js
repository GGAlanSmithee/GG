/* @flow */

import three from 'three';

export default class ThreeRendererManager {
    renderer     : three.WebGLRenderer;
    currentScene : three.Scene;
    camera       : three.Camera;
    cube         : three.Mesh;
    
    constructor() {
        this.renderer     = new three.WebGLRenderer();
        this.currentScene = new three.Scene();
        this.camera       = new three.PerspectiveCamera();
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        document.body.appendChild(this.renderer.domElement);
        
        let geometry = new three.BoxGeometry(1, 1, 1);
        let material = new three.MeshBasicMaterial({ color: 0x00ff00 });
        this.cube     = new three.Mesh(geometry, material);
        
        this.currentScene.add(this.cube);
        
        this.camera.position.z = 5;
    }
    
    render(interpolationPercentage : number) : void {
        this.cube.rotation.x += 0.1;
        this.cube.rotation.y += 0.1;

        this.renderer.render(this.currentScene, this.camera);
    }
}