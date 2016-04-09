import { SelectorType } from 'gg-entities';

export const Selector   = SelectorType.GetWith;
export const Components = 0;

export default (entities) => {
    for (var entity of entities) {
        console.log(entity);
    }
};