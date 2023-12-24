//DEFINICION DE VARIABLES
let itemSelec
let fiestaAlquiler

const i1 = ["I1", "Mesa", 3000, 30000, 50, 50];
const i2 = ["I2", "Silla", 1000, 10000, 500, 500];
const i3 = ["I3", "Mantel", 500, 5000, 500, 500];
const i4 = ["I4", "Plato", 150, 1500, 5000, 500];
const i5 = ["I5", "Cubiertos", 100, 1000, 50, 50];

//DEFINICION DE CLASES
class fiesta{
    constructor(){
        this.nombre = prompt("Ingrese el nombre del evento del alquiler actual");
        do{
            let fechaEve = new Date(prompt("ingrese fecha del evento (Formato: YYYYY-MM-DD):"));
            this.fechaEve = fechaEve;
        }while((!this.fechaEve instanceof Date) || isNaN(this.fechaEve))
        do{
            let fechaIni = new Date(prompt("Ingrese la fecha de inicio del alquiler (Formato: YYYYY-MM-DD):"));
            this.fechaIni = fechaIni;
        }while(((!this.fechaIni instanceof Date) || isNaN(this.fechaIni)) || (this.fechaIni > this.fechaEve))
        // ;
        // this.fechaFin = prompt("Ingrese la fecha de finalizacion del aqluiler");
    }

}

class cliente{
    constructor(cuit, nombre){
        this.cuit=cuit;
        this.nombre=nombre;
    }
}
//DEFINICION DE FUNCIONES


//INICIO DE LA APP

alert("SISTEMA DE ALQUILER DE EQUIPAMIENTOS PARA FIESTAS!! \n Para iniciar registre un evento:");

    fiestaAlquiler = new fiesta()
    
    alert(fiestaAlquiler.fechaIni);