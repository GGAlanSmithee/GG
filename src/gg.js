/* @flow */

import DI from './utility/dependency-injector';

import { FlatShading } from './constants/shading';

window.onload = async function() {
    const levelLoader = DI.levelLoader();
    const level       = await levelLoader.loadLevel('levels/level-one.json');
    
    const meshLoader  = DI.meshLoader();
    const meshManager = DI.meshManager();
    const meshId      = meshManager.addMesh(await meshLoader.load('meshes/' + level.mesh, { shading : FlatShading }));
    
    const sceneManager = DI.sceneManager();
    const sceneId      = sceneManager.createScene();
    
    sceneManager.addToScene(sceneId, meshManager.getMesh(meshId));
    sceneManager.addAmbientLightToScene(sceneId, 0x101030);
 	sceneManager.addDirectionalLightToScene(sceneId, 0xffeedd, 0, 0, 1);

    const entityManager   = DI.entityManager();
    const rendererManager = DI.rendererManager();
    const loopManager     = DI.loopManager();
    
    var meshIsAdded = true;
    
    document.addEventListener('click', e => {
        if (meshIsAdded) {
            sceneManager.removeFromScene(sceneId, meshManager.getMesh(meshId));
        } else {
            sceneManager.addToScene(sceneId, meshManager.getMesh(meshId));
        }
        
        meshIsAdded = !meshIsAdded;
    });
    
    const performanceViewer = DI.performanceViewer();
    
    performanceViewer.setMode(0);
    
    loopManager.setUpdate(delta => {
                    meshManager.getMesh(meshId).rotation.y += 0.001 * delta;
                    entityManager.onLogic(delta);
                })
               .setRender(interpolationPercentage => {
                   performanceViewer.begin();
                   
                   rendererManager.render(sceneManager.getScene(sceneId), interpolationPercentage);
                   
                   performanceViewer.end();
               })
               .start();
};