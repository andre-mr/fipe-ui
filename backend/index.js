const axios = require("axios");

exports.handler = async (event) => {
  const consulta = event.Consulta;
  let response;

  switch (consulta) {
    case "SearchImage":
      response = await axios
        .get(`https://www.google.com/search?tbm=isch&q=${event.marca} ${event.modelo} ${event.ano}`)
      let link = response.data.substring(response.data.search(/src="http/), response.data.search(/&amp;s"/)).replace('src="', '')
      return link

    case "ConsultarTabelaDeReferencia":
      response = await axios
        .post("https://veiculos.fipe.org.br/api/veiculos//ConsultarTabelaDeReferencia", {
        })
      return JSON.stringify(response.data)

    case "ConsultarMarcas":
      response = await axios
        .post("https://veiculos.fipe.org.br/api/veiculos//ConsultarMarcas", {
          codigoTipoVeiculo: event.codigoTipoVeiculo,
          codigoTabelaReferencia: event.codigoTabelaReferencia
        })
      return JSON.stringify(response.data)

    case "ConsultarModelos":
      response = await axios
        .post("https://veiculos.fipe.org.br/api/veiculos//ConsultarModelos", {
          codigoTipoVeiculo: event.codigoTipoVeiculo,
          codigoTabelaReferencia: event.codigoTabelaReferencia,
          codigoMarca: event.codigoMarca
        })
      return JSON.stringify(response.data)

    case "ConsultarAnoModelo":
      response = await axios
        .post("https://veiculos.fipe.org.br/api/veiculos//ConsultarAnoModelo", {
          codigoTipoVeiculo: event.codigoTipoVeiculo,
          codigoTabelaReferencia: event.codigoTabelaReferencia,
          codigoMarca: event.codigoMarca,
          codigoModelo: event.codigoModelo
        })
      return JSON.stringify(response.data)

    case "ConsultarModelosAtravesDoAno":
      response = await axios
        .post("https://veiculos.fipe.org.br/api/veiculos//ConsultarModelosAtravesDoAno", {
          codigoTipoVeiculo: event.codigoTipoVeiculo,
          codigoTabelaReferencia: event.codigoTabelaReferencia,
          codigoMarca: event.codigoMarca,
          codigoModelo: event.codigoModelo,
          anoModelo: event.anoModelo,
          codigoTipoCombustivel: event.codigoTipoCombustivel
        })
      return JSON.stringify(response.data)

    case "ConsultarValorComTodosParametros":
      response = await axios
        .post("https://veiculos.fipe.org.br/api/veiculos//ConsultarValorComTodosParametros", {
          codigoTipoVeiculo: event.codigoTipoVeiculo,
          codigoTabelaReferencia: event.codigoTabelaReferencia,
          codigoMarca: event.codigoMarca,
          codigoModelo: event.codigoModelo,
          anoModelo: event.anoModelo,
          codigoTipoCombustivel: event.codigoTipoCombustivel,
          tipoConsulta: "tradicional"
        })
      return JSON.stringify(response.data)

    default:
      return {}
  }
};

