declare interface IMeshLoader {
    parse(sceneJson : Object) : Object;
    load(path : string, options? : { shading? : number }) : Promise;
}