/* @flow */

import ThreeScene from './../external/model/three-scene';

export default class ThreeSceneService {
    createScene() : IScene {
        return new ThreeScene();
    }
}