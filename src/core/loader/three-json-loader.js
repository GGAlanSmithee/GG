import THREE from 'three';

import ILoader from './i-loader';

export default class ThreeJSONLoader extends ILoader {
    constructor() {
        super();
        
        this.jsonLoader = new THREE.JSONLoader();
    }
    
    load(name) {
        // todo make asyncrounus synchrounus with promise and generator
        this.jsonLoader.load( 'meshes/level.nav.js', function( geometry, materials ) {
        }, null);
    }
    
    unload(name) {
        
    }
}