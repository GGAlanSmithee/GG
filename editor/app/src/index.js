import GG from './gg'

import appearance from '/home/ubuntu/workspace/editor/app/src/components/appearance.json'
import transform from '/home/ubuntu/workspace/editor/app/src/components/transform.json'
import velocity from '/home/ubuntu/workspace/editor/app/src/components/velocity.json'
import createunit, { Components as createunitComponents } from '/home/ubuntu/workspace/editor/app/src/systems/init/create-unit.js'
import collision, { Components as collisionComponents } from '/home/ubuntu/workspace/editor/app/src/systems/logic/collision.js'
import movement, { Components as movementComponents } from '/home/ubuntu/workspace/editor/app/src/systems/logic/movement.js'
import render, { Components as renderComponents } from '/home/ubuntu/workspace/editor/app/src/systems/render/render.js'

export default () => {
    const gg = new GG()
    
    gg.entityManager.registerComponent('appearance', appearance)
    gg.entityManager.registerComponent('transform', transform)
    gg.entityManager.registerComponent('velocity', velocity)

    gg.entityManager.registerInitSystem('createunit', createunitComponents, createunit)

    gg.entityManager.registerLogicSystem('collision', collisionComponents, collision)
    gg.entityManager.registerLogicSystem('movement', movementComponents, movement)

    gg.entityManager.registerRenderSystem('render', renderComponents, render)

    return gg
}
