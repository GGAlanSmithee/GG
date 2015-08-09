import IRenderer from './i-renderer';

export default class DebugRenderer extends IRenderer {
    update(delta) {
        console.log('debug update', delta);
    }
    
    draw(interpolationPercentage) {
        console.log('debug draw', interpolationPercentage);
    }
}