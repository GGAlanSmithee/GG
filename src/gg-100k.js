/* @flow */

import DI from './utility/dependency-injector';

import { FlatShading } from './constants/shading';

window.onload = async function() {
    const levelLoader = DI.levelLoader();
    const level       = await levelLoader.loadLevel('levels/level-one.json');
    
    const meshLoader = DI.meshLoader();
    const mesh       = await meshLoader.load('meshes/' + level.mesh, { shading : FlatShading });
    
    const sceneManager = DI.sceneManager();
    const sceneId      = sceneManager.createScene();
    
    sceneManager.addToScene(sceneId, mesh);
    sceneManager.addAmbientLightToScene(sceneId, 0x101030);
 	sceneManager.addDirectionalLightToScene(sceneId, 0xffeedd, 0, 0, 1);

    const entityManager   = DI.entityManager();
    const rendererManager = DI.rendererManager();
    const loopManager     = DI.loopManager();
    
    var meshIsAdded = true;
    
    document.addEventListener('click', e => {
        if (meshIsAdded) {
            sceneManager.removeFromScene(sceneId, mesh);
        } else {
            sceneManager.addToScene(sceneId, mesh);
        }
        
        meshIsAdded = !meshIsAdded;
    });
    
    loopManager.setUpdate(delta => {
                    mesh.rotation.y += 0.001 * delta;
                    entityManager.onLogic(delta);
                })
               .setRender(interpolationPercentage => rendererManager.render(sceneManager.getScene(sceneId), interpolationPercentage))
               .start();
};