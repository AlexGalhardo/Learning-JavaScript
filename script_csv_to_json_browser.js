// depois de transformar planilha excel em arquivo csv
// copiar toda string do csv para a variável linhas

// const linhas = `string csv aqui`

lista = {}

for (let linha of linhas) {
	const colunas = linha.split(';')
	const id = colunas[1].replace('BOF-', '')
	const nomeComercial = colunas[7]
	const logo = colunas[12]

	lista[id] = {
		comercial_name: nomeComercial,
		logo: logo !== '0' && logo !== '#N/A' ? logo : 'url'
	}
}

console.log(JSON.stringify(lista))