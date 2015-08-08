var Entities = require('gg-entities');

export default class Game {
    constructor() {
        this.entityManager = new Entities.EntityManager(200);
    }
    
    update(delta) {
        this.entityManager.onLogic(delta);
    }
    
    draw(interpolationPercentage) {
        this.entityManager.onRender(interpolationPercentage);
    }
}