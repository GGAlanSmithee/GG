import Interface       from './../utility/interface';
import ThreeJSONLoader from './three-json-loader';

export default class ILoader extends Interface {
    constructor() {
        super(ILoader, [ThreeJSONLoader]);
    }
    
    load(path, callback) {
    }
    
    unload(id) {
    }
}