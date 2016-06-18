/* @flow */

import three from 'three';

export default class ThreeRendererManager {
    renderer     : three.WebGLRenderer;
    camera       : three.Camera;
    // geometries   : Map<string, three.Geometry>;
    // materials    : Map<string, three.Material>;
    
    constructor() {
        this.renderer = new three.WebGLRenderer({ antialias : true });
		this.renderer.setClearColor( 0x000000 );
		this.renderer.setPixelRatio( window.devicePixelRatio );
    }
    
    enableShadows() {
        this.renderer.shadowMap.enabled = true
    }
    
    isFullScreen() {
        return this.renderer._fullScreen
    }
    
    //todo make into getter / setter ?
    setScene(scene) {
        this.scene = scene
    }
    
    setCamera(camera, width, height) {
        this.camera = camera
    }
    
    setSize(width, height) {
        if (!this.isFullScreen()) {
		    this.camera.aspect = (width || 500) / (height || 500)
    	}
		
		this.camera.updateProjectionMatrix()
		
		if (!this.isFullScreen()) {
	        this.renderer.setSize(width || 500, height || 500)
		}
    }
    
    getDom() {
        return this.renderer.domElement
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
        
        this.scene.add(mesh);
        
        return mesh;
    }
    
    render(interpolationPercentage : number) : void {
        this.renderer.render(this.scene, this.camera);
    }
    
    // render(scene : three.Scene, interpolationPercentage : number) : void {
    //     this.renderer.render(scene, this.camera);
    // }
}
