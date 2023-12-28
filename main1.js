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
            while(((!this.fechaIni instanceof Date) || isNaN(this.fechaIni)) || (this.fechaIni > this.fechaEve)){
                let fechaIni = new Date(prompt("la fecha ingresada no es correcta, ingrese la fecha de inicio del alquiler (Formato: YYYYY-MM-DD):"));
                this.fechaIni=fechaIni
            }
        }else{
            this.fechaIni = fechaIni;
        }
        let fechaFin = new Date(prompt("Ingrese la fecha de finalizacion del aqluiler (Formato: YYYYY-MM-DD):"))
        if(((!fechaFin instanceof Date) || isNaN(fechaFin)) || (fechaFin < fechaIni)){
            while(((!this.fechaFin instanceof Date) || isNaN(this.fechaFin)) || (this.fechaFin < this.fechaIni)){
                let fechaFin = new Date(prompt("la fecha ingresada no es correcta, ingrese la fecha de finalizacion del aqluiler (Formato: YYYYY-MM-DD):"));
                this.fechaFin = fechaFin;
            }
        }else{
            this.fechaFin = fechaFin;
        } 
    }

    diasAlquiler(){
        let diasDeAlquiler= ((this.fechaFin - this.fechaIni) / (24 * 60 * 60 * 1000));
        return diasDeAlquiler;
    }
}

class cliente{
    constructor(){
        let cuitdni = prompt("ingrese su n° de cuit sin guiones o su numero de DNI")
        if(cuitdni.length === 7 || cuitdni.length === 8){
            alert("El dato ingresado es un DNI, vamos a calcular su cuit");
        } 
        else if(cuitdni.length===11){
            alert("el dato que ingresaste puede que sea un cuit, veamos con que comienza");
            let inicioCuit = cuitdni.slice(0, 2);
            alert(inicioCuit);
            if([20, 23, 24, 27, 30].includes(parseInt(inicioCuit))){
                alert("Definitivamente es un numero de cuit, permitanos validar si es correcto");
                let finalCuit = cuitdni.slice(10,11);
                alert(`Su cuit inicia con ${inicioCuit} y finaliza con ${finalCuit}`);
                let dniDelCuit = cuitdni.slice(2, 10);
                alert(`Su DNI es ${dniDelCuit}`);
                alert(cuitdni)
            }
        }
        else{
            alert("El dato ingresado no parece coincidir ni con un cuit ni con un dni, intentemoslo de nuevo")
        }
        // this.cuit=cuit;
        // this.nombre=nombre;
    }
}
//DEFINICION DE FUNCIONES


//INICIO DE LA APP

alert("SISTEMA DE ALQUILER DE EQUIPAMIENTOS PARA FIESTAS!! \n Para iniciar registre un evento:");

// fiestaAlquiler = new fiesta()
// alert(`El evento ${fiestaAlquiler.nombre} fue creado con fecha ${fiestaAlquiler.fechaEve}.`);
// alert(`El alquiler para el evento ${fiestaAlquiler.nombre} inicia el ${fiestaAlquiler.fechaIni} y finaliza el ${fiestaAlquiler.fechaFin}.`);
// alert(`El alquiler es de ${fiestaAlquiler.diasAlquiler()} Dias`);

let cliente1= new cliente();