declare class Qwest {
    get(path : string) : Promise;
}

declare module qwest {
    declare var exports: Qwest;
}