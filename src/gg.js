/* @flow */

import { EntityManager } from 'gg-entities';

import * as DI from './DI';

export default class GG {
    constructor(di) {
        this.entityManager = new EntityManager();
        
        console.log(di);
    }
    
    start() {
        // const fileLoader = DI.fileLoader();
        
        // fileLoader.get(path).then(res => {
        //     console.log(res);
        // });
        
        const loopManager = DI.loopManager();
        
        //loopManager.setUpdate(delta => this.entityManager.onLogic(delta));
        loopManager.setUpdate(delta => { });
        loopManager.setRender(interpolationPercentage => { });
        loopManager.start();
    }
}
// import { FlatShading } from './constants/shading';

// window.onload = async function() {
//     const levelLoader       = DI.levelLoader();
//     const meshLoader        = DI.meshLoader();
//     const meshManager       = DI.meshManager();
//     const sceneManager      = DI.sceneManager();
//     const entityManager     = DI.entityManager();
//     const rendererManager   = DI.rendererManager();
//     const loopManager       = DI.loopManager();
//     const performanceViewer = DI.performanceViewer();
    
//     const sceneId = sceneManager.createScene();
    
//     const level  = await levelLoader.loadLevel('levels/level-one.json');
//     const meshId = meshManager.addMesh(await meshLoader.load('meshes/' + level.mesh, { shading : FlatShading }));
    
//     sceneManager.addToScene(sceneId, meshManager.getMesh(meshId));
//     sceneManager.addAmbientLightToScene(sceneId, 0x101030);
//  	sceneManager.addDirectionalLightToScene(sceneId, 0xffeedd, 0, 0, 1);
    
//     var meshIsAdded = true;
    
//     document.addEventListener('click', e => {
//         if (meshIsAdded) {
//             sceneManager.removeFromScene(sceneId, meshManager.getMesh(meshId));
//         } else {
//             sceneManager.addToScene(sceneId, meshManager.getMesh(meshId));
//         }
        
//         meshIsAdded = !meshIsAdded;
//     });
    
//     performanceViewer.setMode(0);
    
//     loopManager.setUpdate(delta => {
//                     meshManager.getMesh(meshId).rotation.y += 0.001 * delta;
//                     entityManager.onLogic(delta);
//                 })
//               .setRender(interpolationPercentage => {
//                   performanceViewer.begin();
                   
//                   rendererManager.render(sceneManager.getScene(sceneId), interpolationPercentage);
                   
//                   performanceViewer.end();
//               })
//               .start();
// };