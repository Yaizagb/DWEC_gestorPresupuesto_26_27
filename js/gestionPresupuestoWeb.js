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
   //bton
   let btnEdit = document.createElement("button");
   btnEdit.textContent = "Editar";
   btnEdit.className = "gasto-editar";

   let handler = new EditarHandle();
   handler.gasto = gasto;

   btnEdit.addEventListener("click", handler);
    elemento.append(divGasto);
    divGasto.append(divDesc, divFecha, divValor, divEtiqueta, btnEdit);
 
    
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
    const botonNuevoGastWeb = document.getElementById("anyadirgasto");
    botonNuevoGastWeb.addEventListener("click", nuevoGastoWeb)
function nuevoGastoWeb(){
    let desc = prompt("Dame la descripción del gasto nuevo a introducir")
    let valor = Number(prompt("Dame el valor del gasto"));
    let fecha =prompt("Dame la fecha en la que se realizó el gasto");
    let etiquetas = prompt("Indicame las etiquetas del gasto separadas por una ,").split(",");

    let gasto = new gestionPresupuesto.CrearGasto(desc,valor,fecha, ...etiquetas);
    gestionPresupuesto.anyadirGasto(gasto);
    repintar();

}
function EditarHandle(){

    this.handleEvent = function(){
        let desc = prompt("Nueva descripción", this.gasto.descripcion);
        let valor = Number(prompt("Nuevo valor", this.gasto.valor));
        let fecha = prompt("Nueva fecha",new Date(this.gasto.fecha).toISOString().slice(0, 10));
        let etiquetas = prompt("Nuevas etiquetas separadas por comas",this.gasto.etiquetas.join(","));
        this.gasto.actualizarDescripcion(desc);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);

        this.gasto.anyadirEtiquetas(...etiquetas.split(","));

        repintar();
    };

}
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb
}
