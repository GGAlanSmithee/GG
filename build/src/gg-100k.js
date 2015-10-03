/* @flow */

import MainLoop          from 'mainloop.js';
import { EntityManager } from 'gg-entities';

import Game from './core/game';

import ThreeRendererManager from './external/three-renderer-manager';

window.onload = function() {
    let game = new Game(new EntityManager(), new ThreeRendererManager());

    MainLoop.setUpdate(delta => { game.update(delta); })
            .setDraw(interpolationPercentage => { game.render(interpolationPercentage); })
            .start();
};