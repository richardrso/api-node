const API_ADDRESS = "http://localhost:3000";
async function get(endpoint) {
  return fetch(API_ADDRESS + endpoint).then((resp) => resp.json());
}

function yell(endpoint) {
  loading(true);

  get(endpoint)
    .then((data) => {
      alert(`Message: ${data?.message}.\n\nCheck the console for data`);
      console.log(data);
    })
    .catch(console.error)
    .finally(() => loading(false));
}

function loading(is = true) {
  document.body.classList[is ? "add" : "remove"]("loading");
}
