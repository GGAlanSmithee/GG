/* @flow */

export default class RendererManager {
    renderer : IRenderer;
    camera   : ICamera;
    
    constructor(renderer : IRenderer, camera : ICamera) {
        if (typeof window === 'undefined') {
            throw Error('the WebGLRenderer can only be used in a browser environment.');
        }
        
        this.camera = camera;
		this.camera.setPosition(-10, 14, 10);
        
        this.renderer = renderer;
        this.renderer.setSize(window.innerWidth, window.innerHeight, true);
        
        document.body.appendChild(this.renderer.getCanvas());
    }

    draw(interpolationPercentage : number, scene : IScene) {
        this.camera.lookAt(scene.getPosition());
		this.camera.updateWorldMatrix();
		
        this.renderer.render(scene, this.camera);
    }
}