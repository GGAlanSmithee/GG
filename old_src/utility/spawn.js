// http://davidwalsh.name/async-generators
// run (async) a generator to completion
// Note: simplified approach: no error handling here
export default function(generator) {
    var it = generator(), ret;

    // asynchronously iterate over generator
    (function iterate(val){
        ret = it.next(val);

        if (!ret.done) {
            if ('then' in ret.value) {
                // wait on the promise
                ret.value.then(iterate);
            }
            // immediate value: just send right back in
            else {
                // avoid synchronous recursion
                setTimeout(function() {
                    iterate(ret.value);
                }, 0);
            }
        }
    })();
}