let areas = {
	a: null,
	b: null,
	c: null
};

document.querySelector('.neutralArea').addEventListener('click', (e) => {
	// console.log('target', e.target) // quem possui o evento
	// console.log('current target', e.currentTarget) // o cara especifico
})

document.querySelectorAll('.item').forEach(item => {
	item.addEventListener('dragstart', dragStart);
	item.addEventListener('dragend', dragEnd);
});

document.querySelectorAll('.area').forEach(area => {
	area.addEventListener('dragover', dragOver);
	area.addEventListener('dragleave', dragLeave);
	area.addEventListener('drop', drop);
});

document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral);
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveNeutral);
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral);

// functions item
function dragStart(e) {
	e.currentTarget.classList.add('dragging')
}

function dragEnd(e) {
	e.currentTarget.classList.remove('dragging');
}

// functions area
function dragOver(e){
	// console.log('Passou por cima')
	
	if(e.currentTarget.querySelector('.item') === null){
		e.preventDefault();
		e.currentTarget.classList.add('hover');
	}
}

function dragLeave(e){
	e.currentTarget.classList.remove('hover');
	// console.log('saiu de uma area dropavel')
}

function drop(e){
	// console.log('liberou')
	e.currentTarget.classList.remove('hover');
	
	// console.log(dragItem);
	// console.log(e.currentTarget)
	
	if(e.currentTarget.querySelector('.item') === null){
		let dragItem = document.querySelector('.item.dragging');
		e.currentTarget.appendChild(dragItem);
		updateAreas();
	}
}

// functions NEUTRAL AREA
function dragOverNeutral(e){
	e.preventDefault();
	e.currentTarget.classList.add('hover');
}

function dragLeaveNeutral(e){
	e.currentTarget.classList.remove('hover');
}

function dropNeutral(e){
	e.currentTarget.classList.remove('hover');
	// item que estou arrastando
	let dragItem = document.querySelector('.item.dragging');
	// lugar onde vou dropar
	e.currentTarget.appendChild(dragItem);
	updateAreas();
}

// Logic Functions
function updateAreas() {
	document.querySelectorAll('.area').forEach(area => {
		let name = area.getAttribute('data-name');

		if(area.querySelector('.item') !== null){
			areas[name] = area.querySelector('.item').innerHTML;
		} else {
			areas[name] = null;
		}
	});

	if(areas.a === '1' && areas.b === '2' && areas.c === '3'){
		document.querySelector('.areas').classList.add('correct');
	} else {
		document.querySelector('.areas').classList.remove('correct');
	}

	console.log(areas);
}