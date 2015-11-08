/* @flow */

import qwest from 'qwest';

export default class QwestAjaxLoader {
    get(path : string) : Promise {
        return qwest.get(path).then(function(xhr, res) {
            return typeof res === 'string' ? JSON.parse(res) : res;
        });
    }
}