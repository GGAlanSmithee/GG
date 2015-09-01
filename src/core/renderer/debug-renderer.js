import IRenderer from './i-renderer';

export default class DebugRenderer extends IRenderer {
    constructor() {
        super(DebugRenderer)
    }
    
    update(delta) {
        console.log('debug update', delta);
    }
    
    draw(interpolationPercentage, scene) {
        console.log('debug draw', interpolationPercentage, scene);
    }
}