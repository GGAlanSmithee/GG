import { EntityManager } from 'gg-entities';

export default class Game {
    constructor(renderer) {
        this.renderer      = renderer;
        this.level         = null;
        this.entityManager = new EntityManager(200);
    }
    
    setLevel(level) {
        this.level = level;
    }
    
    update(delta) {
        this.renderer.update(delta);
    }
    
    draw(interpolationPercentage) {
        this.renderer.draw(interpolationPercentage, this.level.scene);
    }
}