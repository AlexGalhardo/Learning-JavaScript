/**
 * JSON
 *
 * JavaScript Object Notation (JSON) é um formato de organização de dados, 
 * compostos por um conjunto de chave e  valor. 
 * As aspas duplas são obrigatórias, tanto na chave quanto no valor quando este for uma string.
{
  "id": 1,
  "nome": "Andre",
  "email": "andre@origamid.com"
}


/**
 * VALORES
 * 
 * Os valores podem ser números, strings, boolean, arrays, objetos e null.
 */
{
  "id": 1,
  "faculdade": true,
  "pertences": [
    "lapis",
    "caneta",
    "caderno"
  ],
  "endereco": {
    "cidade": "Rio de Janeiro",
    "pais": "Brasil"
  },
  "casado": null
}


/**
 * ARRAYS E OBJETOS
 *
 * É comum possuirmos array's com objetos em cada valor da array. 
 * Cuidado para não colocar vírgula no último item do objeto ou array.
 */

[
  {
    "id": 1,
    "aula": "JavaScript",
    "tempo": "25min"
  },
  {
    "id": 2,
    "aula": "HTML",
    "tempo": "15min"
  },
  {
    "id": 3,
    "aula": "CSS",
    "tempo": "10min"
  }
]

/**
 * JSON.PARSE() E JSON.STRINGIFY()
 *
 * JSON.parse() irá transformar um texto JSON em um objeto JavaScript. 
 * JSON.stringify() irá transformar um objeto JavaScript em uma string no formato JSON.
 */
const textoJSON = '{"id": 1, "titulo": "JavaScript", "tempo": "25min"}';
const textoOBJ = JSON.parse(textoJSON);

const enderecoOBJ = {
  cidade: "Rio de Janeiro",
  rua: "Ali Perto",
  pais: "Brasil",
  numero: 50,
}
const enderecoJSON = JSON.stringfy(enderecoOBJ);

// Podemos guardar por exemplo no localStorage, uma string como valor de uma propriedade. 
// E retornar essa string como um objeto.
const configuracoes = {
  player: "Google API",
  tempo: 25.5,
  aula: "2-1 JavaScript",
  vitalicio: true,
}
localStorage.configuracoes = JSON.stringify(configuracoes);
const pegarConfiguracoes = JSON.parse(localStorage.configuracoes);

// Exercicios
fetch('./dados.json')
.then(r => r.text())
.then(jsonText => {
  const jsonFinal = JSON.parse(jsonText);
});

const configuracoes = {
  player: 'Google',
  tempo: 25.5,
  aula: '2.1 JavaScript',
}
localStorage.config = JSON.stringify(configuracoes)
console.log(JSON.parse(localStorage.config));


/**
 * INICIAR FETCH AO MESMO TEMPO
 *
 * Não precisamos esperar um fetch para começarmos outro. 
 * Porém precisamos esperar a resposta resolvida do fetch para transformarmos a response em json.
 */

async function iniciarAsync() {
  const dadosResponse = fetch('./dados.json');
  const clientesResponse = fetch('./clientes.json');

  // ele espera o que está dentro da expressão () ocorrer primeiro
  const dadosJSON = await (await dadosResponse).json();
  const clientesJSON = await (await clientesResponse).json();
}
iniciarAsync();

/**
 * FETCH *
 * 
 * Utilizando a API https://viacep.com.br/ws/${CEP}/json/
 * crie um formulário onde o usuário pode digitar o cep
 * e o endereço completo é retornado ao clicar em buscar
 */
const inputCep = document.getElementById('cep');
const btnCep = document.getElementById('btnCep');
const resultadoCep = document.querySelector('.resultadoCep');
btnCep.addEventListener('click', handleClick);

function handleClick(event) {
  event.preventDefault();
  const cep = inputCep.value;
  buscaCep(cep);
}

function buscaCep(cep) {
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
  .then(response => response.text())
  .then(body => {
    resultadoCep.innerText = body;
  })
}
 
 /**
 * Utilizando a API https://blockchain.info/ticker
 * retorne no DOM o valor de compra da bitcoin and reais.
 * atualize este valor a cada 30s
 */
const btcDisplay = document.querySelector('.btc');
function fetchBtc() {
  fetch('https://blockchain.info/ticker')
  .then(response => response.json())
  .then(btcJson => {
    btcDisplay.innerText = ('R$ ' + btcJson.BRL.buy).replace('.', ',');
  })
}
 * setInterval(fetchBtc, 1000 * 30);
fetchBtc();

 /**
 * Utilizando a API https://api.chucknorris.io/jokes/random
 * retorne uma piada randomica do chucknorris, toda vez que
 * clicar em próxima
 */
const btnProxima = document.querySelector('.proxima');
const paragrafoPiada = document.querySelector('.piada');
function puxarPiada() {
  fetch('https://api.chucknorris.io/jokes/random')
  .then(r => r.json())
  .then(piada => {
    paragrafoPiada.innerText = piada.value;
  })
}
btnProxima.addEventListener('click', puxarPiada);
puxarPiada();

function puxarPost() {
  fetch('https://jsonplaceholder.typicode.com/posts/')
  .then(r => r.json())
  .then(r => {
    console.log(r)
  })
}
puxarPost();


/**
 * localStorage
 */
/**
 * Storing Data
 */
myObj = {name: "John", age: 31, city: "New York"};
myJSON = JSON.stringify(myObj);
localStorage.setItem("testJSON", myJSON);

/**
 * Retrieving data:
 */
text = localStorage.getItem("testJSON");
obj = JSON.parse(text);
document.getElementById("demo").innerHTML = obj.name;
