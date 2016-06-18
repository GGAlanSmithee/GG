declare interface ILevelLoader {
    ajaxLoader   : IAjaxLoader;

    loadLevel(path : string) : Promise;
}