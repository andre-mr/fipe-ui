import Select from "./components/Select";
import { useState, useEffect } from "react";
import { FipeData } from './services/interfaces';
import apiServices from "./services/api-services";
import fipeLogo from './assets/fipe-logo.png';

export default function App() {
  const imagemDefault = fipeLogo;
  const tiposDefault: FipeData[] = [{ Key: '1', Value: 'Carros' }, { Key: '2', Value: 'Motos' }, { Key: '3', Value: 'Caminhões' }];

  const [tipos, setTipos] = useState<FipeData[]>(tiposDefault)
  const [tipo, setTipo] = useState<FipeData>(tiposDefault[0]);
  const [tabelas, setTabelas] = useState<FipeData[]>([]);
  const [tabela, setTabela] = useState<FipeData>({ Key: '', Value: '' });
  const [marcas, setMarcas] = useState<FipeData[]>([]);
  const [marca, setMarca] = useState<FipeData>({ Key: '', Value: '' });
  const [modelos, setModelos] = useState<FipeData[]>([]);
  const [modelo, setModelo] = useState<FipeData>({ Key: '', Value: '' });
  const [anos, setAnos] = useState<FipeData[]>([]);
  const [ano, setAno] = useState<FipeData>({ Key: '', Value: '' });
  const [preco, setPreco] = useState('');
  const [imagem, setImagem] = useState(imagemDefault);

  async function changeTipo(e: React.ChangeEvent<Element>) {
    const target = e.target as HTMLSelectElement;
    const option = target.children[target.selectedIndex] as HTMLOptionElement
    if (option.value != '0') {
      setTipo({ Key: option.value, Value: option.label })
    } else {
      setMarcas([])
      setModelos([])
      setAnos([])
    }
  }

  async function changeTabela(e: React.ChangeEvent<Element>) {
    const target = e.target as HTMLSelectElement;
    const option = target.children[target.selectedIndex] as HTMLOptionElement
    if (option.value != '0') {
      setTabela({ Key: option.value, Value: option.label })
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
    apiServices.getTabelas().then((response) => {
      setTabelas(response)
      setTabela({ Key: response[0].Key.toString(), Value: response[0].Value.toString() })
    });
  }, []);

  useEffect(() => {
    if (!tipos || tipos.length <= 0) {
      setTipos(tiposDefault)
    }
  }, [tipos])

  useEffect(() => {
    if (tabela && tabela.Key != '' && tabela.Key != '0') {
      setMarcas([])
      setModelos([])
      setModelo({ Key: '0', Value: '0' })
      setAnos([])
      setAno({ Key: '0', Value: '0' })
      setImagem(imagemDefault);
      apiServices.getMarcas(tipo.Key, tabela.Key).then((response) => {
        setMarcas(response);
        setMarca({ Key: '0', Value: '0' })
      })
    }
  }, [tipo])

  useEffect(() => {
    if (tabela && tabela.Key != '' && tabela.Key != '0') {
      setMarcas([])
      setModelos([])
      setModelo({ Key: '0', Value: '0' })
      setAnos([])
      setAno({ Key: '0', Value: '0' })
      setImagem(imagemDefault);
      apiServices.getMarcas(tipo.Key, tabela.Key).then((response) => {
        setMarcas(response)
        setMarca({ Key: '0', Value: '0' })
      })
    }
  }, [tabela])

  useEffect(() => {
    if (marca && marca.Key != '' && marca.Key != '0') {
      setModelos([])
      setModelo({ Key: '0', Value: '0' })
      setAnos([])
      setAno({ Key: '0', Value: '0' })
      setImagem(imagemDefault);
      apiServices.getModelos(tipo.Key, tabela.Key, marca.Key).then((response) => {
        setModelos(response.Modelos)
        setAnos(response.Anos)
      })
    }
  }, [marca])

  useEffect(() => {
    if (ano && ano.Key != '' && ano.Key != '0') {
      apiServices.getPreco(tipo.Key, tabela.Key, marca.Key, modelo.Key, ano.Key.substring(0, ano.Key.indexOf('-')), ano.Key.substring(ano.Key.indexOf('-') + 1, ano.Key.length + 1)).then((response: string) => {
        setPreco(response)
      })
    }
    if (modelo && modelo.Key != '' && modelo.Key != '0') {
      apiServices.getAnos(tipo.Key, tabela.Key, marca.Key, modelo.Key).then((response) => {
        let anos: FipeData[] = response.map((item) => {
          return {
            Key: item.Key,
            Value: item.Value.includes('32000') ? item.Value.replace('32000', 'Zero KM') : item.Value
          }
        })
        setAnos(anos)
      })
    }
  }, [modelo])

  useEffect(() => {
    if (ano && ano.Key != '' && ano.Key != '0') {
      if (modelo && modelo.Key != '' && modelo.Key != '0') {
        apiServices.getPreco(tipo.Key, tabela.Key, marca.Key, modelo.Key, ano.Key.substring(0, ano.Key.indexOf('-')), ano.Key.substring(ano.Key.indexOf('-') + 1, ano.Key.length + 1)).then((response: string) => {
          setPreco(response)
        })
      }
      apiServices.getModelosPorAno(tipo.Key, tabela.Key, marca.Key, modelo.Key, ano.Key.substring(0, ano.Key.indexOf('-')), ano.Key.substring(ano.Key.indexOf('-') + 1, ano.Key.length + 1)).then((response) => {
        setModelos(response)
      })
    } else {
      setPreco('R$ 0,00')
    }
  }, [ano])

  useEffect(() => {
    if (preco && preco != 'R$ 0,00') {
      setImagem('')
      apiServices.getImagem(marca.Value, modelo.Value, ano.Value).then((response) => {
        let imageUrl
        if (response.indexOf('http:') > -1 || response.indexOf('https:') > -1) {
          imageUrl = response;
          setImagem(response);
        } else {
          imageUrl = 'data:image/png;base64,' + response;
          setImagem(imageUrl);
        }
      })
    }
  }, [preco])

  return (
    <div className="App h-full dark:bg-slate-800 p-0 m-0">
      <header className="flex justify-center items-center bg-gray-900 h-[5%]">
        <p className="text-slate-100 text-2xl">Consulta Fipe</p>
      </header>

      <div className="flex flex-col justify-center items-center h-[95%]">
        <div className="h-4/6 w-full md:w-4/6 rounded p-1">

          <div className="flex flex-row h-1/6">
            <div className="flex items-center px-5 h-full w-1/2">
              <button
                className="flex h-1/2 w-full justify-center items-center border border-slate-300 rounded hover:bg-slate-700"
                onClick={() => {
                  setTabelas([])
                  setTipos([])
                  apiServices.getTabelas().then((response) => {
                    setTipos(tiposDefault)
                    setTipo(tiposDefault[0])
                    setTabelas(response)
                    setTabela({ Key: response[0].Key.toString(), Value: response[0].Value.toString() })
                  })
                }}
              >
                <p className="text-slate-300 text-xl">Limpar</p>
              </button>
            </div>
            <div className="flex flex-row w-1/2">
              <Select title="Tabela" data={tabelas} onChange={changeTabela} />
            </div>
          </div>

          <div className="flex flex-col h-2/6 border border-slate-500 rounded mb-1 mx-4">
            <div className="flex flex-row h-1/2 p-0">
              <Select title="Tipo" data={tipos} onChange={changeTipo} />
            </div>

            <div className="flex flex-row h-1/2 p-0">
              <Select title="Marca" data={marcas} onChange={changeMarca} />
            </div>
          </div>

          <div className="flex flex-col h-2/6 border border-slate-500 rounded mb-1 mx-4">
            <div className="flex flex-row h-1/2 p-0">
              <Select title="Modelo" data={modelos} onChange={changeModelo} />
            </div>
            <div className="flex flex-row h-1/2 p-0">
              <Select title="Ano" data={anos} onChange={changeAno} />
            </div>
          </div>

          <div className="flex flex-row h-1/6 py-0 px-4">
            <div className="flex w-full justify-center items-center bg-slate-800 rounded">
              <p className="font-bold text-green-400 text-3xl">{preco || 'R$ 0,00'}</p>
            </div>
          </div>

        </div>

        <div className="h-2/6 w-[90%] flex justify-center items-center p-0">
          {(imagem && imagem != '')
            ?
            <img className="object-contain h-full m-0 p-0" src={imagem ? imagem : undefined}></img>
            : <div className="self-center text-slate-100">
              <p>procurando imagem...</p>
            </div>
          }
        </div>

      </div>
    </div >
  );
}
