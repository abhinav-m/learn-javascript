window.onload = getValue

function getValue() {
    const allURL = "https://fcctop100.herokuapp.com/api/fccusers/top/alltime";
    const recentURL = "https://fcctop100.herokuapp.com/api/fccusers/top/recent";
    fetch(allURL)
        .then(r => r.ok ? r.json() : new Error("Invalid response"))
        .then(r => document.getElementById("data").innerHTML = JSON.stringify(r))

    fetch(recentURL)
        .then(r => r.ok ? r.json() : new Error("Invalid response"))
        .then((r) => document.getElementById("data").innerHTML = JSON.stringify(r))

}