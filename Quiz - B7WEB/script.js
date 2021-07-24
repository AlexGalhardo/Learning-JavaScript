let currentQuestion = 0;
let correctAnswers = 0;

showQuestion();

// events
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

function showQuestion(){
	if(questions[currentQuestion]){
		let q = questions[currentQuestion];
		// console.log(q.question);

		let pct = Math.floor((currentQuestion/questions.length)*100);

		document.querySelector('.progress--bar').style.width = `${pct}%`;
		
		document.querySelector('.scoreArea').style.display = 'none';
		document.querySelector('.questionArea').style.display = 'block';

		document.querySelector('.question').innerHTML = q.question;
		// document.querySelector('.options').innerHTML = '';

		let optionsHTML = '';
		for(let i in q.options){
			// document.querySelector('.options').innerHTML += `<div>${q.options[i]}</div>`;
			// maneira otimizada de se fazer
			optionsHTML += `<div data-op='${i}' class='option'><span>${parseInt(i+1)}</span>${q.options[i]}</div>`;
		}
		document.querySelector('.options').innerHTML = optionsHTML;

		document.querySelectorAll('.options .option').forEach(item => {
			item.addEventListener('click', optionClickEvent);
		});

	} else {
		finishQuiz();
	}
}

function optionClickEvent(e) {
	let clickedOption = parseInt(e.target.getAttribute('data-op'));
	// console.log('Clicou em: ', e.target.getAttribute('data-op'));

	if(questions[currentQuestion].answer === clickedOption){
		console.log('ACERTOU');
		correctAnswers++;
	}

	currentQuestion++;
	showQuestion();
}

function finishQuiz() {
	let points = Math.floor((correctAnswers/questions.length)*100);

	if(points < 30){
		document.querySelector('.scoreText1').innerHTML = 'Tá ruim em?!';
		document.querySelector('.scorePct').style.color = '#FF0000';
	} else if(points >= 30 && points < 70){
		document.querySelector('.scoreText1').innerHTML = 'Muito bom!';
		document.querySelector('.scorePct').style.color = 'yellow';
	} else if(points >= 70){
		document.querySelector('.scoreText1').innerHTML = 'Parabéns!';
		document.querySelector('.scorePct').style.color = 'green';
	}

	document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
	document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`;

	document.querySelector('.scoreArea').style.display = 'block';
	document.querySelector('.questionArea').style.display = 'none';
	document.querySelector('.progress--bar').style.width = `100%`;
}

function resetEvent() {
	correctAnswers = 0;
	currentQuestion = 0;
	showQuestion();
}