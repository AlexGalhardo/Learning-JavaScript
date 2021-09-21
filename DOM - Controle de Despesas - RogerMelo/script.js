const transactionsUl = document.querySelector('#transactions');
const incomeDisplay = document.querySelector('#money-plus');
const expenseDisplay = document.querySelector('#money-minus');
const balanceDisplay = document.querySelector('#balance');
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text');
const inputTransactionAmount = document.querySelector('#amount')

// console.log({inputTransactionName, inputTransactionAmount})
// console.log({incomeDisplay, expenseDisplay, balanceDisplay})

// para testar, antes de usar localStorage
/*
let dummyTransactions = [
	{ id: 1, name: 'Bolo de brigadeiro', amount: -20 },
	{ id: 2, name: 'Bolo de Laranja', amount: 35 },
	{ id: 3, name: 'Bolo de Chocolate', amount: -40 },
	{ id: 4, name: 'Pamonha', amount: 150 },
]
*/

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage
						.getItem('transactions') !== null ? localStorageTransactions : []

const removeTransaction = ID => {
	transactions = transactions
							.filter(transaction => transaction.id !== ID)
	updateLocalStorage()
	init()
}

const addTransactionIntoDOM = transaction => {
	const operator = transaction.amount < 0 ? '-' : '+'
	const CSSClas = transaction.amount < 0 ? 'minus' : 'plus';
	const amountWithoutOperator = Math.abs(transaction.amount);
	const li = document.createElement('li');

	li.classList.add(CSSClas)
	li.innerHTML = `
		${transaction.name} 
		<span>${operator} R$${amountWithoutOperator}</span>
		<button class="delete-btn" onClick="removeTransaction(${transaction.id})">
			x
		</button>
	`;
	transactionsUl.append(li);
}

// addTransactionIntoDOM(transactions[0])
// addTransactionIntoDOM(transactions[1])
// addTransactionIntoDOM(transactions[2])
// addTransactionIntoDOM(transactions[3])

const getTotal = transactinsAmounts => transactionsAmounts
						.reduce((accumulator, transaction) => accumulator + transaction, 0)
						.toFixed(2)

const getIncome = transactionsAmounts => transactionsAmounts
						.filter(value => value > 0)
						.reduce((accumulator, value) => accumulator+value, 0)
						.toFixed(2)

const getExpenses = transactionsAmounts => Math.abs(transactionsAmounts
						.filter(value => value < 0)
						.reduce((accumulator, value) => accumulator+value, 0))
						.toFixed(2)

const updateBalanceValues = () => {
	const transactionsAmounts = transactions
									.map(transaction => transaction.amount)
	const total = getTotal(transactinsAmounts)
	const income = getIncome(transactionsAmounts)
	const expense = getExpenses(transactionsAmounts)
	
	balanceDisplay.textContent = `R$ ${total}`
	incomeDisplay.textContent = `R$ ${income}`
	expenseDisplay.textContent = `R$ ${expense}`
}

const init = () => {
	transactionsUl.innerHTML = ''
	transactions.forEach(addTransactionIntoDOM)
	updateBalanceValues()
}

init()

const updateLocalStorage = () => {
	localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random()*1000)

const addToTransactionsArray = (transactionName, transactionAmount) => {
	transactions.push({ 
		id: generateID(), 
		name: transactionName, 
		amount: Number(transactionAmount)
	})
}

const cleanInputs = () => {
	inputTransactionName.value = '';
	inputTransactionAmount.value = '';
}

const handleFormSubmit = event => {
	event.preventDefault()

	const transactionName = inputTransactionName.value.trim()
	const transactionAmount = inputTransactionAmount.value.trim()

	const isSomeInputEmpty = transactionName === '' || transactionAmount === '';

	if(isSomeInputEmpty){
		alert('Por favor, preencha o nome e o valor da transação')
		return 
	}

	addToTransactionsArray(transactionName, transactionAmount)
	init()
	updateLocalStorage()
	cleanInputs()
}

form.addEventListener('submit', handleFormSubmit) 