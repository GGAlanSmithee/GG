export default function(base, self) {
    let methodsNotImplemented = [];

    Object.getOwnPropertyNames(base.prototype).forEach(method => {
        if (!Object.getPrototypeOf(self).hasOwnProperty(method)) {
            methodsNotImplemented.push(method);
        }
    });
    
    if (methodsNotImplemented.length > 0) {
        throw new TypeError([self.constructor.name, 'does not implement', base.name, 'methods', ...methodsNotImplemented].join(' '));
    }
}