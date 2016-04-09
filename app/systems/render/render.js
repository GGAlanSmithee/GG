import { SelectorType } from 'gg-entities';

export const Selector = SelectorType.GetWith;

export default (entities, delta, opts) => {
    console.log(Selector, opts);
    
    for (var entity of entities) {
        console.log(entity);
    }
};