import GG from 'gg'



import a, { Components as aComponents } from '/home/ubuntu/workspace/editor/app/src/systems/logic/a.js'
import b, { Components as bComponents } from '/home/ubuntu/workspace/editor/app/src/systems/logic/b.js'
import collision, { Components as collisionComponents } from '/home/ubuntu/workspace/editor/app/src/systems/logic/collision.js'


export default () => {
    const gg = new GG()
    




    gg.entityManager.registerLogicSystem('a', aComponents, a)
    gg.entityManager.registerLogicSystem('b', bComponents, b)
    gg.entityManager.registerLogicSystem('collision', collisionComponents, collision)



    return gg
}
