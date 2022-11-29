function formataData(dataParam) {
  const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  let data = new Date(dataParam);
  let dataFormatada = data.getDate() + " " + meses[data.getMonth()] + " " + data.getFullYear();

  return dataFormatada;
}

document.querySelector("#botao-pesquisa").addEventListener("click", (e) => {
  e.preventDefault();

  const inputPesquisa = document.querySelector("#campo-pesquisa").value;

  window.location.href = "./pesquisa.html?res=" + inputPesquisa;
});
