declare type ILevelService = {
    sceneService : ISceneService;
    ajaxLoader   : IAjaxLoader;
    meshLoader   : IMeshLoader;

    loadLevel(path : string) : Promise;
}