import Interface from './../../utility/interface';

export default class IRenderer extends Interface {
    constructor(derrivedClass) {
        super(IRenderer, derrivedClass);
    }
    
    update(delta) {
    }
    
    draw(interpolationPercentage, scene) {
    }
}