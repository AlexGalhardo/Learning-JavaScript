function refreshDateTime(){
    mytime = setTimeout(displayDateTime(), 1000);
}

async function displayDateTime() {
    var date = new Date();
    var today = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
    var realTime = date.getHours() + " : " + date.getMinutes() + " : " + date.getSeconds();
    document.getElementById('today').innerHTML = "<b>Today:</b> " + today;
    document.getElementById('realTime').innerHTML = "<b>Real Time:</b> " + realTime;
    refreshDateTime();
}