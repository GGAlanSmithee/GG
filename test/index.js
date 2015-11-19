import { EntityManager } from 'gg-entities';
import three from 'three';

const entityManager = new EntityManager();

window.onload = function() {
    async function Test() {
        const greeting = await new Promise(function(resolve, reject) {
                                    resolve("hi");
                                }).then(function(result) {
                                    return result;
                                }).catch(function(error) {
                                    console.warn(error);
                                });

        console.log(greeting);
    };

    Test();

    console.log(entityManager);
    console.log(three);
};