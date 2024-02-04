// DEFINICION DE VARIABLES
let Rentals = new Array();
let countRent = 1;
let countPart = 1;
let idEditRent = NaN;
// Lista de alquileres
if (localStorage.getItem("Rentals")){
    Rentals = JSON.parse(localStorage.getItem("Rentals"));
    countRent += Rentals.length;
}
// Lista de equipamientos
let Equipments = new Array();
if (localStorage.getItem("Equipments")) {
    Equipments = JSON.parse(localStorage.getItem("Equipments"));
}
// Lista de clientes
let Customers = new Array();
if (localStorage.getItem("Customers")) {
  Customers = JSON.parse(localStorage.getItem("Customers"));
}
//DEFINICION DE CLASES
class rental{
    constructor(){
        this.idRent = countRent
        this.nameRent = document.getElementById("nameRent").value;
        this.dateEve = document.getElementById("dateEve").value;
        this.dateStrRen = document.getElementById("dateStrRen").value;
        this.dateEndRen = document.getElementById("dateEndRen").value;
        
        document.getElementById("nameRent").value = "";
        document.getElementById("dateEve").value = "";
        document.getElementById("dateStrRen").value = "";
        document.getElementById("dateEndRen").value = "";
    }
}

//VENTANAS MODALES
// Alta
let openFormButton = document.getElementById("openFormButton");
let modal = document.getElementById("RentalModal");
let closeModal = document.getElementById("closeModal");
openFormButton.onclick = function () {
  modal.style.display = "block";
}
closeModal.onclick = function () {
  modal.style.display = "none";
}
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// carga de clientes en select
let idCusSelect = document.getElementById("idCusSelect");
for (let i = 0; i < Customers.length; i++) {
    idCusSelect.innerHTML += `<option value="${i}">${Customers[i].cuitdni}-${Customers[i].nameCus}</option> `
}
// DEFINICION DE FUNCIONES

//BOTONES
// Alta


//CARGA