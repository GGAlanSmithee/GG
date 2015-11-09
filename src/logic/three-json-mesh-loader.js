import three from 'three';

export default class ThreeJSONMeshLoader {
    jsonLoader : three.JSONLoader;
    
    constructor() {
        this.jsonLoader = new three.JSONLoader;
    }
    
    // todo add options as a destructable object
    load(path : string) : Promise {
        return new Promise((resolve, reject) => {
            this.jsonLoader.load(path, (geometry, materials) => {
                // todo use materials being loaded
                resolve(geometry);
            });
        }).then(geometry => {
            return new three.Mesh(geometry, new three.MeshBasicMaterial({ color: 0xd79fd4 }));
        }).catch(err => {
            console.warn(err);
        });
    }
}