import GG from 'gg'

import velocity from '/home/ubuntu/workspace/editor/app/src/components/velocity.json'

import movement, { Components as movementComponents } from '/home/ubuntu/workspace/editor/app/src/systems/logic/movement.js'


import entityData from '/home/ubuntu/workspace/editor/app/src/entities.json'

export default () => {
    const gg = new GG()
    
    gg.setEntityData(entityData)
    
    gg.entityManager.registerComponent('velocity', velocity)



    gg.entityManager.registerLogicSystem(movementComponents, movement)



    return gg
}
