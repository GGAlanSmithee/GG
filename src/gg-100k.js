/* @flow */

import MainLoop from 'mainloop.js';

import Game from './core/game';
import DI   from './utility/dependency-injector';

window.onload = async function() {
    let game = new Game(DI.entityManager(), DI.rendererManager());
    
    let levelLoader = DI.levelLoader();
    
    const level = await levelLoader.loadLevel('levels/level-one.json');
    
    console.log(level);
    
    MainLoop.setUpdate(delta => { game.update(delta); })
            .setDraw(interpolationPercentage => { game.render(interpolationPercentage); })
            .start();
};