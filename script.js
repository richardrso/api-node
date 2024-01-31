const API_ADDRESS = 'http://localhost:3000';// constante com o endereço base da API
    
async function get(endpoint) { //função que recebe um endpoint
  return fetch(API_ADDRESS+endpoint).then(resp => resp.json());
  //API_ADDRESS envia um GET para esse endereço se ouver reposta positiva, converte para JSON
}

function yell(endpoint) { /* unção yell usa a função get()
para fazer chamadas na API no endpoint e monstra um retorno no alert */
  loading(true);

  get(endpoint)
    .then(data => {
      alert(`Message: ${data?.message}.\n\nCheck the console for data`);
      console.log(data);
    })
    .catch(console.error)
    .finally(() => loading(false));
}

function loading(is = true) {/* se o parâmentro 'is' for true a classe loading é adicionada
no body se 'is' for false a classe loading é removida */
  document.body.classList[is ? 'add' : 'remove']('loading');
} 