declare type IRenderer = {
    setSize(width : number, height : number) : void;
    
    getCanvas() :HTMLCanvasElement;
    
    render(scene : IScene, camera : ICamera) : void;
    
}