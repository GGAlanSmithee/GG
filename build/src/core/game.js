/* @flow */

export default class Game {
    constructor(entityManager, rendererManager) {
        this.entityManager   = entityManager;
        this.rendererManager = rendererManager;
    }

    update(delta) {
        this.entityManager.onLogic(delta);
    }

    render(interpolationPercentage) {
        this.rendererManager.render(interpolationPercentage);
    }
}