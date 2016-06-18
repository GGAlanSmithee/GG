/* @flow*/

import { EntityManager } from 'gg-entities';

import ThreeRendererManager   from '../view/three-renderer-manager';
import StatsPerformanceViewer from '../view/stats-performance-viewer';

import ThreeSceneManager     from '../logic/three-scene-manager';
import ThreeMeshManager      from '../logic/three-mesh-manager';
import ThreeObjectMeshLoader from '../logic/three-object-mesh-loader';
import QWestAjaxLoader       from '../logic/qwest-ajax-loader';
import LevelLoader           from '../logic/level-loader';
import MainLoopLoopManager   from '../logic/mainloop-loop-manager';

export default {
    rendererManager() : IRendererManager { return new ThreeRendererManager(); },

    sceneManager() : ISceneManager { return new ThreeSceneManager(); },
    
    meshManager() : IMeshManager { return new ThreeMeshManager(); },

    levelLoader() : ILevelLoader { return new LevelLoader(new QWestAjaxLoader()); },
    
    entityManager() : IEntityManager { return new EntityManager(); },
    
    loopManager() : ILoopManager { return new MainLoopLoopManager(); },
    
    meshLoader() : IMeshLoader { return new ThreeObjectMeshLoader(); },
    
    performanceViewer() : IPerformanceViewer { return new StatsPerformanceViewer(); }
};