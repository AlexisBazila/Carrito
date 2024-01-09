//DEFINICION DE VARIABLES
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
    this.tipo = prompt(
      "Ingrese su tipo de persona (M= Masculino | F= Femenino | J= juridica"
    );
    while (this.tipo == "" || !["M", "F", "J"].includes(this.tipo)) {
      this.tipo = prompt(
        "No se ha ingresado un tipo correcto. Ingrese su tipo de persona (M= Masculino | F= Femenino | J= juridica"
      );
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

    // if (cuitdni.length === 7 || cuitdni.length === 8) {
    //   alert("El dato ingresado es un DNI, vamos a calcular su cuit");
    // } else if (cuitdni.length === 11) {
    //   alert(
    //     "El dato que ingresaste puede que sea un CUIT. Veamos con qué comienza."
    //   );
    //   let inicioCuit = cuitdni.slice(0, 2);
    //   alert(inicioCuit);

    //   if ([20, 23, 27, 30].includes(parseInt(inicioCuit))) {
    //     alert(
    //       "Definitivamente es un número de CUIT. Permítanos validar si es correcto."
    //     );
    //     let finalCuit = cuitdni.slice(10, 11);
    //     alert(`Su CUIT inicia con ${inicioCuit} y finaliza con ${finalCuit}`);
    //     let dniDelCuit = cuitdni.slice(2, 10);
    //     alert(`Su DNI es ${dniDelCuit}`);

    //     let cuitBase = cuitdni;
    //     alert(cuitBase);
    //     let suma = 0;

    //     for (let i = 0; i < cuitBase.length; i++) {
    //       let digito = parseInt(cuitBase.charAt(i));
    //       digito *= i % 2 === 0 ? 2 : 1;
    //       digito = digito > 9 ? digito - 9 : digito;
    //       suma += digito;
    //     }

    //     let digitoVerificador = (10 - (suma % 10)) % 10;
    //     alert(digitoVerificador);
    //   }
    // } else {
    //   alert(
    //     "El dato ingresado no parece coincidir ni con un cuit ni con un dni, intentemoslo de nuevo"
    //   );
    // }
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
  "SISTEMA DE ALQUILER DE EQUIPAMIENTOS PARA FIESTAS!! \n Para iniciar registre un cliente:"
);

do{
  clientes.push(new cliente())
}while(confirm("Desea cargar un nuevo cliente?"))


do{
  let IdCliente = prompt(`Seleccione el cliente a registrar el alquiler \n ${listarClientes()}`);
  alquileres.push(new alquiler(clientes[IdCliente]))
}while(confirm("Desea cargar un nuevo alquiler?"))

do{
  let IdAlquiler = prompt(`Seleccione el alquiler que desea totalizar: \n ${listarAlquileres()}`);
  alert(calcularCosto(IdAlquiler));
}while(confirm("Desea calcular otro costo?"))




