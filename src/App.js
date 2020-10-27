import React, { Component } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/header/Header';


export default class App extends Component {

  //criando a classe constructor
  constructor () {
    super();//extendendo {a classe Component}

      //incializando um estado
    this.state = {
        //allCountries receberá o valor da API e não irá se alterar
        allCountries: [],

        //filteredCountries ficaraá se alterando de acordo com o filtro aplicado
        filteredCountries: [],

        //nunca criar staados que gerenciam filtros começando com null ou undefined
        filter: '',
    };
  }

  async componentDidMount() {

    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const json = await res.json();

    //desetruturando diretamente no parâmetro do map
    const allCountries = json.map(({name, numericCode, flag, population}) => {
      return{

        //como a propriedade mapeada irá levar o mesmo nome da propriedade orginal
        //não é rpeciso repetir o nome, no cado do id 
        //o nome original é numericCode
        id: numericCode,
        name,
        //um nome para ser usado no filtro
        filterName: name.toLowerCase(),
        filteredPopulation: 0,
        flag,
        population,

      }
    });

    //atribuindo um valor incial ao filteredPopulation
    //neste caso o parâmetro allCountries recebido pela função
    //reflete a soma d apopulação de todos os países
    const filteredPopulation = this.calculateTotalPopulationFrom(allCountries);
    


      //inserindo o valor da variavel allCountries no state allcountries
     this.setState({
      //como no exemplo acima, quando o identificador leva o mesmo nome que o valor
      //é possivel omitir então esse identificador
      //seria possivel utilizar apenas   o allCountries,      no lugar de 
      //allCountries: allCountries,
       allCountries: allCountries,

        //no incio, quando a página abrir, o conteudo do filtereCountries
        //será o mesmo de allCountries
        //como o filteredCaountries aponta para o mesmo local que all countries é indicado
        //fazer um cópia ao invés de apontar para o memso local
        //a copia é feita através do    Object.assign([], variavel a ser copiada)
       filteredCountries: Object.assign([] , allCountries),

      //inciando o estado com a população total de todos os países
       filteredPopulation: filteredPopulation,

     });
  }

  calculateTotalPopulationFrom = (countries) => {
    //verificando a qauntidade da população de todos os países
    //  e atribuindo um valor incial ao filteredPopulation

    const totalPopulation = countries.reduce((accumulator, current) => {
      return accumulator + current.population;
    }, 0);

    return totalPopulation;

  }




  //essa função recebe o valor desse avento através da props onChangeFilter
  handleChangeFilter = (newText) => {

    //alterando o state
    this.setState({
      filter: newText,
    });

    //convertendo o valor de newText para caracterees minusculos
    const filterLowerCase = newText.toLowerCase();

    const filteredCountries = this.state.allCountries.filter(country => {
        //o filtro retorna  os elementos que tiverem o valor de newtext inclusos
        //em seu filterName
        return   country.filterName.includes(filterLowerCase);
    });

    //calcula a soma da população com base nos países filtrados
    const filteredPopulation = this.calculateTotalPopulationFrom(filteredCountries);




    this.setState({
      //como o identificador e propriedade possuem o mesmo nome , eles poderiams er inseridos sozinho
      // ex: filteredCountries, filteredPopulation
      filteredCountries: filteredCountries,
      filteredPopulation: filteredPopulation,

    })


  };


  render() {

    //desestruturabndo o state
    const {filteredCountries, filteredPopulation, filter} = this.state;


      //usando o materialize para formatar o documento
    return(
      <div className="container">
    
         <h1 style={styles.centeredTitle}> React Countries</h1>;

        {/* Recebe o array filtrado
            a props filter recebe o valor de filter como parâmetro
            e envia para Classe Header, onde será tratado

           a props onChangeFilter é uma props de evento
           ao ser disparada essa props prcisa de um metodo pra lidar com isso
           neese caso é disparada a função handleChangeFilter
           a props onChangeFilter recebe a função handleChangeFilter como parâmetro
           
           a props filter recebe o valor do state filter, que inicialmente esta vazio
           poré, apos a o acionamento do onChangeFilter a função handleChnageFilter é executada
           alterando assim o conteudo do state filter e consequentemente o valor do value no arquivo Header.js

           a props countryCount recebe como parâmetro a quantidade de elementos no vetor FilteredCountries
           esse valor será convertido na quantidade de países

           a props totalPopulation, recebe a qauntidade da soma dos países filtrados

         */}

         <Header filter={filter}
                countryCount={filteredCountries.length}
                totalPopulation={filteredPopulation}
                onChangeFilter={this.handleChangeFilter} />


        {/* acessa a classe Countries, e manda o valor de allCountries para a props coutries */}
         <Countries  countries={filteredCountries} />

      </div>
    ) 

  }
}

//criando um elemnto style para ser usado no titulo
const styles = {
  centeredTitle: {
    textAlign: 'center',
  }
}