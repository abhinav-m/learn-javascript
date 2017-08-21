window.onload = loadData;

function loadData() {

    fetch('http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1')
        .then(r => console.log(r))
        .then(r => {
            console.log(r)
            document.getElementById('content').innerHTML = r;
        })
}