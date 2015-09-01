import THREE from 'three';

import IRenderer from './i-renderer';

export default class ThreeRenderer extends IRenderer {
    constructor() {
        super(ThreeRenderer);

        // todo: check with three for compatability
        if (typeof window === 'undefined') {
            throw Error('the WebGLRenderer can only be used in a browser environment.');
        }

        this.scene  = new THREE.Scene();
        
        this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
		this.camera.position.x = -10;
		this.camera.position.y = 14;
		this.camera.position.z = 10;
        
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        this.cube = new THREE.Mesh( geometry, material );
        this.scene.add(this.cube);
        
        this.camera.position.z = 5;
    }
    
    update(delta) {
        this.cube.rotation.x += 0.1;
        this.cube.rotation.y += 0.1;
    }
    
    draw(interpolationPercentage, scene) {
        this.camera.lookAt(scene.position);
		this.camera.updateMatrixWorld();
		
        this.renderer.render(scene, this.camera);
    }
}