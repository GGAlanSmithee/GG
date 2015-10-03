/* @flow */

export default class Game {
    entityManager   : IEntityManager;
    rendererManager : IRendererManager;
    
    constructor(entityManager : IEntityManager, rendererManager : IRendererManager) {
        this.entityManager   = entityManager;
        this.rendererManager = rendererManager;
    }
    
    update(delta : number) : void {
        this.entityManager.onLogic(delta);
    }
    
    render(interpolationPercentage : number) : void {
        this.rendererManager.render(interpolationPercentage);
    }
}