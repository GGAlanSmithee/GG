import IRenderer from './i-renderer';

export default class ThreeRenderer extends IRenderer {
    constructor() {
        super();

        if (typeof window === 'undefined') {
            throw Error('ThreeRenderer can only be used in a browser environment.');
        }
        
        var THREE = window.THREE;
        
        if (!THREE) {
            throw Error('ThreeRenderer requires three.js, include it first.');
        }
        
        this.scene  = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        
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
        this.entityManager.onLogic(delta);
        
        this.cube.rotation.x += 0.1;
        this.cube.rotation.y += 0.1;
    }
    
    draw(interpolationPercentage) {
        this.entityManager.onRender(interpolationPercentage);
        
        this.renderer.render(this.scene, this.camera);
    }
}