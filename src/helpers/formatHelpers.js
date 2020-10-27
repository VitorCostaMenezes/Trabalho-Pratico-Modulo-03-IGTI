//importando a api propria do java script para formatação dw números
const formatter =  Intl.NumberFormat('pt-BR');



function formatNumber (value) {
    //transforma o valor recebedio para um padrão de numeração brasileiro
    return formatter.format(value);
}

export {  formatNumber };