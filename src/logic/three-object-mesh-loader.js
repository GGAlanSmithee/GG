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
    
    parse(json) {
        return this.loader.parse(json)
    }
    
    // todo this now returns a scene.. implications?
    // todo add options as a destructable object -> stopped by flow: https://github.com/facebook/flow/issues/183
    load(path : string, options? : Object) : Promise {
        const self = this;
        
        const shading = (options || { }).shading;
        
        return new Promise((resolve, reject) => {
            try {
                self.loader.load(path, obj => resolve(obj), info => self.onProgress(info), err => reject(err));
            } catch (error) {
                reject(error);
            }
        }).then(mesh => {
            if (typeof shading !== 'number') {
                return mesh;
            }
            
            mesh.traverse(child => {
                if (child instanceof three.Mesh) {
                   child.material.shading = shading;
               }
            });
            
            return mesh;
        }).catch(err => {
            console.warn(err);
        });
    }
}