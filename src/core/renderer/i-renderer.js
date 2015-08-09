import interfaceInstantiationCheck  from './../utility/interface-instantiation-check';
import interfaceImplementationCheck from './../utility/interface-implementation-check';

import DebugRenderer from './debug-renderer';
import ThreeRenderer from './three-renderer';

export default class IRenderer {
    constructor() {
        interfaceInstantiationCheck(IRenderer, this, [DebugRenderer, ThreeRenderer]);
        interfaceImplementationCheck(IRenderer, this);
    }
    
    update(delta) {
    }
    
    draw(interpolationPercentage) {
    }
}