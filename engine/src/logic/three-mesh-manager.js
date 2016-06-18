/* @flow */

import three from 'three';

export default class ThreeMeshManager {
    meshes : Array<three.Mesh>;
    
    constructor() {
        this.meshes = [];
    }
    
    addMesh(object : three.Mesh) : number {
        return this.meshes.push(object) - 1;
    }
    
    getMesh(meshId : number) : three.Mesh {
        return this.meshes[meshId];
    }
}