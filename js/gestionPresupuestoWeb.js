'use strict'
//Contiene utilidades para mostrar datos en la página interaccionHTML.html
//colocar export
//npm run test 4
//npx cypress open testeo de manera gráfica

function mostrarDatoEnId(idElemento, valor){
    const elemento = document.getElementById(idElemento);
    if(elemento){
        elemento.textContent = valor;
    }
    console.warn(`no se encontró ningún elemento con el id: ${idElemento}`);
}

function mostrarGastoWeb(idElemento,gasto){
    const elemento = document.getElementById(idElemento);
}
function mostrarGastosAgrupadosWeb(){

}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}
