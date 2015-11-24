declare class Stats {
    setMode(mode: 0 | 1): void;
    begin(): void;
    end(): void;
    
    domElement : HTMLElement;
}

declare module 'stats.js' {
    declare var exports: typeof Stats;
}