import Interface               from './../utility/interface';
import GraphicsResourceManager from './graphics-resource-manager';

export default class IResourceManager extends Interface {
    constructor() {
        super(IResourceManager, [GraphicsResourceManager]);
    }
    
    load(id) {
    }
    
    unload(id) {
    }
}