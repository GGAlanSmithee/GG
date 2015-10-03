declare type IRendererManager = {
    renderer : IRenderer;
    camera   : ICamera;
    
    draw(interpolationPercentage : number, scene : IScene) : void;
}