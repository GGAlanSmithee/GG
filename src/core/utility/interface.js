import interfaceInstantiationCheck  from './../utility/interface-instantiation-check';
import interfaceImplementationCheck from './../utility/interface-implementation-check';

export default class Interface {
    constructor(type, implementingClasses) {
        interfaceInstantiationCheck(type, this, implementingClasses);
        interfaceImplementationCheck(type, this);
    }
}