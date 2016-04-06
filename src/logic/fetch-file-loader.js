/* @flow */
/* global fetch */

export default class FileLoader {
    get(path) {
        return fetch(path).then(res => {
                return typeof res === 'string' ? JSON.parse(res) : res;
            }).catch(err => {
                console.warn(err);
            });
    }
}