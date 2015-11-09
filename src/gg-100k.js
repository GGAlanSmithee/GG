/* @flow */

import Game from './core/game';
import DI   from './utility/dependency-injector';

window.onload = async function() {
    const game = new Game(DI.entityManager(), DI.rendererManager());
    
    const levelLoader = DI.levelLoader();
    
    const level = await levelLoader.loadLevel('levels/level-one.json');
    
    console.log(level);
    
    const meshLoader = DI.meshLoader();
    
    const mesh = await meshLoader.load('meshes/' + level.mesh);
    
    console.log(mesh);
    
    const loopManager = DI.loopManager();
    
    loopManager.setUpdate(delta => { game.update(delta); })
               .setRender(interpolationPercentage => { game.render(interpolationPercentage); })
               .start();
};