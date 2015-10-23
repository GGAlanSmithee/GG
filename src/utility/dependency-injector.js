/* @flow*/

import ThreeRendererManager from './../external/three-renderer-manager';

type Type = number;

export default {
    rendererManager() : IRendererManager {
        return new ThreeRendererManager();
    }
};