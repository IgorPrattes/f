var clsMain = document.getElementById("showcase")



function generateCard() {
    clsMain.innerHTML = '';


    var reqTimeWorld = new XMLHttpRequest();

    reqTimeWorld.open("GET", "http://worldtimeapi.org/api/timezone")

    reqTimeWorld.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const genTime = JSON.parse(this.responseText)
            for (var i = 0; i < 12; i++) {
                var random = Math.floor(Math.random() * genTime.length);
                var objRandom = genTime[random]
                RandomF(i, objRandom)
            }
        }
    }
    reqTimeWorld.send()
}

function RandomF(i, arg) {
    const reqLocal = new XMLHttpRequest();
    reqLocal.open("GET", "https://worldtimeapi.org/api/timezone/" + arg)


    reqLocal.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var objLocal = JSON.parse(this.responseText)
            var place = objLocal.timezone
            var fuso = objLocal.utc_offset
            const hourTime = objLocal.datetime
            console.log(objLocal)

            clsMain.innerHTML += "<div class = 'cards' id='" + i + "'>" + place + "<br>" + "UTC: " + fuso + "<br>" + "<p id='" + i + "hora'></p></div><br>"
            Seconds(hourTime, i)
        }
    }
    reqLocal.send()
}





function Seconds(obj, i) {
    var year = parseInt(obj.substring(0, 4))
    var month = obj.substring(5, 7)
    var day = obj.substring(8, 10)

    var hours = obj.substring(11, 13)
    var minutes = obj.substring(14, 16)
    var seconds = obj.substring(17, 19)

    var data = new Date(year, month, day, hours, minutes, seconds)

    setInterval(function () {
        var temp = data.getSeconds()
        data.setSeconds(temp + 1)

        document.getElementById(i + "hora").innerHTML = data.getDate() + "/" + data.getMonth() + "/" + data.getFullYear() + "<br>" + data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds() + "s"


    }, 1000)

}