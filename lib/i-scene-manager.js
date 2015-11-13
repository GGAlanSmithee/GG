declare interface ISceneManager {
    createScene() : number;
    
    getScene(sceneId : number) : Object;
    
    addToScene(sceneId : number, object : Object) : void;
    
    addAmbientLightToScene(sceneId : number, color : number) : void;
    
    addDirectionalLightToScene(sceneId : number, color : number, x : number, y : number, z : number) : void;
    
    removeFromScene(sceneId : number, object : Object) : void;
}