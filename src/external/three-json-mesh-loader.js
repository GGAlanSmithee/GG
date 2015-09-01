import three       from 'three';
import IMeshLoader from './interface/i-mesh-loader';

export default class ThreeJSONMeshLoader extends IMeshLoader {
    constructor() {
        super(ThreeJSONMeshLoader);
        
        this.jsonLoader = new three.JSONLoader();
    }
    
    load(path) {
        return new Promise((resolve, reject) => {
            this.jsonLoader.load(path, (geometry, materials) => {
                resolve(new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
    		        		color: 0xd79fd4,
    		        		opacity: 0.5,
    		        		transparent: true
    		        	})));
            });
        }).then(mesh => {
            return mesh;
        }).catch(err => {
            console.warn(err);
        });
    }
}