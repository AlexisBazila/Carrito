//IMPOTACIONES
const DateTime = luxon.DateTime;
const Interval = luxon.Interval;
// DEFINICION DE VARIABLES
let Rentals = new Array();
let equipmentsRent = new Array();
let countRent = 1;
let countPart = 1;
let countEquipmentRent=1;
let idEditRent = NaN;
const today = DateTime.now();
// Fechas
let dateStr = NaN;
let dateEnd = NaN;

// Lista de alquileres
if (localStorage.getItem("Rentals")){
    Rentals = JSON.parse(localStorage.getItem("Rentals"));
    countRent += Rentals.length;
}
// Lista de equipamientos en alquileres
if (localStorage.getItem("equipmentsRent")) {
  equipmentsRent = JSON.parse(localStorage.getItem("equipmentsRent"));
  countEquipmentRent += equipmentsRent.length;
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

// Elementos globales
let footModal = document.getElementById("footModalMsg");
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

class rentedEquipment{
  constructor(id, codEqui,amount){
    let i = Equipments.findIndex(equipo => equipo.idEqui === codEqui);

    this.id = id;
    this.codEqui = codEqui;
    this.nameEqui = Equipments[i].nameEqui;
    this.pRenEqui = Equipments[i].pRenEqui;
    this.sub= parseFloat(Equipments[i].pRenEqui) * amount;
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
// carga de Equipamientos en selector
let EquipmentLables = document.getElementById("EquipmentLables");
for (let i = 0; i < Equipments.length; i++) {
  let picEqui = Equipments[i].picEqui
  if(picEqui==undefined){
    picEqui = "../img/equipamiento/noimage.jpg"
  }
  EquipmentLables.innerHTML += `
    <div class="label">
    <div class="equipmentImage">
    <img src="${picEqui}" alt="" class="imgEquipment">
      <p>${Equipments[i].codEqui}</p>
    </div>
    <div class="EquipmentInformation">
      <div>
        <p>${Equipments[i].nameEqui}</p>
        <p>Precio: $${Equipments[i].pRenEqui}</p>
      </div>
      <div class="buttonEquipmentLable">
        <input type="number" id="cantEqui${i}">
        <label for="">/${Equipments[i].avaEqui}</label>
        <button onclick="addEquipment(${i})">+</button>
      </div>
    </div>
  </div>
  `
}
// FUNCIONALIDAD DE ELEMENTOS
// Seleccion del cliente
idCusSelect.onchange = function() {
  let customerToRent = idCusSelect.value
  let dataCus = document.getElementById("dataCus");
  if(customerToRent!=""){
    dataCus.innerHTML = `
    <p class="titleP"><b>Nombre:</b> ${Customers[customerToRent].nameCus} </p>
    <p class="titleP"><b>Cuit/DNI:</b> ${Customers[customerToRent].cuitdni}</p>
    <p class="titleP"><b>Telefono:</b> ${Customers[customerToRent].telefon}</p>
  `
  }else{
    dataCus.innerHTML = `
    <p class="titleP"><b>Nombre:</b></p>
    <p class="titleP"><b>Cuit/DNI:</b></p>
    <p class="titleP"><b>Telefono:</b></p>
  `
  }
};
// Determinacion de fechas
let dateStrRen = document.getElementById("dateStrRen")
let dateEndRen = document.getElementById("dateEndRen")
let infoDays = document.getElementById("infoDays");

dateStrRen.onchange = function(){
  dateStr = parseDate(dateStrRen.value);
  dateEnd = parseDate(dateEndRen.value);
  if(dateEndRen.value!=""){
    if(dateEnd > dateStr){
      infoDays.innerHTML=`
        <p><b>Cantidad de dias:</b> ${countDays(dateStr, dateEnd)}</p>
        <p><b>Fecha de devolucion:</b> ${calReturnDate(dateEnd)}</p>
      `
      footModal.innerHTML = "";
    }else{
      footModal.innerHTML = "!La fecha de finalizacion del alquiler debe ser superior a la fecha de inicio del alquiler";
    }
  }
}

dateEndRen.onchange = function(){
  dateStr = parseDate(dateStrRen.value);
  dateEnd = parseDate(dateEndRen.value);
  if(dateStrRen.value!=""){
    if(dateEnd > dateStr){
      infoDays.innerHTML=`
        <p><b>Cantidad de dias:</b> ${countDays(dateStr, dateEnd)}</p>
        <p><b>Fecha de devolucion:</b> ${calReturnDate(dateEnd)}</p>
      `
      footModal.innerHTML = "";
    }else{
      footModal.innerHTML = "!La fecha de finalizacion del alquiler debe ser superior a la fecha de inicio del alquiler";
    }
  }
}

// DEFINICION DE FUNCIONES
function parseDate(dateString) {
  let parts = dateString.split('-');
  let year = parseInt(parts[0]);
  let month = parseInt(parts[1]);
  let day = parseInt(parts[2]);
  return DateTime.local(year, month, day);
}

function countDays(start , end){
  const i = Interval.fromDateTimes(start, end);
  return Math.round(i.length("days"))
}

function calReturnDate(end){
  // Si el alquiler finaliza los dias Miercoles o Domingos como el comercio no atiende esos dias, la fecha de dovolucion pasa a ser el dia siguiente sin sumar dias de alquiler
  if(end.weekday == 3 || end.weekday == 7){
    end = end.plus({ day: 1})
    return end.toLocaleString(DateTime.DATE_SHORT)
  }else{
    return end.toLocaleString(DateTime.DATE_SHORT)
  }
}

function addEquipment(id){
  let cantEqui = document.getElementById(`cantEqui${id}`).value
  equipmentRent[0]= id;
  equipmentRent[1]= cantEqui;
  equipmentRent[2]= cantEqui * (Equipments[id].pRenEqui);
  alert(equipmentRent)

}
//BOTONES
// Alta


//CARGA
