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
let total = 0;
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
// if (localStorage.getItem("equipmentsRent")) {
//   equipmentsRent = JSON.parse(localStorage.getItem("equipmentsRent"));
//   countEquipmentRent += equipmentsRent.length;
// }
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
    constructor(rentedEquipment){
        let dateStrRen = document.getElementById("dateStrRen")
        let dateEndRen = document.getElementById("dateEndRen")
        dateStr = parseDate(dateStrRen.value);
        dateEnd = parseDate(dateEndRen.value);

        this.idRent = countRent
        this.nameRent = document.getElementById("nameRent").value;
        this.dateEve = document.getElementById("dateEve").value;
        this.dateStrRen = document.getElementById("dateStrRen").value;
        this.dateEndRen = document.getElementById("dateEndRen").value;
        this.amountDays = countDays(dateStr, dateEnd);
        this.dateReturn = calReturnDate(dateEnd)
        this.rentedEquipment = rentedEquipment;
        this.total = total
        
        document.getElementById("nameRent").value = "";
        document.getElementById("dateEve").value = "";
        document.getElementById("dateStrRen").value = "";
        document.getElementById("dateEndRen").value = "";
        document.getElementById("total").innerText=`TOTAL:$0`
        total=0
        let tabEqui = document.getElementById("tableEquipment");
        tabEqui.innerHTML = ``
        tabEqui.innerHTML += `
          <tr class="rentalHeadRow">
            <th>Codigo</th>
            <th>Articulo</th>
            <th>cantidad</th>
            <th>Precio Alquiler</th>
            <th>Subtotal</th>
            <th>Remover</th>
          </tr>
          `
          let dataCus = document.getElementById("dataCus");
            dataCus.innerHTML = `
            <p class="titleP"><b>Nombre:</b></p>
            <p class="titleP"><b>Cuit/DNI:</b></p>
            <p class="titleP"><b>Telefono:</b></p>
          `
    }
}

class rentedEquipment{
  constructor(codEqui,amount){
    this.idEqui = codEqui
    this.codEqui = Equipments[codEqui].codEqui;
    this.nameEqui = Equipments[codEqui].nameEqui;
    this.amount = amount;
    this.pRenEqui = Equipments[codEqui].pRenEqui;
    this.sub= parseFloat(Equipments[codEqui].pRenEqui) * amount;
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
        <input type="number" min="0" max="${Equipments[i].avaEqui}" id="cantEqui${i}">
        <label id="labelCantEqui${i}">/${Equipments[i].avaEqui}</label>
        <button type="button" onclick="addEquipment(${i})">+</button>
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
// Configuracion de fechas
function parseDate(dateString) {
  let parts = dateString.split('-');
  let year = parseInt(parts[0]);
  let month = parseInt(parts[1]);
  let day = parseInt(parts[2]);
  return DateTime.local(year, month, day);
}
// Contar dias
function countDays(start , end){
  const i = Interval.fromDateTimes(start, end);
  return Math.round(i.length("days"))
}
// calculo de dia de devolucion
function calReturnDate(end){
  // Si el alquiler finaliza los dias Miercoles o Domingos como el comercio no atiende esos dias, la fecha de dovolucion pasa a ser el dia siguiente sin sumar dias de alquiler
  if(end.weekday == 3 || end.weekday == 7){
    end = end.plus({ day: 1})
    return end.toLocaleString(DateTime.DATE_SHORT)
  }else{
    return end.toLocaleString(DateTime.DATE_SHORT)
  }
}
// Carga de equipamiento alquilado
function addEquipment(id){
  let cantEqui = document.getElementById(`cantEqui${id}`);
  let avaEqui = document.getElementById(`labelCantEqui${id}`);
  footModal.innerHTML = "";
  let rest =0;
  let existingIndex = equipmentsRent.findIndex(item => item.idEqui === id);
  if(parseInt(cantEqui.value)>=1){
    if (existingIndex !== -1){
      let existAmount = parseInt(equipmentsRent[existingIndex].amount);
      existAmount += parseInt(cantEqui.value);
      rest = parseInt(Equipments[id].avaEqui) - existAmount
      if(rest>=0){
        avaEqui.innerText= `/${rest}`;
        cantEqui.max= rest;
        equipmentsRent[existingIndex].amount = existAmount;
        let existSub = parseFloat(equipmentsRent[existingIndex].pRenEqui) * existAmount;
        equipmentsRent[existingIndex].sub= existSub;
        cantEqui.value=""
      }else{
        footModal.innerHTML = "!La cantidad que desea alquilar excede el stock disponible";
      }
    }else{
      equipmentsRent.push(new rentedEquipment(id, cantEqui.value));
      rest = parseInt(Equipments[id].avaEqui) - parseInt(cantEqui.value) 
      avaEqui.innerText= `/${rest}`
      cantEqui.max= rest;
      cantEqui.value=""
    }
  }else{
    footModal.innerHTML = "!Debe definir la cantidad que desea alquilar";
  }
    listEquipments();
  }
// Listar equipamientos
function listEquipments(){
  let tabEqui = document.getElementById("tableEquipment");
    tabEqui.innerHTML = ``
    total = 0;
    document.getElementById("total").innerText=`TOTAL:$${total}`
    tabEqui.innerHTML += `
      <tr class="rentalHeadRow">
        <th>Codigo</th>
        <th>Articulo</th>
        <th>cantidad</th>
        <th>Precio Alquiler</th>
        <th>Subtotal</th>
        <th>Remover</th>
      </tr>
      `
    for (let i = 0; i < equipmentsRent.length; i++) {
      let rowClass = i % 2 === 0 ? "rentalEvenrow" : "rentalOddrow";
      tabEqui.innerHTML += `
        <tr class="${rowClass}">
            <td>${equipmentsRent[i].codEqui}</td>
            <td>${equipmentsRent[i].nameEqui}</td>
            <td>${equipmentsRent[i].amount}</td>
            <td>$${equipmentsRent[i].pRenEqui}</td>
            <td>${equipmentsRent[i].sub}</td>
            <th><button title="Eliminar"   class="delBtn actionBtn" id="delEqui${i}" onclick="dellEquipment(${equipmentsRent[i].idEqui})"><i class='bx bx-trash'></i></button></th>
          </tr>
        `
        total += parseFloat(equipmentsRent[i].sub)
        document.getElementById("total").innerText=`TOTAL:$${total}`
    }
}
//Alta
function addRents(){
  Rentals.push(new rental(equipmentsRent));
  listRentals();
  countRent += 1
  modal.style.display = "none";
  alert(Rentals.length);
}
// Listar
function listRentals() {
  let tabRent = document.getElementById("tableRentals");
  tabRent.innerHTML = ``
  tabRent.innerHTML += `
      <tr class="headRow">
        <th>ID</th>
        <th>Evento</th>
        <th>Desde</th>
        <th>Hasta</th>
        <th>Devolucion</th>
        <th>Cant. dias</th>
        <th>Total</th>
        <th colspan="3">Acciones</th>
      </tr>
    `
  for (let i = 0; i < Rentals.length; i++) {
    let rowClass = i % 2 === 0 ? "evenrow" : "oddrow";
    tabRent.innerHTML += `
      <tr class="${rowClass}">
          <td>${Rentals[i].idRent}</td>
          <td>${Rentals[i].nameRent}</td>
          <td>${Rentals[i].dateStrRen}</td>
          <td>${Rentals[i].dateEndRen}</td>
          <td>${Rentals[i].dateReturn}</td>
          <td>${Rentals[i].amountDays}</td>
          <td>$${Rentals[i].total}</td>
          <th><button title="Eliminar"   class="delBtn actionBtn" id="delEqui${i}" onclick="dellEquipment(${Rentals[i].idEqui})"><i class='bx bx-trash'></i></button></th>
          <th><button title="Visualizar" class="viewBtn actionBtn" id="viewEqui${i}"><i class='bx bx-spreadsheet' onclick="viewEquipment(${Rentals[i].idEqui})"></i></button></th>
          <th><button title="Editar"     class="editBtn actionBtn" id="editEqui${i}" onclick="openEditEquipment(${Rentals[i].idEqui})"><i class='bx bx-edit-alt'></i></button></th>
        </tr>
      `
    const jsonCost = JSON.stringify(Rentals);
    localStorage.setItem("Rentals", jsonCost);
  }
}
//BOTONES
// Alta
let addRent = document.getElementById("addRent");
addRent.addEventListener("click", (e) => {
  e.preventDefault();
  addRents();
}
)


//CARGA
if (localStorage.getItem("Rentals")) {
  listRentals();
} else {
  let tabRent = document.getElementById("tableRentals");
  tabRent.innerHTML = ``
  tabRent.innerHTML += `
      <tr>
        <th>NO EXISTEN ALQUILERES PARA MOSTRAR, CARGE UN NUEVO ALQUILER DESDE EL BOTON "+ Registrar Alquiler"</th>
      </tr>
    `
}