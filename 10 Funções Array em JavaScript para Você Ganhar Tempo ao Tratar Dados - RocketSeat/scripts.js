// INSERT
const latinhas = ['koka-kola', 'sprite'];
latinhas.push('dolynho');
console.log(latinhas);

// RETRIEVE/SEARCH
latinhasAtualizadas = latinhas.filter(function(latinha){
	// return true;
	// return false;
	return latinha !== 'sprite';
});
console.log(latinhasAtualizadas); // return all, except sprite

const latinhaKoka = latinhas.find(function(latinha){
	// return true;
	// return false;
	return latinha === 'koka-kola';
});
console.log(latinhaKoka); // find the first item
console.log(latinhas.includes('pepsi')); // return true or false


// UPDATES
// spread ... => add all latinhas items inside novaLatinhas array
const novasLatinhas = [...latinhas, "tubaina"];
console.log(novasLatinhas);

// SLICE = CORTAR)
console.log(latinhas.slice(1));

// POP
latinhas.pop();
console.log(latinhas)
console.log(latinhas.pop()); // remove last item in array 

// MAP
const fruits = ['orange', 'apple', 'grapes'];
const apples = fruits.map(function(fruit){
	return 'apple';
	// return '';
});
console.log(apples);

// REVERSE
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(numbers.reverse());

// FOREACH
numbers.forEach(function(number){
	console.log(number)
});