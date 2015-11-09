/* @flow */

import Game from './core/game';
import DI   from './utility/dependency-injector';

window.onload = async function() {
    let game = new Game(DI.entityManager(), DI.rendererManager());
    
    let levelLoader = DI.levelLoader();
    
    const level = await levelLoader.loadLevel('levels/level-one.json');
    
    console.log(level);
    
    const loopManager = DI.loopManager();
    
    loopManager.setUpdate(delta => { game.update(delta); })
               .setRender(interpolationPercentage => { game.render(interpolationPercentage); })
               .start();
};