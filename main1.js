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
        let fechaEve = new Date(prompt("Ingrese la fecha del evento (Formato: YYYYY-MM-DD):"));
        if((!fechaEve instanceof Date) || isNaN(fechaEve)){
            while((!this.fechaEve instanceof Date) || isNaN(this.fechaEve)){
                let fechaEve = new Date(prompt("la fecha ingresada no es correcta, por favor ingrese la fecha del evento (Formato: YYYYY-MM-DD):"));
                this.fechaEve = fechaEve;
            }
        }else{
            this.fechaEve = fechaEve;
        }

        let fechaIni = new Date(prompt("Ingrese la fecha de inicio del alquiler (Formato: YYYYY-MM-DD):"));
        if(((!fechaIni instanceof Date) || isNaN(fechaIni)) || (fechaIni > fechaEve)){

        }else{
            
        }


        // do{

        //     this.fechaIni = fechaIni;
        // }while(((!this.fechaIni instanceof Date) || isNaN(this.fechaIni)) || (this.fechaIni > this.fechaEve))
        // do{
        //     let fechaFin = new Date(prompt("Ingrese la fecha de finalizacion del aqluiler (Formato: YYYYY-MM-DD):"));
        //     this.fechaFin = fechaFin;
        // }while(((!this.fechaFin instanceof Date) || isNaN(this.fechaFin)) || (this.fechaFin > this.fechaIni))
        
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
    
    alert(fiestaAlquiler.fechaEve);