declare interface ISceneManager {
    getScene(sceneId : number) : Object;
    
    addToScene(sceneId : number, mesh : Object) : void;
    
    createScene() : number;
}