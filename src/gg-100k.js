/* @flow */

// todo move three and light related functionality to its own class
import three from 'three';

import DI from './utility/dependency-injector';

window.onload = async function() {
    const entityManager   = DI.entityManager();
    const rendererManager = DI.rendererManager();
    const sceneManager    = DI.sceneManager();
    const levelLoader     = DI.levelLoader();
    const meshLoader      = DI.meshLoader();
    
    const sceneId = sceneManager.createScene();
    
    const level = await levelLoader.loadLevel('levels/level-one.json');
    
    let mesh = await meshLoader.load('meshes/' + level.mesh);
    
    sceneManager.addToScene(sceneId, mesh);
    
    // todo move three and light related functionality to its own class
    sceneManager.addToScene(sceneId, new three.AmbientLight(0x101030));
	
	const directionalLight = new three.DirectionalLight(0xffeedd);
	directionalLight.position.set(0, 0, 1);
	
 	sceneManager.addToScene(sceneId, directionalLight);

    const loopManager = DI.loopManager();
    
    loopManager.setUpdate(delta => {
                    mesh.rotation.y += 0.01;
                    entityManager.onLogic(delta);
                })
               .setRender(interpolationPercentage => rendererManager.render(sceneManager.getScene(sceneId), interpolationPercentage))
               .start();
};