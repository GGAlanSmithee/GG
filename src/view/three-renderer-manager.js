/* @flow */

import three from 'three';

export default class ThreeRendererManager {
    renderer     : three.WebGLRenderer;
    camera       : three.Camera;
    geometries   : Map<string, three.Geometry>;
    materials    : Map<string, three.Material>;
    
    constructor() {
        this.geometries = new Map();
        this.materials = new Map();
        
        this.renderer = new three.WebGLRenderer({ antialias : true });
        this.camera   = new three.PerspectiveCamera();
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        document.body.appendChild(this.renderer.domElement);
        
        this.camera.position.y = 40;
        this.camera.position.z = 40;
        
        this.camera.lookAt(new three.Vector3(0.0, 0.0, 0.0));
        
        this.scene = new three.Scene();

        this.scene.add( new three.AmbientLight( 0x404040 ) );
        
        var directionalLight = new THREE.DirectionalLight( 0xdd3333, 1.5 );
		directionalLight.position.set( 1, 1, 1 ).normalize();
        
        this.scene.add( directionalLight );

        this.geometries.set('cylinder', new three.CylinderGeometry( 5, 5, 20, 32 ));
        this.materials.set('phong', new THREE.MeshPhongMaterial( { color: 0xdddddd, specular: 0x009900, shininess: 30, shading: THREE.FlatShading } ));
        
        this.renderer.render(this.scene, this.camera);
    }
    
    getScene() : three.Scene {
        return this.scene;
    }
    
    getGeometry(key : string) : three.Geometry {
        return geometries.get(key);
    }
    
    getMaterial(key : string) : three.Material {
        return materials.get(key);
    }
    
    addMesh(geometry, material) {
        var geo = this.geometries.get(geometry);
        var mat = this.materials.get(material);
        var mesh = new three.Mesh(geo, mat);
        
        console.log('adding mesh!', geo, mat, mesh);
        
        this.scene.add(mesh);
    }
    
    render(interpolationPercentage : number) : void {
        this.renderer.render(this.scene, this.camera);
    }
    
    // render(scene : three.Scene, interpolationPercentage : number) : void {
    //     this.renderer.render(scene, this.camera);
    // }
}
