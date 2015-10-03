/* @flow */

export default class Level {
    name         : string;
    scene        : IScene;
    navMeshGroup : any;
    
    constructor(name : string, scene : IScene, navMeshGroup : any) {
        this.name         = name;
        this.scene        = scene;
        this.navMeshGroup = navMeshGroup;
    }
}