// Query Selectors
const UISelectors = {
  games: document.querySelector("#games"),
  publishers: document.querySelector("#publishers"),
  detalhesGame: document.querySelector("#detalhes-jogo"),
  detalhesPublisher: document.querySelector("#detalhes-publisher"),
  campoPesquisa: document.querySelector("#campo-pesquisa"),
  resultPesquisa: document.querySelector("#result-pesquisa"),
  gamesPesquisa: document.querySelector("#games-pesquisa"),
};

const urlParams = new URLSearchParams(window.location.search);
const site = window.location.href;

async function setGames() {
  const games = await getGames(6);

  games.results.forEach((game) => {
    let article = document.createElement("article");
    article.className = "col-12 col-sm-4 p-5 shadow-sm";

    article.innerHTML = `
      <h5 class="fw-bold">${game.name}</h5>
      <div class="imagem-padrao d-flex align-items-center">
        <img src="${game.background_image}" />
      </div>
      <br />
      <h5 class="fw-bold" style="text-decoration: underline">Detalhes</h5>
      <ul class="list-group">
        <li class="list-item">
          <b>Lançamento:</b> ${formataData(game.released)}
        </li>
        <li class="list-item">
          <b>Nota:</b> ${game.rating}/5
        </li>
      </ul>
      <div class="d-flex justify-content-end">
        <a class="link-padrao pt-4" href="./detalhes-jogo.html?id=${game.id}">
          Mais detalhes...
        </a>
      </div>
    `;

    UISelectors.games.appendChild(article);
  });
}

async function setPublishers() {
  const publishers = await getPublishers(6);

  publishers.results.forEach((publisher) => {
    let article = document.createElement("article");
    article.className = "col-12 col-sm-4 p-5 shadow-sm";

    article.innerHTML = `
      <h5 class="fw-bold">${publisher.name}</h5>
      <div class="imagem-padrao d-flex align-items-center">
        <img src="${publisher.image_background}" />
      </div>
      <br />
      <ul class="list-group">
        <li class="list-item">
          <b>Lançamentos:</b> ${publisher.games_count}
        </li>
      </ul>
      <div class="d-flex justify-content-end">
        <a class="link-padrao pt-4" href="./detalhes-publisher.html?id=${publisher.id}">
          Mais detalhes...
        </a>
      </div>
    `;

    UISelectors.publishers.appendChild(article);
  });
}

async function setDetalhesGame() {
  const idGame = parseInt(urlParams.get("id"));
  const game = await getDescricaoGame(idGame);

  const div = document.createElement("div");
  div.className = "container p-4";

  div.innerHTML = `
      <h1 class="fw-bold">${game.name}</h1>
      <div id="platforms"></div>
      <div class="d-flex align-items-center my-3">
        <img src="${game.background_image}" style="max-height: 450px" />
      </div>
      <div class="row">
        <ul class="list-group">
          <li class="list-item">
            <b>Lançamento:</b> ${formataData(game.released)}
          </li>
          <li class="list-item mb-2">
            <b>Nota:</b> <span class="badge rounded-pill bg-success">${game.rating}/5</span>
          </li>
        </ul>
        ${game.description}
      </div>
  `;

  UISelectors.detalhesGame.appendChild(div);

  game.platforms.forEach((plataforma) => {
    let span = document.createElement("span");
    span.className = "badge rounded-pill bg-dark mx-1";
    span.innerText = plataforma.platform.name;

    document.querySelector("#platforms").appendChild(span);
  });
}

async function setDetalhesPublisher() {
  const idPublisher = parseInt(urlParams.get("id"));
  const publisher = await getDescricaoPublisher(idPublisher);

  const div = document.createElement("div");
  div.className = "container p-4";

  div.innerHTML = `
      <h1 class="fw-bold">${publisher.name}</h1>
      <div class="d-flex align-items-center my-3">
        <img src="${publisher.image_background}" style="max-height: 450px" />
      </div>
      <div class="row">
        <ul class="list-group">
          <li class="list-item mb-2">
            <b>Jogos lançados:</b> <span class="badge rounded-pill bg-primary">${publisher.games_count}</span>
          </li>
        </ul>
        ${publisher.description}
      </div>
  `;

  UISelectors.detalhesPublisher.appendChild(div);
}

async function setResultadosPesquisa() {
  const pesquisa = urlParams.get("res");
  const games = await getPesquisaGames(pesquisa);

  UISelectors.resultPesquisa.innerText = pesquisa;

  games.results.forEach((game) => {
    let article = document.createElement("article");
    article.className = "col-12 col-sm-4 p-5 shadow-sm";

    article.innerHTML = `
      <h5 class="fw-bold">${game.name}</h5>
      <div class="imagem-padrao d-flex align-items-center">
        <img src="${game.background_image}" />
      </div>
      <br />
      <h5 class="fw-bold" style="text-decoration: underline">Detalhes</h5>
      <ul class="list-group">
        <li class="list-item">
          <b>Lançamento:</b> ${formataData(game.released)}
        </li>
        <li class="list-item">
          <b>Nota:</b> ${game.rating}/5
        </li>
      </ul>
      <div class="d-flex justify-content-end">
        <a class="link-padrao pt-4" href="./detalhes-jogo.html?id=${game.id}">
          Mais detalhes...
        </a>
      </div>
    `;

    UISelectors.gamesPesquisa.appendChild(article);
  });
}

// Maneira de importar as funções para o APP
function importUICtrl() {
  if (site.includes("index")) {
    setGames();
    setPublishers();
  } else if (site.includes("detalhes-jogo")) {
    setDetalhesGame();
  } else if (site.includes("detalhes-publisher")) {
    setDetalhesPublisher();
  } else if (site.includes("pesquisa")) {
    setResultadosPesquisa();
  }
}

document.addEventListener("DOMContentLoaded", importUICtrl());
// document.addEventListener("DOMContentLoaded", setDetalhesGame());