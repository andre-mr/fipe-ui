# :oncoming_automobile: Fipe UI
Frontend alternativo para consulta de preços de veículos Fipe.

<!-- SOBRE -->
## :page_with_curl: Sobre o projeto
Interface limpa para consulta de preços de veículos na "Tabela Fipe".
É um projeto de raspagem dupla, usando backend para consultar dados de tabelas e imagens de veículos do mecanismo de pesquisa do Google.

### :construction: Feito com
* [React](https://reactjs.org/)
* [Vite](https://vitejs.dev/)
* [Javascript](https://developer.mozilla.org/en/JavaScript)
* [Typescript](https://www.typescriptlang.org/)
* [Tailwind](https://tailwindcss.com/)
* [AWS Amplify](https://aws.amazon.com/amplify)
* [AWS API Gateway](https://aws.amazon.com/api-gateway)
* [AWS Lambda](https://aws.amazon.com/lambda)
* [Node](https://nodejs.org)

<!-- USO -->
## :desktop_computer: Uso básico
* Selecione o período da tabela (mês+ano).
* Selecione a marca.
* Selecione em qualquer ordem:
  * Modelo do veículo.
  * Ano e variação do veículo.
* Após a escolha do modelo, a lista de anos é filtrada automaticamente para corresponder a esse modelo.
* Após a escolha do ano, a lista de modelos é filtrada automaticamente para corresponder apenas aos veículos desse ano.
* O preço é mostrado após escolhidas todas as 4 opções.
* Uma pesquisa de imagens no Google é feita com as seleções feitas, e o primeiro resultado é mostrado.

<!-- NOTAS PARA DESENVOLVEDORES -->
## ⌨️ Notas para desenvolvedores
#### :man_technologist: AWS
O Github Actions não foi feito desta vez devido a limitações de uso de módulos Node, a compilação do Lambda é atualizada manualmente usando o método de upload de zip.
Não utilizando domínios pagos, é um projeto dev. 😉
#### :man_technologist: Fetch/Axios
O frontend (Amplify) está usando a API Fetch para chamar o backend.
O backend (AWS Lambda) está usando o Axios para obter dados da Fipe e do Google Images.
#### :man_technologist: React/Vite/Tailwind/Typescript
Desta vez decidi consumir o Tailwind para estilização e React em vez de vanilla, usando Vite como uma ferramenta de construção moderna e eficiente.
#### :iphone: Responsividade
É um aplicativo de página única, então tomei atenção básica com a responsividade, buscando compatibilidade com monitor widescreen padrão e smartphone no modo retrato.
#### :earth_americas: Idioma
Por enquanto, a interface do usuário está toda em português brasileiro. Por outro lado, todo o código é misturado com inglês.
#### :mag: Raspagem
Este é um projeto de raspagem dupla, não usando a API de pesquisa do Google, mas a URL de pesquisa padrão com parâmetros, e técnicas de regex para encontrar a URL da imagem nos resultados.
A Fipe não possui uma API de desenvolvedor, portanto foram utilizadas as chamadas de API do website.
