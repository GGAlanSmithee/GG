/* @flow*/

import ThreeRendererManager  from '../logic/three-renderer-manager';
import ThreeSceneManager     from '../logic/three-scene-manager';
import ThreeObjectMeshLoader from '../logic/three-object-mesh-loader';
import QWestAjaxLoader       from '../logic/qwest-ajax-loader';
import LevelLoader           from '../logic/level-loader';
import { EntityManager }     from 'gg-entities';
import MainLoopLoopManager   from '../logic/mainloop-loop-manager';

export default {
    rendererManager() : IRendererManager { return new ThreeRendererManager(); },

    sceneManager() : ISceneManager { return new ThreeSceneManager(); },

    levelLoader() : ILevelLoader { return new LevelLoader(new QWestAjaxLoader()); },
    
    entityManager() : IEntityManager { return new EntityManager(); },
    
    loopManager() : ILoopManager { return new MainLoopLoopManager(); },
    
    meshLoader() : IMeshLoader { return new ThreeObjectMeshLoader(); }
};