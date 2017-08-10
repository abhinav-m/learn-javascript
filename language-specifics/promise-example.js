window.onload = getValue

function getValue() {
    const allURL = "https://fcctop100.herokuapp.com/api/fccusers/top/alltime";
    const recentURL = "https://fcctop100.herokuapp.com/api/fccusers/top/recent";
    fetch(allURL)
        .then((r) => {
            if (r.ok) {
                console.log(r);
                return r.blob();
            }
            throw new Error("Invalid network response.")
        })
        .then(function(b) {
                console.log(b);
                fetch(recentURL)
            }
        }