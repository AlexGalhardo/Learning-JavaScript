// Pegar do horário atual
var timestamp = new Date().getTime();
console.log(timestamp)

// Pegar de uma data específica
var timestamp2 = new Date(2013, 11, 17).getTime();
console.log(timestamp2)

let now = new Date();
let day = now.getDate();
let month = now.getMonth()+1;
let year = now.getFullYear();
let hours = now.getHours();
let minutes = now.getMinutes();
let seconds = now.getSeconds();

function fixZero(time){
    return time < 10 ? `0${time}` : time;
}

console.log(now, fixZero(hours), fixZero(minutes), fixZero(seconds));
console.log(new Date().toLocaleString());
console.log(`${fixZero(day)}/${fixZero(month)}/${year} ${fixZero(hours)}:${fixZero(minutes)}:${fixZero(seconds)}`)