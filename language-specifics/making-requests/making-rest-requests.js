window.onload = addListeners;


function makeRequest(verb, ep) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        const url = 'https://jsonplaceholder.typicode.com/' + ep;
        xhr.open(verb, url);
        xhr.onload = () => resolve(xhr.responseText)
        xhr.onerror = () => reject(xhr.responseStatus)

        switch (verb) {
            case 'get':
                xhr.send();
                break;
            case 'post':
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.send('title=foo&body=bar&userId=1')
                break;
            case 'put':
                xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                xhr.send(JSON.stringify({ id: 1, title: 'Abhinav', body: 'Abhinav updated', userId: 1 }))
                break;
            case 'delete':
                xhr.send();
                break;
        }



    })
}


function addListeners() {
    var container = document.getElementById('container');
    var dataContainer = document.getElementById('data');
    container.addEventListener('click', e => {
        switch (e.target.id) {
            case 'get':
                makeRequest('get', 'posts/1')
                    .then(data => {
                        dataContainer.innerHTML = data
                        console.log(data)
                    })

                break;

            case 'post':
                makeRequest('post', 'posts')
                    .then(data => {
                        dataContainer.innerHTML = data
                        console.log(data)
                    })
                break;

            case 'put':
                makeRequest('put', 'posts/1')
                    .then(data => {
                        dataContainer.innerHTML = data
                        console.log(data)
                    })
                break;


            case 'delete':
                makeRequest('delete', 'posts/1')
                    .then(data => {
                        dataContainer.innerHTML = data
                        console.log(data)
                    })
        }
    })

}