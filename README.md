# :oncoming_automobile: Fipe UI
Alternate frontend for Fipe vehicle prices.

<!-- ABOUT -->
## :page_with_curl: About the project
Clean interface for querying vehicle prices in the "Fipe Table".  
It's a double scraping project, using backend to query table data and vehicle images from Google search engine.

### :construction:	Built with
* [React](https://reactjs.org/)
* [Vite](https://vitejs.dev/)
* [Javascript](https://developer.mozilla.org/en/JavaScript)
* [Typescript](https://www.typescriptlang.org/)
* [Tailwind](https://tailwindcss.com/)
* [AWS Amplify](https://aws.amazon.com/amplify)
* [AWS API Gateway](https://aws.amazon.com/api-gateway)
* [AWS Lambda](https://aws.amazon.com/lambda)
* [Node](https://nodejs.org)

<!-- USAGE -->
## :desktop_computer:	Basic usage
* Select table period (month+year)
* Select manufacturer
* Select one first:
  * Vehicle model
  * Vehicle year and variation
* After model choice, the year list is automatically filtered to match that model
* After year choice, the model list is automatically filtered to match only vehicles from that year
* Price is shown after all 4 choices done
* A google image search is made with selections made, and the first result is shown.

<!-- NOTES FOR DEVELOPERS -->
## :keyboard:	Notes for developers
#### :man_technologist:	AWS
Github Actions wasn't made this time because of limitations to use Node modules, the Lambda build is updated manually using zip upload method.
Not using paid domains, it's a dev project. 😉
#### :man_technologist:	Fetch/Axios
Frontend (Amplify) is using Fetch API to call backend.
Backend (AWS Lambda) is using Axios to get data from Fipe and Google Images.  
#### :man_technologist:	React/Vite/Tailwind/Typescript
This time I decided to consume Tailwind for styling and React instead of vanilla, using Vite as a modern and efficient build tool.
#### :iphone: Responsiveness
It's a single page application, so i made basic responsiveness care, to fit a default widescreen monitor and a portrait oriented phone.
#### :earth_americas:	Language
For now, the user interface is all in Brazilian Portuguese. On the other hand, all code is mixed with English.
#### :mag: Scraping
This is a double scraping project, not using Google Search API, but default search url with parameters, and regex techniques to find image url inside results.  
Fipe doesn't have a developer API, so the website api calls were used instead.
