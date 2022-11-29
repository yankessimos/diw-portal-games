const apiKey = "e438e00109184e86bf1888931a324b39";

async function getGames(qtd) {
  const res = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&page_size=${qtd}`);
  const data = await res.json();

  return data;
}

async function getPublishers(qtd) {
  const res = await fetch(`https://api.rawg.io/api/publishers?key=${apiKey}&page_size=${qtd}`);
  const data = await res.json();

  return data;
}

async function getDescricaoGame(id) {
  const res = await fetch(`https://api.rawg.io/api/games/${id}?key=${apiKey}`);
  const data = await res.json();

  return data;
}

async function getDescricaoPublisher(id) {
  const res = await fetch(`https://api.rawg.io/api/publishers/${id}?key=${apiKey}`);
  const data = await res.json();

  return data;
}

async function getPesquisaGames(pesquisa) {
  const res = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&search=${pesquisa}`);
  const data = await res.json();

  return data;
}

// Maneira de importar as funções para o APP
function importAPICtrl() {
  getGames();
  getPublishers();
}
