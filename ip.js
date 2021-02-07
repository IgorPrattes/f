const ip = document.getElementById('0')
const local = document.getElementById('1')
const fusoHorario = document.getElementById('2')
const horarios = document.getElementById('3')

function consulta() {

    let request = new XMLHttpRequest();

    request.open('GET', "https://worldtimeapi.org/api/ip")

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {

            let obj = JSON.parse(this.responseText)

            const ip = obj.client_ip
            const localizacao = obj.timezone
            const fuso = obj.utc_offset
            const horario = obj.datetime

            Seconds(horario, horarios)


            local.innerHTML = "Seu IP: " + ip + "<br>" + "<br>" + localizacao + "<br>"
            fusoHorario.innerHTML = "UTC: " + fuso + "<br>"


        }
    }

    request.send();
}

consulta();



function consultaIp() {

    let reqIp = new XMLHttpRequest();

    reqIp.open('GET', "https://worldtimeapi.org/api/ip")

    reqIp.onreadystatechange = function () {
        if (reqIp.readyState == 4 && reqIp.status == 200) {

            let ipPlace = JSON.parse(this.responseText);
            let ipCatch = document.getElementById("0");
            console.log(ipPlace)

            ipCatch.innerHTML = ipPlace.client_ip + "<br>"
            Seconds(ipPlace, ipCatch)

        }
    }
    reqIp.send()

}

function Seconds(obj, i) {
    var ano = parseInt(obj.substring(0, 4))
    var mes = obj.substring(5, 7)
    var dia = obj.substring(8, 10)

    var horas = obj.substring(11, 13)
    var minuto = obj.substring(14, 16)
    var seg = obj.substring(17, 19)


    var data = new Date(ano, mes, dia, horas, minuto, seg)


    setInterval(function () {
        var temp = data.getSeconds()
        data.setSeconds(temp + 1)

        document.getElementById('3').innerHTML = data.getDate() + "/" + data.getMonth() + "/" + data.getFullYear() + "<br>" + data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds() + "s"


    }, 1000)

}