import interfaceInstantiationCheck  from './interface-instantiation-check';
import interfaceImplementationCheck from './interface-implementation-check';

export default class Interface {
    constructor(type, implementingClasses) {
        interfaceInstantiationCheck(type, this, implementingClasses);
        interfaceImplementationCheck(type, this);
    }
}