declare interface IMeshLoader {
    load(path : string, options? : { shading? : number }) : Promise;
}