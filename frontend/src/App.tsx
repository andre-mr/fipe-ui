import Select from "./components/Select";
import React, { useState, useEffect } from "react";
import { FipeData } from './interfaces';

const url = 'https://l3j0wbn7la.execute-api.sa-east-1.amazonaws.com/dev';

async function getTabelas(): Promise<FipeData[]> {
  const response = await fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      Consulta: "ConsultarTabelaDeReferencia",
    }),
  });
  let responseData = JSON.parse(await response.json());
  let formattedData: FipeData[] = responseData.map((item: { Codigo: number, Mes: string }) => {
    return {
      Key: item.Codigo,
      Value: item.Mes
    }
  })
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
  let formattedData: FipeData[] = responseData.map((item: { Label: string, Value: number }) => {
    return {
      Key: item.Value,
      Value: item.Label
    }
  })
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
      codigoMarca: marcaKey
    }),
  });
  let responseData = JSON.parse(await response.json());
  let formattedData: FipeData[] = responseData.Modelos.map((item: { Label: string, Value: number }) => {
    return {
      Key: item.Value,
      Value: item.Label
    }
  })
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
      codigoModelo: modeloKey
    }),
  });
  let responseData = JSON.parse(await response.json());
  let formattedData: FipeData[] = responseData.map((item: { Label: string, Value: number }) => {
    return {
      Key: item.Value,
      Value: item.Label
    }
  })
  return formattedData;
}

async function getPreco(tabelaKey: string, marcaKey: string, modeloKey: string, anoKey: string, tipoKey: string) {
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


export default function App() {
  const [tabelas, setTabelas] = useState<FipeData[]>([]);
  const [tabela, setTabela] = useState<FipeData>({ Key: '', Value: '' });
  const [marcas, setMarcas] = useState<FipeData[]>([]);
  const [marca, setMarca] = useState<FipeData>({ Key: '', Value: '' });
  const [modelos, setModelos] = useState<FipeData[]>([]);
  const [modelo, setModelo] = useState<FipeData>({ Key: '', Value: '' });
  const [anos, setAnos] = useState<FipeData[]>([]);
  const [ano, setAno] = useState<FipeData>({ Key: '', Value: '' });
  const [preco, setPreco] = useState('');

  async function changeTabela(e: React.ChangeEvent<Element>) {
    const target = e.target as HTMLSelectElement;
    const option = target.children[target.selectedIndex] as HTMLOptionElement
    if (option.value != '0') {
      setTabela({ Key: option.value, Value: option.label })
    } else {
      setMarcas([])
      setModelos([])
      setAnos([])
    }
  }

  async function changeMarca(e: React.ChangeEvent<Element>) {
    const target = e.target as HTMLSelectElement;
    const option = target.children[target.selectedIndex] as HTMLOptionElement
    if (option.value != '0') {
      setMarca({ Key: option.value, Value: option.label })
    } else {
      setAnos([])
      setModelos([])
    }
  }

  async function changeModelo(e: React.ChangeEvent<Element>) {
    const target = e.target as HTMLSelectElement;
    const option = target.children[target.selectedIndex] as HTMLOptionElement
    if (option.value != '0') {
      setModelo({ Key: option.value, Value: option.label })
    } else {
      setAnos([])
    }
  }

  async function changeAno(e: React.ChangeEvent<Element>) {
    const target = e.target as HTMLSelectElement;
    const option = target.children[target.selectedIndex] as HTMLOptionElement
    if (option.value != '0') {
      setAno({ Key: option.value, Value: option.label })
    }
  }

  useEffect(() => {
    getTabelas().then((response) => {
      setTabelas(response)
      setTabela({ Key: response[0].Key.toString(), Value: response[0].Value.toString() })
    });
  }, []);

  useEffect(() => {
    if (tabela && tabela.Key != '' && tabela.Key != '0') {
      setMarcas([])
      setModelos([])
      setModelo({ Key: '0', Value: '0' })
      setAnos([])
      setAno({ Key: '0', Value: '0' })
      getMarcas(tabela.Key).then((response) => {
        setMarcas(response)
        setMarca({ Key: '0', Value: '0' })
      })
    }
  }, [tabela])

  useEffect(() => {
    if (marca && marca.Key != '' && marca.Key != '0') {
      getModelos(tabela.Key, marca.Key).then((response) => {
        setModelos(response)
        setModelo({ Key: '0', Value: '0' })
        setAnos([])
      })
    }
  }, [marca])

  useEffect(() => {
    setAno({ Key: '0', Value: '0' })
    if (modelo && modelo.Key != '' && modelo.Key != '0') {
      setAnos([])
      getAnos(tabela.Key, marca.Key, modelo.Key).then((response) => {
        setAnos(response)
        let responseAno = response[0] as FipeData
        if (responseAno.Value.includes('32000')) {
          responseAno.Value = responseAno.Value.replace('32000', 'Zero KM')
        }
      })
    }
  }, [modelo])

  useEffect(() => {
    if (ano && ano.Key != '' && ano.Key != '0') {
      getPreco(tabela.Key, marca.Key, modelo.Key, ano.Key.substring(0, ano.Key.indexOf('-')), ano.Key.substring(ano.Key.indexOf('-') + 1, ano.Key.length + 1)).then((response: string) => {
        setPreco(response)
      })
    } else {
      setPreco('R$ 0,00')
    }
  }, [ano])

  return (
    <div className="App h-full dark:bg-slate-800 p-0 m-0">
      <header className="flex justify-center items-center bg-gray-900 h-1/6">
        <p className="text-blue-100 text-4xl">Fipe Interface</p>
      </header>

      <div className="flex flex-col justify-center items-center h-5/6">
        <div className="h-5/6 w-5/6 md:w-4/6 bg-slate-500 rounded">
          <div className="flex flex-row h-1/5 p-1">
            <Select title="Tabela" data={tabelas} onChange={changeTabela} />
          </div>
          <div className="flex flex-row h-1/5 p-1">
            <Select title="Marca" data={marcas} onChange={changeMarca} />
          </div>
          <div className="flex flex-row h-1/5 p-1">
            <Select title="Modelo" data={modelos} onChange={changeModelo} />
          </div>
          <div className="flex flex-row h-1/5 p-1">
            <Select title="Ano" data={anos} onChange={changeAno} />
          </div>
          <div className="flex flex-row h-1/5 py-3 px-6">
            <div className="flex w-full justify-center items-center rounded bg-slate-200">
              <p className="font-bold text-green-800 text-2xl">{preco || 'R$ 0,00'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
