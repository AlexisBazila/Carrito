///DEFINICION DE VARIABLES
let clientes = new Array();

//DEFINICION DE CLASES
class cliente {
    constructor() {
      this.nombre = document.getElementById("nombrecli").value;
      this.cuitdni = document.getElementById("cuitdni").value;
      this.telefon = document.getElementById("telcli").value;
    }
  
    borrarCliente(id){
      
    }
  }

  function listarClientes(){
    let sectCos = document.getElementById("viewCostumers");
    sectCos.innerHTML = ""
    for (let i = 0; i < clientes.length; i++) {
      let divCos = document.createElement("div");
      sectCos.appendChild(divCos);
      let pCos = document.createElement("p");
      divCos.appendChild(pCos);
      let NombreCos = document.createTextNode(`${i} -> ${clientes[i].cuitdni} - ${clientes[i].nombre}`);
      pCos.appendChild(NombreCos);
      const jsonCost = JSON.stringify(clientes);
      localStorage.setItem("Costumers", jsonCost);
    }
  }

  let alta = document.getElementById("altacli");
  alta.addEventListener("click", (e) => {
    e.preventDefault();
    clientes.push(new cliente());
    listarClientes();
    }
  )
  