import three from 'three';

export default class ThreeJSONMeshLoader {
    jsonLoader : three.JSONLoader;
    
    constructor(jsonLoader : IJSONLoader) {
        this.jsonLoader = jsonLoader;
    }
    
    load(path : string) : Promise {
        return new Promise((resolve, reject) => {
            this.jsonLoader.load(path, (geometry, materials) => {
                resolve(new three.Mesh(geometry, new three.MeshBasicMaterial({
    		        		color: 0xd79fd4,
    		        		opacity: 0.5,
    		        		transparent: true
    		        	})));
            });
        }).then(mesh => {
            
            console.log(mesh);
            
            return mesh;
        }).catch(err => {
            console.warn(err);
        });
    }
}