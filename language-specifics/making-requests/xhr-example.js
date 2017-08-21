window.onload = loadData();

function xhrRequest() {
    //Wrapping in a promise
    return new Promise((resolve, reject) => {
        var i = 0;
        var xhr = new XMLHttpRequest();
        const url = 'https://api.github.com';
        xhr.open('GET', url);
        xhr.send();
        //onreadystatechange triggers whenever
        //readyState attribute changes (which is a property of xhr)
        //The callback is called from the user interface thread.
        /*  xhr.onreadystatechange = () => {
             console.log(i++);
             //If we dont check xhr.readyState === XMLHttpRequest.DONE, resolve would be triggered earlier, causing an issue.
             if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200)
                 resolve(xhr.responseText)
         } */

        //The XMLHttpRequestEventTarget.onload 
        //is the function called when an XMLHttpRequest transaction completes successfully.
        xhr.onload = () => resolve(xhr.responseText)
        xhr.onerror = () => reject(xhr.statusText)

    })
}


function loadData() {
    xhrRequest()
        .then((res) => console.log(res))
        .catch((e) => console.log(e))
}