/* @flow*/

import ThreeRendererManager from './../logic/three-renderer-manager';
import QWestAjaxLoader      from './../logic/qwest-ajax-loader';
import LevelLoader          from './../logic/level-loader';
import { EntityManager }    from 'gg-entities';

export default {
    rendererManager() : IRendererManager {
        return new ThreeRendererManager();
    },

    levelLoader() : ILevelLoader {
        return new LevelLoader(new QWestAjaxLoader());
    },
    
    entityManager() : IEntityManager {
        return new EntityManager();
    }
};