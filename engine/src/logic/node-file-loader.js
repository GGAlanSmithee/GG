/* @flow */

export default class FileLoader {
    get(path) {
        return new Promise((resolve, reject) => {
                try {
                    resolve(require(path));
                } catch (err) {
                    reject(err);
                }
            }).then(res => {
                console.log(res);
                
                return typeof res === 'string' ? JSON.parse(res) : res;
            }).catch(err => {
                console.warn(err);
            });
    }
}