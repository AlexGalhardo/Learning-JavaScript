const secondsContainer = document.querySelector('#seconds');
const minutesContainer = document.querySelector('#minutes');
const hoursContainer = document.querySelector('#hours');
const daysContainer = document.querySelector('#days');
const nextYearContainer = document.querySelector('#year');
const spinnerLoading = document.querySelector('#loading');
const countdownContainer = document.querySelector('#countdown');

const nextYear = new Date().getFullYear() + 1;
const newYearTime = new Date(`January 01 ${nextYear} 00:00:00`);

nextYearContainer.textContent = nextYear;

const getTimeUnit = unit => unit < 10 ? '0' + unit : unit;

const insertCountdownValues = ({ days, hours, minutes, seconds }) => {
	secondsContainer.innerHTML = getTimeUnit(seconds);
	minutesContainer.innerHTML = getTimeUnit(minutes);
	hoursContainer.innerHTML = getTimeUnit(hours);
	daysContainer.innerHTML = getTimeUnit(days);
}

const updateCountdown = () => {
	const currentTime = new Date();
	const difference = newYearTime - currentTime;
	const days = Math.floor(difference/1000/60/60/24);
	const hours = Math.floor(difference/1000/60/60) % 24;
	const minutes = Math.floor(difference/1000/60) % 60;
	const seconds = Math.floor(difference/1000) % 60;

	// console.log(difference)
	// console.log({days, hours, minutes, seconds});
	insertCountdownValues({days, hours, minutes, seconds});
}

const handleCountdownDisplay = () => {
	// spinnerLoading.remove()
	countdownContainer.style.display = 'flex';
}

setTimeout(handleCountdownDisplay, 1000);

// console.log(newYearTime.getFullYear());
setInterval(updateCountdown, 1000);