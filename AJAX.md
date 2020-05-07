### Asynchronous JavaScript And XML
```html
<!DOCTYPE html>
<html>

	<head>
		<title>Learning AJAX</title>
		<meta charset="utf-8">
	</head>

	<body>

	<script>
		// usando api púbica do github do meu perfil do github
		// https://api.github.com/users/AlexGalhardo
		// instancie uma classe xmlhttprequest
		var xhr = new XMLHttpRequest();
		// use o method GET para a url da api
		xhr.open('GET', 'https://api.github.com/users/AlexGalhardo');
		// mande a requisição
		xhr.send(null);
		// F12 -> NETWORK -> AlexGalhardo

		// quando a requisição estiver pronta, execute a função
		xhr.onreadystatechange = function(){
			// se o estado for 4, ou seja, não deu erro na aquisição
			if(xhr.readyState === 4){
				// print no console, a resposta da requisição
				console.log(JSON.parse(xhr.responseText));
			}
		}
		// F12 -> CONSOLE
	</script>
	
	</body>
</html>
```

### Using Promises
```html
<!DOCTYPE html>
<html>

	<head>
		<title>Promises</title>
		<meta charset="utf-8">
	</head>

	<body>


	<script>
		var minhaPromise = function(){
			return new Promise(function(resolve, reject){
				// usando api púbica do github do meu perfil do github
				// https://api.github.com/users/AlexGalhardo
				// instancie uma classe xmlhttprequest
				var xhr = new XMLHttpRequest();
				// use o method GET para a url da api
				xhr.open('GET', 'https://api.github.com/users/AlexGalha33333rdo');
				// mande a requisição
				xhr.send(null);
				// F12 -> NETWORK -> AlexGalhardo

				// quando a requisição estiver pronta, execute a função
				xhr.onreadystatechange = function(){
					// se o estado for 4, ou seja, não deu erro na aquisição
					if(xhr.readyState === 4){
						// print no console, a resposta da requisição
						if(xhr.status === 200){
							resolve(JSON.parse(xhr.responseText));
						}
						else {
							reject('Erro na aquisição');
						}
					}
				}
				});
			}

			//var resultado = minhaPromise();
			//console.log(resultado);
			// F12 -> CONSOLE

			
			minhaPromise()
				// o .then vai chamar o resolve da promisse 
				// se o código ter sucesso, nós chamamos o resolve
				.then(function(response){
					console.log(response);
				})
				// o .catch vai chamar o reject da nossa promisse
				.catch(function(error){
					console.warn(error);
				});
			
	</script>

	</body>
</html>
```

### Using Axios
```html
<!DOCTYPE html>
<html>

	<head>
		<title>AXIOS</title>
		<meta charset="utf-8">
	</head>

	<body>


	<!-- o import do axios DEVE estar importado antes do script principal do ajax -->
	<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
	<script>
		var minhaPromise = function(){
			return new Promise(function(resolve, reject){
				// usando api púbica do github do meu perfil do github
				// https://api.github.com/users/AlexGalhardo
				// instancie uma classe xmlhttprequest
				var xhr = new XMLHttpRequest();
				// use o method GET para a url da api
				xhr.open('GET', 'https://api.github.com/users/AlexGalhardo');
				// mande a requisição
				xhr.send(null);
				// F12 -> NETWORK -> AlexGalhardo

				// quando a requisição estiver pronta, execute a função
				xhr.onreadystatechange = function(){
					// se o estado for 4, ou seja, não deu erro na aquisição
					if(xhr.readyState === 4){
						// print no console, a resposta da requisição
						if(xhr.status === 200){
							resolve(JSON.parse(xhr.responseText));
						}
						else {
							reject('Erro na aquisição');
						}
					}
				}
				});
			}

			//var resultado = minhaPromise();
			//console.log(resultado);
			// F12 -> CONSOLE

			
			/*
			minhaPromise()
				// o .then vai chamar o resolve da promisse 
				// se o código ter sucesso, nos chamamos o resolve
				.then(function(response){
					console.log(response);
				})
				// o .catch vai chamar o reject da nossa promisse
				.catch(function(error){
					console.warn(error);
				});
			*/

			// SOURCE: https://github.com/axios/axios
			axios.get('https://api.github.com/users/AlexGalhardo')
				.then(function(response){
					console.log(response);
					console.log(response.data.avatar_url);
				})
				.catch(function(error){
					console.warn(error);
				})
			// 	F12 -> CONSOLE
	</script>

	</body>
</html>
```