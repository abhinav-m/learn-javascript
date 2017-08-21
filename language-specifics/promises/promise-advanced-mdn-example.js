window.onload = run;
var promiseCount = 0;
var timer = 0;

function run() {
    document.getElementById("test").onclick = testPromise;
}


function testPromise() {
    let thisPromiseCount = ++promiseCount;
    timer += 200;
    let log = document.getElementById('log');
    log.insertAdjacentHTML('beforeend', thisPromiseCount +
        ') Started (<small>Sync code started</small>)<br/>');

    // We make a new promise: we promise a numeric count of this promise, starting from 1 (after waiting 3s)
    let p1 = new Promise(
        // The resolver function is called with the ability to resolve or
        // reject the promise
        (resolve, reject) => {
            log.insertAdjacentHTML('beforeend', thisPromiseCount +
                ') Executor ran immediately (<small>Executor code started from promise</small>)<br/>');
            log.insertAdjacentHTML('beforeend', thisPromiseCount +
                ') Promise started (<small>Async call made </small>)<br/>');
            // This is only an example to create asynchronism
            window.setTimeout(
                function() {
                    // We fulfill the promise !
                    resolve(thisPromiseCount);
                }, timer);
        }
    );

    // We define what to do when the promise is resolved/rejected with the then() call,
    // and the catch() method defines what to do if the promise is rejected.
    p1.then(
            // Log the fulfillment value
            function(val) {
                log.insertAdjacentHTML('beforeend', val +
                    ') Promise fulfilled (<small>Async call completed </small>)<br/>');
            })
        .catch(
            // Log the rejection reason
            (reason) => {
                console.log('Handle rejected promise (' + reason + ') here.');
            });

    log.insertAdjacentHTML('beforeend', thisPromiseCount +
        ') Promise made (<small>Sync code terminated</small>)<br/>');
}