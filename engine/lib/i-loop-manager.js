declare interface ILoopManager {
    setUpdate(updateFunction: (delta : number) => void): ILoopManager;
    setRender(renderFunction: (interpolationPercentage : number) => void): ILoopManager;
    start(): void;
}