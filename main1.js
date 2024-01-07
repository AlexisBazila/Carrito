//DEFINICION DE VARIABLES
let itemSelec;
let fiestas = new Array();
let clientes = new Array();


const i1 = ["I1", "Mesa", 3000, 30000, 50, 50];
const i2 = ["I2", "Silla", 1000, 10000, 500, 500];
const i3 = ["I3", "Mantel", 500, 5000, 500, 500];
const i4 = ["I4", "Plato", 150, 1500, 5000, 500];
const i5 = ["I5", "Cubiertos", 100, 1000, 50, 50];

//DEFINICION DE CLASES
class fiesta {
  constructor(cliente) {
    this.cliente=cliente;
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
    this.nombre = prompt("Ingrese su nombre");
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
//DEFINICION DE FUNCIONES
function listarClientes(){
  let listaClientes = "";
  for (let i = 0; i < clientes.length; i++) {
    listaClientes +=  `${i} -> ${clientes[i].cuitdni} - ${clientes[i].nombre}`
    if (i < clientes.length - 1) {
      listaClientes += "\n";
    }
  }
  return listaClientes;
}
//INICIO DE LA APP

alert(
  "SISTEMA DE ALQUILER DE EQUIPAMIENTOS PARA FIESTAS!! \n Para iniciar registre un evento:"
);

// fiestaAlquiler = new fiesta()
// alert(`El evento ${fiestaAlquiler.nombre} fue creado con fecha ${fiestaAlquiler.fechaEve}.`);
// alert(`El alquiler para el evento ${fiestaAlquiler.nombre} inicia el ${fiestaAlquiler.fechaIni} y finaliza el ${fiestaAlquiler.fechaFin}.`);
// alert(`El alquiler es de ${fiestaAlquiler.diasAlquiler()} Dias`);

// let cliente1 = new cliente();
// alert(`El cliente ${cliente1.nombre} fue creado con el tipo: ${cliente1.tipo} y el identificador: ${cliente1.cuitdni}`);

// do{
//   clientes.push(new cliente())
// }while(confirm("Desea cargar un nuevo cliente?"))
// do{
//   let IdCliente = prompt(`Seleccione el cliente con el que quiera regisrar la fiesta \n ${listarClientes()}`);
//   fiestas.push(new fiesta(clientes[IdCliente]))
// }while(confirm("Desea cargar un nuevo registro?"))

// alert(`La fiesta ${fiestas[0].nombre} pertenece al cliente ${fiestas[0].cliente.nombre}`);

