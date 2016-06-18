/* @flow */

export default class LevelLoader {
    ajaxLoader   : IAjaxLoader;

    constructor(ajaxLoader : IAjaxLoader) {
        this.ajaxLoader   = ajaxLoader;
    }
    
    async loadLevel(path : string) : Promise {
        return await this.ajaxLoader.get(path);
    }
}