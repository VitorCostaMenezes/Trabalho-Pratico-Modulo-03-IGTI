import React, { Component } from 'react'

import css from './countries.module.css';


export default class Country extends Component {

    render() {

        //recebendo um props
        // desetruturando a props
        const { country } = this.props;


        //desetruturando o country
        const {name, flag} = country;



        return (
            <div className={` ${css.country} ${css.border} `}>

                <img className={css.flag} src={flag} alt={name} />

                {/* a props country recebe o elemento a cada iteração do map no aruivo Countries.js 
                trata da forma adequada e envia novamente para a chamada da classe Country */}
             <span className={css.countryName}>{name}</span>   
            </div>
        )
    }
}
