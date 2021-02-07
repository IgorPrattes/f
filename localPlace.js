const locali = document.getElementById('1')
const fusoHorario = document.getElementById('2')
const horarios = document.getElementById('3')
var locality = document.getElementById("divisorCard");

function local(local) {

    const request = new XMLHttpRequest();
    const loc = document.getElementById('local')

    loc.innerHTML = '<option style="display:none;" selected>Selecione...</option>'

    request.open('GET', `https://worldtimeapi.org/api/timezone/${local}`, true)

    request.onreadystatechange = function () {
        if (request.status == 200 && request.readyState == 4) {

            const locais = JSON.parse(request.responseText)

            for (var i = 0; i < locais.length; i++) {
                loc.innerHTML += `<option value='${locais[i]}'>${locais[i]}</option>`

            }
        }

    }

    request.send();
}

function localidade(arg) {

    let request = new XMLHttpRequest();

    request.open('GET', "https://worldtimeapi.org/api/timezone/" + arg)

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            locality.className = "content2"

            let obj = JSON.parse(this.responseText)

            const location = obj.timezone
            const fuso = obj.utc_offset
            const horario = obj.datetime

            segundo(horario, horarios)

            console.log(obj)
            locali.innerHTML = location + "<br>"
            fusoHorario.innerHTML = "UTC: " + fuso + "<br>"
        }
    }
    request.send();
}

var cont = 0;
function segundo(obj, i) {
    clearInterval(cont)
    var ano = parseInt(obj.substring(0, 4))
    var mes = obj.substring(5, 7)
    var dia = obj.substring(8, 10)

    var horas = obj.substring(11, 13)
    var minuto = obj.substring(14, 16)
    var seg = obj.substring(17, 19)

    var data = new Date(ano, mes, dia, horas, minuto, seg)

    cont = setInterval(function () {
        var temp = data.getSeconds()
        data.setSeconds(temp + 1)

        document.getElementById('3').innerHTML = data.getDate() + "/" + data.getMonth() + "/" + data.getFullYear() + "<br>" + data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds() + "s"


    }, 1000)

}