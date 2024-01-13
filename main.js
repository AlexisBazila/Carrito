///DEFINICION DE VARIABLES
let itemSelec;
let eventos = new Array();
let clientes = new Array();
let items = new Array();
let alquileres = new Array();


items[0] = { nombre: "Mesa", precioAlquiler: 3000, precioReposicion: 30000, stock: 50, Disponible: 50 };
items[1] = { nombre: "Silla", precioAlquiler: 1000, precioReposicion: 10000, stock: 500, Disponible: 500 };
items[2] = { nombre: "Mantel", precioAlquiler: 500, precioReposicion: 5000, stock: 500, Disponible: 500 };
items[3] = { nombre: "Plato", precioAlquiler: 150, precioReposicion: 1500, stock: 5000, Disponible: 500 };
items[4] = { nombre: "Cubiertos", precioAlquiler: 100, precioReposicion: 1000, stock: 50, Disponible: 50 };

//DEFINICION DE CLASES
class evento {
  constructor() {
    this.nombre = prompt("Ingrese el nombre del evento del alquiler actual");
    let fechaEve = new Date(
      prompt("Ingrese la fecha del evento (Formato: YYYYY-MM-DD):")
    );
    if (!fechaEve instanceof Date || isNaN(fechaEve)) {
      while (!this.fechaEve instanceof Date || isNaN(this.fechaEve)) {
        let fechaEve = new Date(
          prompt(
            "la fecha ingresada no es correcta, por favor ingrese la fecha del evento (Formato: YYYYY-MM-DD):"
          )
        );
        this.fechaEve = fechaEve;
      }
    } else {
      this.fechaEve = fechaEve;
    }
    let fechaIni = new Date(
      prompt("Ingrese la fecha de inicio del alquiler (Formato: YYYYY-MM-DD):")
    );
    if (!fechaIni instanceof Date || isNaN(fechaIni) || fechaIni > fechaEve) {
      while (
        !this.fechaIni instanceof Date ||
        isNaN(this.fechaIni) ||
        this.fechaIni > this.fechaEve
      ) {
        let fechaIni = new Date(
          prompt(
            "la fecha ingresada no es correcta, ingrese la fecha de inicio del alquiler (Formato: YYYYY-MM-DD):"
          )
        );
        this.fechaIni = fechaIni;
      }
    } else {
      this.fechaIni = fechaIni;
    }
    let fechaFin = new Date(
      prompt(
        "Ingrese la fecha de finalizacion del aqluiler (Formato: YYYYY-MM-DD):"
      )
    );
    if (!fechaFin instanceof Date || isNaN(fechaFin) || fechaFin < fechaIni) {
      while (
        !this.fechaFin instanceof Date ||
        isNaN(this.fechaFin) ||
        this.fechaFin < this.fechaIni
      ) {
        let fechaFin = new Date(
          prompt(
            "la fecha ingresada no es correcta, ingrese la fecha de finalizacion del aqluiler (Formato: YYYYY-MM-DD):"
          )
        );
        this.fechaFin = fechaFin;
      }
    } else {
      this.fechaFin = fechaFin;
    }
  }

  diasAlquiler() {
    let diasDeAlquiler =
      (this.fechaFin - this.fechaIni) / (24 * 60 * 60 * 1000);
    return diasDeAlquiler;
  }

  
}

class cliente {
  constructor() {
    this.nombre = prompt("Ingrese el nombre del cliente");
    while (this.nombre == "") {
      this.nombre = prompt("Debe ingresar un nombre para continuar");
    }
    this.cuitdni = prompt(
      "ingrese su n° de cuit sin guiones o su numero de DNI"
    );
    let inicioCuit = this.cuitdni.slice(0, 2);
    while (
      (this.cuitdni.length !== 7 &&
        this.cuitdni.length !== 8 &&
        this.cuitdni.length !== 11) ||
      (this.cuitdni.length === 11 &&
        ![20, 23, 27, 30].includes(parseInt(inicioCuit)))
    ) {
      this.cuitdni = prompt(
        "El dato ingresado no coincide ni con un DNI ni con un cuit. ingrese su n° de cuit sin guiones o su numero de DNI"
      );
      let inicioCuit = this.cuitdni.slice(0, 2);
    }
  }

  borrarCliente(){
      clientes.splice(clientes.indexOf(this), 1);
      alert(`El cliente ${this.nombre} ha sido eliminado.`);
  }

  modificar(){
    let nombre = prompt("Ingrese el nombre del cliente");
    while (nombre == "") {
      nombre = prompt("Debe ingresar un nombre para continuar");
    }
    let cuitdni = prompt(
      "ingrese su n° de cuit sin guiones o su numero de DNI"
    );
    let inicioCuit = cuitdni.slice(0, 2);
    while (
      (cuitdni.length !== 7 &&
        cuitdni.length !== 8 &&
        cuitdni.length !== 11) ||
      (cuitdni.length === 11 &&
        ![20, 23, 27, 30].includes(parseInt(inicioCuit)))
    ) {
      cuitdni = prompt(
        "El dato ingresado no coincide ni con un DNI ni con un cuit. ingrese su n° de cuit sin guiones o su numero de DNI"
      );
      let inicioCuit = cuitdni.slice(0, 2);
    }
    clientes[clientes.indexOf(this)].nombre=nombre
    clientes[clientes.indexOf(this)].cuitdni=cuitdni
  }

}

class alquiler{
  constructor(cliente){
    this.cliente = cliente;
    this.evento = new evento();
    this.itemsAlquiler = [];
    do{
      let idItem = prompt(`Seleccione el item a agregar en el alquiler \n ${listarItems()}`);
      let cantidad = prompt("Indique la cantidad a alquilar");
      this.itemsAlquiler.push({id: idItem, cantidad: cantidad});
      items[idItem].Disponible -= cantidad
    }while(confirm("Desea cargar un nuevo item?"))
  }
}

//DEFINICION DE FUNCIONES
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

function listarAlquileres(){
  let listaAlquileres = "ID - Evento - Fecha del evento - Fecha de inicio Alq. - Fecha de fin del Alq. - Cliente \n";
  for (let i = 0; i < alquileres.length; i++) {
    listaAlquileres +=  `${i} -> ${alquileres[i].evento.nombre} - ${alquileres[i].evento.fechaEve} - ${alquileres[i].evento.fechaIni} - ${alquileres[i].evento.fechaFin} - Cliente: - ${alquileres[i].cliente.nombre}`
    if (i < alquileres.length - 1) {
      listaAlquileres += "\n";
    }
  }
  return listaAlquileres;
}

function listarItems(){
  let listaItems = "ID - Item - Precio - Stock \n";
  for (let i = 0; i < 4; i++) {
    listaItems +=  `${i} -> ${items[i].nombre} - ${items[i].precioAlquiler} - ${items[i].Disponible}`
    if (i < items.length - 1) {
      listaItems += "\n";
    }
  }
  return listaItems;
}

function calcularCosto(alquiler){
  let total = 0;
  let subtotal = 0;
  for (let i = 0; i < alquileres[alquiler].itemsAlquiler.length; i++) {
    subtotal = items[alquileres[alquiler].itemsAlquiler[i].id].precioAlquiler * alquileres[alquiler].itemsAlquiler[i].cantidad;
    total += subtotal;
    subtotal=0;   
  }
  return total;
}

//INICIO DE LA APP
alert(
  "SISTEMA DE ALQUILER DE EQUIPAMIENTOS PARA FIESTAS!! \n Para iniciar precione aceptar."
);

do{
  let codigo = "";
  codigo = prompt(
    `Digite una de las letras para continuar al menu correspondiente \n
    C -> Menu Clientes \n
    A -> Menu Alquileres \n `
  );

  switch (codigo){
    case "C":
        codigo = prompt(
            `ha accedido al menu cliente, digite un codigo para contunuar \n
            A -> Alta Clientes \n
            B -> Baja Clientes \n 
            M -> Modificacion Clientes \n`
          );
          switch (codigo){
            case "A":
                do{
                    clientes.push(new cliente())
                  }while(confirm("Desea cargar un nuevo cliente?"))
                break;
            case "B":
                do{
                  let IdCliente = prompt(`Seleccione el cliente que desea eliminar: \n ${listarClientes()}`);
                  clientes[IdCliente].borrarCliente()
                }while(confirm("Desea eliminar otro cliente?"))
                break;
            case "M":
              do{
                let IdCliente = prompt(`Seleccione el cliente que desea modificar: \n ${listarClientes()}`);
                clientes[IdCliente].modificar()
              }while(confirm("Desea modificar otro cliente?"))
                break;
            default:
                alert(`el codigo ${codigo} no se una opcion valida`);
                break;
          }
        break;
    case "A":
        codigo = prompt(
            `ha accedido al menu Alquileres, digite un codigo para contunuar \n
            A -> Alta Alquileres \n
            B -> Baja Alquileres \n 
            M -> Modificacion Alquileres \n
            T -> Totalizar costos alquiler \n`
          );
          switch (codigo){
            case "A":
              while(clientes.length === 0){
                alert("Para cargar un alquiler debe de tener al menos un cliente cargado");
                do{
                  clientes.push(new cliente())
                }while(confirm("Desea cargar otro cliente?"))
              }
              do{
                let IdCliente = prompt(`Seleccione el cliente a registrar el alquiler \n ${listarClientes()}`);
                alquileres.push(new alquiler(clientes[IdCliente]))
              }while(confirm("Desea cargar un nuevo alquiler?"))
                break;
            case "B":
                break;
            case "M":
                break;
            case "T":
                do{
                    let IdAlquiler = prompt(`Seleccione el alquiler que desea totalizar: \n ${listarAlquileres()}`);
                    alert(calcularCosto(IdAlquiler));
                  }while(confirm("Desea calcular otro costo?"))
                 break;
            default:
                alert(`el codigo ${codigo} no se una opcion valida`);
                break;
          }
        break;
        break;
    default:
        alert(`el codigo ${codigo} no se una opcion valida`);
        break;
}
}while(confirm("Desea realizar otra operacion?"))











