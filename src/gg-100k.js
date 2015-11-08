/* @flow */

import MainLoop          from 'mainloop.js';
import { EntityManager } from 'gg-entities';

import Game from './core/game';

import DI from './utility/dependency-injector';

window.onload = function() {
    let game = new Game(new EntityManager(), DI.rendererManager());
        
    MainLoop.setUpdate(delta => { game.update(delta); })
            .setDraw(interpolationPercentage => { game.render(interpolationPercentage); })
            .start();
};