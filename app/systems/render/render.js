import { SelectorType } from 'gg-entities';

import TransformComponent from '../../special/transform.json';
import AppearanceComponent from '../../special/appearance.json';

export const Selector   = SelectorType.GetWith;
export const Components = TransformComponent | AppearanceComponent;

export default (entities, delta, opts) => {
    console.log(Selector, opts);
    
    for (var entity of entities) {
        console.log(entity);
    }
};