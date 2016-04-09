import { SelectorType } from 'gg-entities';

export const Selector = SelectorType.GetWith;

export default (entities) => {
    for (var entity of entities) {
        console.log(entity);
    }
};