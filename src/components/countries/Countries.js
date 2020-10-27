import React, { Component } from 'react'
import Country from './Country';

import css from './countries.module.css';

export default class Countries extends Component {

    render() {

        //vai chegar uma props que irá ser chamada de countries
        const { countries } = this.props;


        return (
            <div className={`${css.border} ${css.flexRow}` }>
                

                    {/*  o elemento ul neste caso irá receber  cada iteração do map */}

                    {
                        countries.map(country => {
                            //é recomendado que seja inserido no elemnto que se repete uma key que 
                            //diferencia o elemento dos demais
                            //Na Classe Country   a props country recebe o valor do parâmetro country
                            //esse valor é elemento  que esta sendo iterado pelo array 
                            return <Country key={country.id} country={country} />
                        })
                    }
        
            </div>
        )
    }
}
