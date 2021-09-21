// https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
// https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis

const main = document.querySelector("main");
const buttonInsertText = document.querySelector('.btn-toggle');
const buttonReadText = document.querySelector('#read')
const divTextBox = document.querySelector('.text-box')
const closeDivTextBox = document.querySelector('.close')
const selectElement = document.querySelector('select')
const textArea = document.querySelector('textarea')

const humanExpressions = [
	{ img: './img/drink.jpg', text: 'Estou com sede'},
	{ img: './img/food.jpg', text: 'Estou com fome'},
	{ img: './img/tired.jpg', text: 'Estou cansado'},
	{ img: './img/hurt.jpg', text: 'Estou machucado'},
	{ img: './img/happy.jpg', text: 'Estou feliz'},
	{ img: './img/angry.jpg', text: 'Estou com raiva'},
	{ img: './img/sad.jpg', text: 'Estou triste'},
	{ img: './img/scared.jpg', text: 'Estou com medo'},
	{ img: './img/outside.jpg', text: 'Quero ir la fora'},
	{ img: './img/home.jpg', text: 'Quero ir para casa'},
	{ img: './img/school.jpg', text: 'Quero ir para escola'},
	{ img: './img/grandma.jpg', text: 'Quero ver vovó'}
];

const utterance = new SpeechSynthesisUtterance()
// console.log(utterance)

const setTextMessage = text => {
	utterance.text = text
}

const speakText = () => {
	speechSynthesis.speak(utterance)
}

const setVoice = event => {
	console.log(event.target.value)
	const selectedVoice = voices.find(voice => voice.name === event.target.value)
	utterance.voice = selectedVoice
}

const addExpressionsBoxesIntoDOM = () => {
	main.innerHTML = humanExpressions.map(({img, text}) => 
		`<div class="expression-box" data-js='${text}'>
			<img src="${img}"" alt='${text}' data-js='${text}'>
			<p class="info" data-js='${text}'>${text}</p>
		</div>`
	).join('')
}

addExpressionsBoxesIntoDOM()

const setStyleOfClickedDiv = dataValue => {
	const div = document.querySelector(`[data-js="${dataValue}"]`)
	div.classList.add('active')
	setTimeout(() => {
		div.classList.remove('active')
	}, 1000)
}

main.addEventListener('click', event => {
	const clickedElement = event.target
	const clickedElementText = clickedElement.dataset.js

	const clickedElementTextMustBeSpoken = ['IMG', 'P'].some(elementName => clickedElement.tagName.toLowerCase() === elementName.toLowerCase())

	if(clickedElementTextMustBeSpoken){
		// console.log(clickedElement.tagName)
		setTextMessage(clickedElementText)
		speakText()
		setStyleOfClickedDiv(clickedElementText)
	}
})

const insertOptionElementsIntoDOM = voices => {
	selectElement.innerHTML = voices.reduce((accumulator, {name, lang}) => {
		accumulator += `<option value="${name}">${lang} | ${name}</option>`
		return accumulator
	}, '')
}

const setPTBRVoices = voices => {
	// console.log(voices.find(voice => voice.name === 'Google português do Brasil'))
	const googleVoice = voices.find(voice => voice.name === 'Google português do Brasil')

	if(googleVoice){
		utterance.voice = googleVoice
		const googleOptionElement = selectElement.querySelector(`[value="${googleVoice.name}"]`)
		googleOptionElement.selected = true
	}
}

let voices = []

// console.log(speechSynthesis)
speechSynthesis.addEventListener('voiceschanged', () => {
	voices = speechSynthesis.getVoices()

	insertOptionElementsIntoDOM(voices)
	setPTBRVoices(voices)
})

buttonInsertText.addEventListener('click', () => {
	divTextBox.classList.add('show')
})

closeDivTextBox.addEventListener('click', () => {
	divTextBox.classList.remove('show')
})

selectElement.addEventListener('change', setVoice)

buttonReadText.addEventListener('click', () => {
	setTextMessage(textArea.value)
	speakText()
})