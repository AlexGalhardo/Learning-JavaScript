/*
https://ricardo-reis.medium.com/try-catch-tratando-erros-no-javascript-91bcce0b93ae
https://danieldcs.com/tratamento-de-erros-e-excecoes-em-javascript/

Tipos de erros no JavaScript

Error

EvalError = O JavaScript dispara o EvalError quando você usa eval() com algo diferente de uma chamada de função

RangeError = O RangeError ocorre quando um número não está no seu intervalo.

ReferenceError = O RefereceError ocorre quando você faz referência a uma variável, uma função ou um objeto que não existe.

SyntaxError = O SyntaxError ocorre em uma string que você passa para a função eval(),

TypeError = O TypeError ocorre quando uma variável é de um tipo inesperado ou acesso a um método inexistente.

URIError = O erro URIError ocorre ao usar o encodeURI() ou decodeURI() com uma URI fora dos padrões

*/

/*
try {
	if(true) throw new Error('função não existe')
}catch(err){
	// console.log(err.name, '+', err.message)
	throw err
}finally{
	console.log('finalmente')
}
*/

/* Custom Errors
Os erros nativos do JavaScript são muito úteis quando não temos ideia do problema que pode aparecer em nossa aplicação, porém se temos regras de negócio definidas, podemos definir algum padrão e criar nossos próprios tipos de erros e lançar quando for preciso */

class UserTypeError extends Error {
  constructor(message) {
    super(message)
    this.name = 'UserTypeError'
  }
}

const payload = '{ "type":"PJF" }'

try {
  const { type } = JSON.parse(payload)
  
  if(type === "PF" || type === "PJ") {
    console.log('Usuário válido')
  } else {
    throw new UserTypeError('Tipo de usuário inválido')
  }
  
} catch (error) {
  console.log(error.name) // Output: CustomError
  console.log(error.message) // Output: Tipo de usuário inválido
}