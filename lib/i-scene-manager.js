declare interface ISceneManager {
    getScene(sceneId : number) : Object;
    
    addToScene(sceneId : number, mesh : Object) : void;
    
    addAmbientLightToScene(sceneId : number, color : number) : void;
    
    addDirectionalLightToScene(sceneId : number, color : number, x : number, y : number, z : number) : void;
    
    createScene() : number;
}