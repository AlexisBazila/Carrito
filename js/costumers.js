///DEFINICION DE VARIABLES
let clientes = new Array();

//DEFINICION DE CLASES
class cliente {
    constructor() {
      this.nombre = document.getElementById("nombrecli").value;
      this.cuitdni = document.getElementById("cuitdni").value;
      this.telefon = document.getElementById("telcli").value;
      alert(`Se ha dado de alta el cliente con los siguientes datos: \n Nombre: ${this.nombre} \n DNI: ${this.cuitdni} \n Telefono: ${this.telefon}`)
      alert(listarClientes())
    }
  
    borrarCliente(id){
      
    }
  }

  function listarClientes(){
    let listaClientes = "ID - CUIT/DNI - Nombre \n";
    for (let i = 0; i < clientes.length; i++) {
      listaClientes +=  `${i} -> ${clientes[i].cuitdni} - ${clientes[i].nombre}`
      if (i < clientes.length - 1) {
        listaClientes += "\n";
      }
    }
    return listaClientes;
  }

  let alta = document.getElementById("altacli");
  alta.addEventListener("click", () => clientes.push(new cliente()));

//   let listar = document.getElementById("listarcli");
//   listar.addEventListener("click", () => listarClientes);
  