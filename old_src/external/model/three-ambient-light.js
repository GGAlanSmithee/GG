/* @flow */

import three from 'three';

export default class ThreeAmbientLight {
    ambientLight : three.AmbientLight;
    
    constructor(color : number) {
        this.ambientLight = new three.AmbientLight(color);
    }
}