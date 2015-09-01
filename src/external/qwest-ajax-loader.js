import qwest from 'qwest';

import IAjaxLoader from './interface/i-ajax-loader'

export default class QwestAjaxLoader extends IAjaxLoader {
    constructor() {
        super(QwestAjaxLoader);
    }
    
    get(path) {
        return qwest.get(path).then(function(xhr, response) { return JSON.parse(response); });
    }
}