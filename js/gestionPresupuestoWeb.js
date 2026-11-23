'use strict'
//Contiene utilidades para mostrar datos en la página interaccionHTML.html
//colocar export
//npm run test 4
//npx cypress open testeo de manera gráfica
import * as gestionPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor){
    let elemento = document.getElementById(idElemento);
    elemento.textContent = valor;

}

function mostrarGastoWeb(idElemento,gasto){
    const elemento = document.getElementById(idElemento);
    let divGasto = document.createElement("div");
    let divDesc = document.createElement("div");
   divGasto.className = "gasto";
   divDesc.className = "gasto-descripcion";
    let divFecha = document.createElement("div");
    divFecha.className = "gasto-fecha";
    let divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    let divEtiqueta = document.createElement("div");
    divEtiqueta.className = "gasto-etiquetas";
    divDesc.textContent = gasto.descripcion;
    divFecha.textContent = gasto.fecha;
    divValor.textContent = gasto.valor;
    
    gasto.etiquetas.forEach(etiqueta => {
        let etiq = document.createElement("span");
        etiq.className = "gasto-etiquetas-etiqueta"
        etiq.textContent = etiqueta;
        divEtiqueta.appendChild(etiq);
    });
    elemento.append(divGasto);
    divGasto.append(divDesc, divFecha, divValor, divEtiqueta);
 
    
}
function mostrarGastosAgrupadosWeb(idElemento,agrup, periodo){
    const elemento = document.getElementById(idElemento);
    let divAgrupacion = document.createElement("div");
    divAgrupacion.className = "agrupacion";
   

    let h1 = document.createElement("h1");
    h1.textContent = `Gastos agrupados por ${periodo}`;
    divAgrupacion.appendChild(h1);

    for(let clave in agrup) { //para reccorrer propiedades de un objeto
        const divAgrDato = document.createElement("div");
        divAgrDato.className = "agrupacion-dato";

        let spanClave = document.createElement("span");
        spanClave.className = "agrupacion-dato-clave";
        spanClave.textContent = clave; //nomber del valor

        let spanDato = document.createElement("span");
        spanDato.className = "agrupacion-dato-valor";
        spanDato.textContent = agrup[clave]; //valor

        divAgrDato.append(spanClave,spanDato);
        divAgrupacion.appendChild(divAgrDato);
        
    };
    elemento.append(divAgrupacion);
}
function repintar(){
    let presupuesto = gestionPresupuesto.mostrarPresupuesto();
    mostrarDatoEnId("presupuesto", presupuesto);
    let gastosTot = gestionPresupuesto.calcularTotalGastos();
    mostrarDatoEnId("gastos-totales", gastosTot);
    let balance = gestionPresupuesto.calcularBalance();
    mostrarDatoEnId("balance-total", balance);
    document.getElementById("listado-gastos-completo").innerHTML = "";
    let listadoGastos = gestionPresupuesto.listarGastos();
    listadoGastos.forEach(gasto => {
        mostrarGastoWeb("listado-gastos-completo",gasto);//!se coloca uno debajo de otro por que en mostrar gasto web usamos append
    });

}

// si le pones paréntesis le indica que ejecute inmediatamente la función
     const botonActPre = document.getElementById("actualizarpresupuesto");
     botonActPre.addEventListener("click", actualizarPresupuestoWeb);

function actualizarPresupuestoWeb(){
    let presupuestoUsu = prompt("Introduce tu presupuesto");
    const presupuesto = Number(presupuestoUsu);
     gestionPresupuesto.actualizarPresupuesto(presupuesto);
     repintar();

}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb
}
