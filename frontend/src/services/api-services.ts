import { FipeData } from "./interfaces";

const url = "https://l3j0wbn7la.execute-api.sa-east-1.amazonaws.com/dev";

async function getTabelas(): Promise<FipeData[]> {
  const response = await fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Consulta: "ConsultarTabelaDeReferencia",
    }),
  });
  let responseData = JSON.parse(await response.json());
  let formattedData: FipeData[] = responseData.map(
    (item: { Codigo: number; Mes: string }) => {
      return {
        Key: item.Codigo,
        Value: item.Mes,
      };
    }
  );
  return formattedData;
}

async function getMarcas(tabelaKey: string): Promise<FipeData[]> {
  const response = await fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Consulta: "ConsultarMarcas",
      codigoTabelaReferencia: tabelaKey,
      codigoTipoVeiculo: "1",
    }),
  });
  let responseData = JSON.parse(await response.json());
  let formattedData: FipeData[] = responseData.map(
    (item: { Label: string; Value: number }) => {
      return {
        Key: item.Value,
        Value: item.Label,
      };
    }
  );
  return formattedData;
}

async function getModelos(tabelaKey: string, marcaKey: string) {
  const response = await fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Consulta: "ConsultarModelos",
      codigoTabelaReferencia: tabelaKey,
      codigoTipoVeiculo: "1",
      codigoMarca: marcaKey,
    }),
  });
  let responseData = JSON.parse(await response.json());
  let Modelos: FipeData[] = responseData.Modelos.map(
    (item: { Label: string; Value: number }) => {
      return {
        Key: item.Value,
        Value: item.Label,
      };
    }
  );
  let Anos: FipeData[] = responseData.Anos.map(
    (item: { Label: string; Value: number }) => {
      return {
        Key: item.Value,
        Value: item.Label.includes("32000")
          ? item.Label.replace("32000", "Zero KM")
          : item.Label,
      };
    }
  );
  return { Modelos, Anos };
}

async function getModelosPorAno(
  tabelaKey: string,
  marcaKey: string,
  modeloKey: string,
  anoKey: string,
  tipoKey: string
) {
  const response = await fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Consulta: "ConsultarModelosAtravesDoAno",
      codigoTabelaReferencia: tabelaKey,
      codigoTipoVeiculo: "1",
      codigoMarca: marcaKey,
      codigoModelo: modeloKey,
      anoModelo: anoKey,
      codigoTipoCombustivel: tipoKey,
    }),
  });
  let responseData = JSON.parse(await response.json());
  let formattedData: FipeData[] = responseData.map(
    (item: { Label: string; Value: number }) => {
      return {
        Key: item.Value,
        Value: item.Label,
      };
    }
  );
  return formattedData;
}

async function getAnos(tabelaKey: string, marcaKey: string, modeloKey: string) {
  const response = await fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Consulta: "ConsultarAnoModelo",
      codigoTabelaReferencia: tabelaKey,
      codigoTipoVeiculo: "1",
      codigoMarca: marcaKey,
      codigoModelo: modeloKey,
    }),
  });
  let responseData = JSON.parse(await response.json());
  let formattedData: FipeData[] = responseData.map(
    (item: { Label: string; Value: number }) => {
      return {
        Key: item.Value,
        Value: item.Label,
      };
    }
  );
  return formattedData;
}

async function getPreco(
  tabelaKey: string,
  marcaKey: string,
  modeloKey: string,
  anoKey: string,
  tipoKey: string
) {
  const response = await fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Consulta: "ConsultarValorComTodosParametros",
      codigoTabelaReferencia: tabelaKey,
      codigoTipoVeiculo: "1",
      codigoMarca: marcaKey,
      codigoModelo: modeloKey,
      anoModelo: anoKey,
      codigoTipoCombustivel: tipoKey,
    }),
  });
  let responseData = JSON.parse(await response.json());
  return responseData.Valor;
}

async function getImagem(
  marcaLabel: string,
  modeloLabel: string,
  anoLabel: string
) {
  const response = await fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Consulta: "SearchImage",
      marca: marcaLabel,
      modelo: modeloLabel,
      ano: anoLabel,
    }),
  });
  let responseData = await response.json();
  return responseData;
}

export default {
  getTabelas,
  getMarcas,
  getModelos,
  getAnos,
  getModelosPorAno,
  getPreco,
  getImagem,
};
