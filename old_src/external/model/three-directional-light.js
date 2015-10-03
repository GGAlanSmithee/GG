/* @flow */

import three from 'three';

export default class ThreeDirectionalLight {
    directionalLight : three.DirectionalLight;
    
    constructor(color : number) {
        this.directionalLight = new three.DirectionalLight(color);
    }
    
    setPosition(x : number, y : number, z : number) : void {
        this.directionalLight.position.set(x, y, z);
    }
}