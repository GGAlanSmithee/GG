/* @flow */

import { EntityManager } from 'gg-entities';

export default class Game {
    entityManager   : EntityManager;
    rendererManager : IRendererManager;
    level           : ILevel;
    
    constructor(entityManager : EntityManager, rendererManager : IRendererManager, level : ILevel) {
        this.entityManager   = entityManager;
        this.rendererManager = rendererManager;
        this.level           = level;
    }
    
    update(delta : number) {
        
    }
    
    draw(interpolationPercentage : number) {
        this.rendererManager.draw(interpolationPercentage, this.level.scene);
    }
}