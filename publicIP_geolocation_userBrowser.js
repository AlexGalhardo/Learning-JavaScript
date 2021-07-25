(async function(){
    
    // PUBLIC IP
    const response = await fetch('https://api.ipify.org/?format=json');
    const public_ip = await response.json();
    document.getElementById("public_ip").innerHTML = "<b>IP</b>: "+public_ip.ip;
    
    // GEOLOCATION
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            document.getElementById("latitude").innerHTML = "<b>Latitude: </b>" + position.coords.latitude;
            document.getElementById("longitude").innerHTML = "<b>Longitude: </b>" + position.coords.longitude;
        });
    }

    // USER BROWSER
    if(navigator.userAgent.indexOf("Chrome") != -1){
        document.getElementById("browser").innerHTML = '<b>Browser:</b> Google Chrome';
    } else {
        document.getElementById("browser").innerHTML = 'FireFox';
    }
}());