const PORT = 3000; // porta em o server vai rodar
const http = require('http'); // trás o modulo http do node

function handler(req, res) { //função handler acionada toda vez que um recurso bater na porta 3000
    res.setHeader('Acess-Control-Allow-Origin','*'); /* CORS - indica quais domínios podem acessar os recursos, 
    o valor '*' indica que qualquer domínio pode acessar os recursos */ 

    const send =(payload ={}, statusCode = 200) => { /* payload é o objeto que será enviado como respostas,
    se nenhum objeto for fornecido um objeto vazio '{}' será usado. 
    'statusCode' é um número que representa o status HTTP da reposta
    se nenhum código for fornecido o padrão será 200 que é código HTTP para 'OK'*/
        res.writeHead(statusCode, {'Content-Type': 'application/json'}); // reposta em formato JSON.
        res.write(JSON.stringify(payload)); //converte objeto payload e uma string JSON
    };
    // Controle de Fluxo Switch
    switch(req.url){ //verifica a URL da solicitação HTTP
        case '/': //Se a URL for '/' a função send é chamada com um objeto
            send({ message: 'You are on /'});
        break; //encerra

        case '/status': /* Se a URL for '/status' a função send é chamada com um objeto 
            que contém a mensagem e o tempo de atividade do servidro 'process.uptime()' */
            send({message: `The server is running`, uptime: process.uptime()});
            break; //encerra

        default: /* Se a URL não corresponder a nenhum dos casos acima
        send vai retornar a mensagem de erro, indicando que o recurso solicitado
        não foi encontrado */
            send({message: 'Resource not found'}, 404);
            break;//encerra

    }

    res.end(); /* finalizar a reposta HTTP, feito após o switch para garantir que a reposta 
    que a reposta seja finalizada independente do caso que foi executado */
}
//Ativando o Server
http
.createServer(handler)/* handler - toda vez que chega uma request ele
repassa o objeto req(request) e res(response) */
.listen(PORT, () => { // coloca o server na porta 3000
    console.log(`The API is running on port: ${PORT}`)
});