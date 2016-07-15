import GG from 'gg'

import velocity from '/home/ubuntu/workspace/editor/app/src/components/velocity.json'

import collision, { Components as collisionComponents } from '/home/ubuntu/workspace/editor/app/src/systems/logic/collision.js'


export default () => {
    const gg = new GG()
    
    gg.entityManager.registerComponent('velocity', velocity)



    gg.entityManager.registerLogicSystem('collision', collisionComponents, collision)



    return gg
}
