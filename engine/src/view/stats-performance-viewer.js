/* @flow */

import Stats from 'stats.js';

export default class StatsPerformanceViewer {
    stats : Stats;
    
    constructor() {
        this.stats = new Stats();
        
        if (typeof window !== 'undefined') {
            this.stats.domElement.style.position = 'absolute';
            this.stats.domElement.style.left = '0px';
            this.stats.domElement.style.top = '0px';
             
            document.body.appendChild(this.stats.domElement);
        }
    }
    
    setMode(mode: 0 | 1): void {
        this.stats.setMode(mode);
    }
    
    begin() : void {
        this.stats.begin();
    }
    
    end() : void {
        this.stats.end();
    }
}
