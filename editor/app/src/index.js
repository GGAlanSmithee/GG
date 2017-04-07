import {GG, EntityManager} from 'gg'

import name from '/home/ubuntu/workspace/editor/app/src/components/name.json'
import velocity from '/home/ubuntu/workspace/editor/app/src/components/velocity.json'

import movement, { Components as movementComponents } from '/home/ubuntu/workspace/editor/app/src/systems/logic/movement.js'
import display, { Components as displayComponents } from '/home/ubuntu/workspace/editor/app/src/systems/render/display.js'

import entityData from '/home/ubuntu/workspace/editor/app/src/entities.json'

export const create = () => {
    const gg = new GG()
    
    gg.setEntityData(entityData)
    
    gg.entityManager.registerComponent('name', name)
    gg.entityManager.registerComponent('velocity', velocity)



    gg.entityManager.registerLogicSystem(movementComponents, movement)

    gg.entityManager.registerRenderSystem(displayComponents, display)

    return gg
}