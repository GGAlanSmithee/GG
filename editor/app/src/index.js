import GG from 'gg'

import velocity from '/home/ubuntu/workspace/editor/app/src/components/velocity.json'

import movement, { Components as movementComponents } from '/home/ubuntu/workspace/editor/app/src/systems/logic/movement.js'


export default () => {
    const gg = new GG()
    
    gg.entityManager.registerComponent('velocity', velocity)



    gg.entityManager.registerLogicSystem('movement', movementComponents, movement)



    return gg
}
