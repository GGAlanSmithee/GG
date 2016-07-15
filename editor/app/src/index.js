import GG from 'gg'



import collision, { Components as collisionComponents } from '/home/ubuntu/workspace/editor/app/src/systems/logic/collision.js'
import shoot, { Components as shootComponents } from '/home/ubuntu/workspace/editor/app/src/systems/logic/shoot.js'


export default () => {
    const gg = new GG()
    




    gg.entityManager.registerLogicSystem('collision', collisionComponents, collision)
    gg.entityManager.registerLogicSystem('shoot', shootComponents, shoot)



    return gg
}
