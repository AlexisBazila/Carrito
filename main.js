class articulo{
    constructor(datosArticulo){
        this.id= datosArticulo.id;
        this.nombre= datosArticulo.nombre;
        this.precioAlquiler= datosArticulo.precioAlquiler;
        this.precioRepo= datosArticulo.precioRepo;
        this.stock= datosArticulo.stock;
        this.stockAlquiler= datosArticulo.stockAlquiler;
    }
}

const articulo1 = new articulo({
        id: 1,
        nombre: "Mesa",
        precioAlquiler: 500,
        precioRepo: 3000,
        stock: 10,
        stockAlquiler: 10,
});
const articulo2 = new articulo({
    id: 2,
    nombre: "silla",
    precioAlquiler: 600,
    precioRepo: 300,
    stock: 10,
    stockAlquiler: 10,
});

console.log(articulo1.nombre);


let producto
let totalProductos = 0   
let total= 0
let productos = 0 
let medio= ""


// Funcion que suma articulos al carrito
function add(codigo){
    producto= codigo;
    switch (codigo){
        case "P1":
            totalProductos= totalProductos + 3000;
            productos++
            break;
        case "P2":
            totalProductos= totalProductos + 5000;
            productos++
            break;
        case "P3":
            alert("El producto P3 no pose stock actualmente, elija otro producto");
            break;
        case "P4":
            totalProductos= totalProductos + 15000;
            productos++
            break;
        case "P5":
            totalProductos= totalProductos + 10000;
            productos++
            break;
        default:
            alert(`el producto ${codigo} no se encuentra registrado`);
            break;
    }
}

// Funcion que aplica descuentos en caso que corresponda y totaliza
function Totalizar(total, medioPago){
    let diaActual= new Date()
    if (medioPago=="e"){
        total = (total - (total * 0.10));
        alert (`Pagando en efectivo tiene un descuento del 10%, su total a pagar es de: $${total}`)
    }
    else{
        if (diaActual.getDay()== 3 || diaActual.getDay()== 4 || diaActual.getDay()== 5){
            total = (total - (total * 0.30));
            alert (`Pagando con tarjeta los Martes, Miercoles y Jueves tienes un descuento del 30%, su total a pagar es de: $${total}`)
        }
        else{
            alert (`No se han aplicado descuentos, su total a pagar es de: $${total}`)
        }
    }
}

do{
    do{
        add(prompt("Ingrese el código del producto que desea añadir al carrito"));
     } while(confirm("el producto fue añadido al carrito, Desea añadir otro producto?"))

     if(productos>1){
        alert(`Su carrito pose un total de ${productos} productos y suma: $${totalProductos}`);
    }
    else{
        alert(`Su carrito pose un total de ${productos} producto y suma: $${totalProductos}`)
    }
} while(confirm("Desea seguir agregando productos en su carrito?"))

do{
    medio = prompt("Ingrese el medio de pago: e=efectivo - t=tarjeta");
    medio= medio.toLowerCase()
} while (medio != "e" && medio != "t" )

Totalizar(totalProductos, medio);


