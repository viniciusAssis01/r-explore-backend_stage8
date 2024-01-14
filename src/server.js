require("express-async-errors");

const database = require("./database/sqlite");

const AppError = require("./utils/AppError");

const express = require("express");

const routes = require("./routes");

database();

const app = express();
app.use(express.json());
app.use(routes);

app.use((error, request, response, next) => {
	if (error instanceof AppError) {
		return response.status(error.statusCode).json({
			status: "error",
			message: error.message,
		});
	}
	console.error(error);

	return response.status(500).json({
		status: "error",
		message: "Internal server Error",
	});
});

const PORT = 3333;
const runningMsg = `server running on http://localhost:${PORT}`;

app.listen(PORT, () => {
	console.log(runningMsg);
});

/*
entendendo a logica da nossa API:

OBS: atraves do arquivo package.json, no objeto scripts, conseguimos ver qual é o arquivo inicial/principal (o arq ponto de entrada) da nossa app. isto é:

 qndo fizermos uma requisição (no caso estamos testando pelo insomnia):
>  vai entrar no arq server.JS (q no caso é nosso arq principal/main)
>  q entrar no comando “app.use(routes)” (igual dar Ctrl+clique em routes do comando) 
>  q vai nos levar para o arq "index.js" da pasta routes 
>  q vai chamar (de acordo com o q foi requisitado) o arq routes especico 
>  q dai vai chamar o respectivo controller (q executa as funcionalidades > e cada funcionalidade manipula o DB, atraves do knex [querybuilder])
os controladores sao responsveis por processar a requisição HTTP, interagir com DB e retornar respostas apropriadas
*/
