import Interface     from './../utility/interface';
import DebugRenderer from './debug-renderer';
import ThreeRenderer from './three-renderer';

export default class IRenderer extends Interface {
    constructor() {
        super(IRenderer, [DebugRenderer, ThreeRenderer]);
    }
    
    update(delta) {
    }
    
    draw(interpolationPercentage) {
    }
}