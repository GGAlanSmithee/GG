import Entities from 'gg-entities';

export default class Game {
    constructor(renderer) {
        this.renderer = renderer;
        
        this.entityManager = new Entities.EntityManager(200);
    }
    
    update(delta) {
        this.renderer.update(delta);
    }
    
    draw(interpolationPercentage) {
        this.renderer.draw(interpolationPercentage);
    }
}