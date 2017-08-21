window.onload = makeCall

function makeCall() {
    const url = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1'
    fetch('https://proxy-sauce.glitch.me/' + url)
        .then(r => r.json())
        .then(r => {
            console.log(r[0])
            document.getElementById('content').innerHTML = JSON.stringify(r[0]);
        })
}