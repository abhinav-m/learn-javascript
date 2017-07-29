window.onload = initAll;

function initAll() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(makeCall)
    } else
        alert("your browser doesn't support this!");

    function makeCall(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var url = "https://api.darksky.net/forecast/b185ccffd3fe5dc262bda8424f07ee7e/" + latitude + "," + longitude;
        var httpReq = new XMLHttpRequest();
        httpReq.open('GET', url, true);
        // httpReq.setRequestHeader('origin', 'Access-Control-Allow-Origin');
        httpReq.setRequestHeader("Content-Type", "application/json");
        httpReq.onreadystatechange = callback;
        httpReq.send();

        function callback() {
            document.getElementById("content").innerHTML = httpReq.responseText;

        }
    }

}