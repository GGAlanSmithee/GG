/* @flow */

import three from 'three';

export default class ThreeRenderer {
    renderer : three.WebGLRenderer;
    
    constructor() {
        this.renderer = new three.WebGLRenderer();
    }
    
    getCanvas() : HTMLCanvasElement {
        return this.renderer.domElement;
    }
    
    setSize(width : number, height : number) : void {
        this.renderer.setSize(width, height, true);
    }
    
    render(scene : IScene, camera : ICamera) : void {
        if (scene instanceof three.Object3D && camera instanceof three.Object3D) {
            this.renderer.render(scene, camera);
        }
    }
}