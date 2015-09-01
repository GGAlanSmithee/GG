import Interface from './../../utility/interface';

export default class IAjaxLoader extends Interface {
    constructor(derrivedClass) {
        super(IAjaxLoader, derrivedClass);
    }
    
    get(path) {
        return qwest.get(path).then(function(xhr, response) { return JSON.parse(response.text); });
    }
}