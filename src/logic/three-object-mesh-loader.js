/* @flow */

import three from 'three';

export default class ThreeObjectMeshLoader {
    loader  : three.ObjectLoader;
    
    constructor() {
        this.loader  = new three.ObjectLoader();
    }
    
    onProgress() {
        // placeholder
    }
    
    // todo add options as a destructable object
    load(path : string) : Promise {
        const self = this;
        
        return new Promise((resolve, reject) => {
            self.loader.load(path, obj => {
                obj.traverse(child => {
                    if (child instanceof three.Mesh) {
    				    child.material = new three.MeshPhongMaterial({
    				        color: 0xdddddd,
    				        specular: 0x009900,
    				        shininess: 30,
    				        shading: three.FlatShading
    				    });
    				}
				});
				
                resolve(obj)
            },
            info => self.onProgress(info),
            err => reject(err));
        }).then(mesh => {
            //todo this now returns a scene.. implications?
            return mesh;
        }).catch(err => {
            console.warn(err);
        });
    }
}