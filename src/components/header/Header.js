import React, { Component } from 'react'
import { formatNumber } from '../../helpers/formatHelpers';

import css from './header.module.css'

export default class Header extends Component {

    //implementando o handle
    // onChange  é acionado com o evento de digitação no input
    //captura o evento do input 
    //e passa como parâmetro pro handleInputChange
    //o valor do value no input é extraido e inserido na const newText
    //passa como o parâmetro o  valor de newText para props onChageFilter
    handleInputChange = (event) => {
           
            // atribuindo o valor value à const newText
            const newText = event.target.value;

            //recebendo o valor do value como parâmetro
            //esse valor será atribuido para a função handleChangeFilter em App.js
            this.props.onChangeFilter(newText);
    }




    render() {

        // recebendo a props
        // desestruturando a props
        const { filter, countryCount, totalPopulation } = this.props;


        return (

            <div className={css.flexRow}>

                {/* o value recebe o valor da props filter, que incialmente é '' vazio
                após o acionamento do onChange atravpés da digitação d elementos
                o valor do value é alterado
                a função handleInputChange é acionada pelo onChange
                e captura o valor do value e renvia para o arquivo app.js
                esse valor ao ser tratado irá alterar o state filter que basicamente atribui valor
                a props filter utilizada abaixo
                
                a props countryCount recebe a qauntidade de itens no vetor
                refletidno assim a quantidade de países

                a props totalPopulation exibe a qauntidade da soma da população de todos os paises filtrados
                
                */}
                <input placeholder='Filtro' style={ {Width: '300px'} } 
                        type='text'  value={filter}  onChange={this.handleInputChange}   /> |


                 <span className={css.countries}>Países: <strong> {countryCount} </strong></span> |

                 <span className={css.population}>População: <strong>{ formatNumber(totalPopulation)} </strong> </span>
                
            </div>
        )
    }
}
