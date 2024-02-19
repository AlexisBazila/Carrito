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
let amountD = 0;
const today = DateTime.now();
// Fechas
let dateStr = NaN;
let dateEnd = NaN;

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

// ELEMENTOS GLOBALES
// Mensajes de error
let footModal = document.getElementById("footModalMsg");
// Input de busqueda de equipamientos en alquiler
let findEquipmentInput = document.getElementById("findEquipmentInput");


//DEFINICION DE CLASES
class rental{
    constructor(rentedEquipment){
        let dateStrRen = document.getElementById("dateStrRen")
        let dateEndRen = document.getElementById("dateEndRen")
        let tabEqui = document.getElementById("tableEquipment");
        let infoDays = document.getElementById("infoDays");
        let dataCus = document.getElementById("dataCus");
        dateStr = parseDate(dateStrRen.value);
        dateEnd = parseDate(dateEndRen.value);

        this.idRent = countRent
        this.idCus = document.getElementById("idCusSelect").value
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
        equipmentsRent = [];
        total=0;
        tabEqui.innerHTML = ``;
        tabEqui.innerHTML += `
            <tr class="rentalHeadRow">
              <th>Codigo</th>
              <th>Articulo</th>
              <th>cantidad</th>
              <th>Precio Alquiler</th>
              <th>Subtotal</th>
              <th>Remover</th>
            </tr>
          `;
        document.getElementById("idCusSelect").value="";
        dataCus.innerHTML = `
            <p class="titleP"><b>Nombre:</b></p>
            <p class="titleP"><b>Cuit/DNI:</b></p>
            <p class="titleP"><b>Telefono:</b></p>
          `;
        infoDays.innerHTML=`
            <p><b>Cantidad de dias:</b></p>
            <p><b>Fecha de devolucion:</b></p>
          `;
    }
}
class rentedEquipment{
  constructor(codEqui,amount){
    this.idEqui = Equipments[codEqui].idEqui;
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
let cusFindRent= document.getElementById("cusFindRent");
for (let i = 0; i < Customers.length; i++) {
    idCusSelect.innerHTML += `<option value="${i}">${Customers[i].cuitdni}-${Customers[i].nameCus}</option> `
    cusFindRent.innerHTML += `<option value="${i}">${Customers[i].cuitdni}-${Customers[i].nameCus}</option> `
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
let EquipmentLables = document.getElementById("EquipmentLables");
dateStrRen.onchange = function(){
  dateStr = parseDate(dateStrRen.value);
  dateEnd = parseDate(dateEndRen.value);
  amountD=countDays(dateStr, dateEnd);
  if(dateEndRen.value!=""){
    if(dateEnd > dateStr){
      infoDays.innerHTML=`
        <p><b>Cantidad de dias:</b> ${countDays(dateStr, dateEnd)}</p>
        <p><b>Fecha de devolucion:</b> ${calReturnDate(dateEnd)}</p>
      `
      findEquipmentInput.disabled = false;
      chargeEquipment(dateStr, dateEnd, Equipments);
      footModal.innerHTML = "";
    }else{
      EquipmentLables.innerHTML=``
      footModal.innerHTML = "!La fecha de finalizacion del alquiler debe ser superior a la fecha de inicio del alquiler";
      findEquipmentInput.disabled = true;
    }
  }
}
dateEndRen.onchange = function(){
  dateStr = parseDate(dateStrRen.value);
  dateEnd = parseDate(dateEndRen.value);
  amountD=countDays(dateStr, dateEnd);
  if(dateStrRen.value!=""){
    if(dateEnd > dateStr){
      infoDays.innerHTML=`
        <p><b>Cantidad de dias:</b> ${countDays(dateStr, dateEnd)}</p>
        <p><b>Fecha de devolucion:</b> ${calReturnDate(dateEnd)}</p>
      `
      chargeEquipment(dateStr, dateEnd, Equipments);
      findEquipmentInput.disabled = false;
      footModal.innerHTML = "";
    }else{
      EquipmentLables.innerHTML=``
      footModal.innerHTML = "!La fecha de finalizacion del alquiler debe ser superior a la fecha de inicio del alquiler";
      findEquipmentInput.disabled = true;
    }
  }
}

// Busqueda de equipamientos
findEquipmentInput.addEventListener('input', function() {
  let FindEqui = findEquipmentInput.value;
  let filteredEquipments = Equipments.filter(equipment => {
    return (
      equipment.nameEqui.toLowerCase().includes(FindEqui.toLowerCase()) ||
      equipment.codEqui.includes(FindEqui.toLowerCase())
    );
  });
  dateStr = parseDate(dateStrRen.value);
  dateEnd = parseDate(dateEndRen.value);
  chargeEquipment(dateStr, dateEnd, filteredEquipments);
});

// DEFINICION DE FUNCIONES
//Carga de equipamientos en selector
// function chargeEquipment(since, until){
// let EquipmentLables = document.getElementById("EquipmentLables");
// EquipmentLables.innerHTML=``
// for (let i = 0; i < Equipments.length; i++) {
//   let picEqui = Equipments[i].picEqui
//   if(picEqui==undefined){
//     picEqui = "../img/equipamiento/noimage.jpg"
//   }
//   let rentalsFiltered = filterRentalsForDate(since, until); 
//   let rest = Equipments[i].avaEqui;
//   for (let x = 0; x < rentalsFiltered.length; x++){
//     for (let y = 0; y < rentalsFiltered[x].rentedEquipment.length; y++){
//       if(rentalsFiltered[x].rentedEquipment[y].idEqui == Equipments[i].idEqui){
//         rest -=  rentalsFiltered[x].rentedEquipment[y].amount;
//       }
//     }
//   }
//   EquipmentLables.innerHTML += `
//     <div class="label">
//     <div class="equipmentImage">
//     <img src="${picEqui}" alt="" class="imgEquipment">
//       <p>${Equipments[i].codEqui}</p>
//     </div>
//     <div class="EquipmentInformation">
//       <div>
//         <p>${Equipments[i].idEqui}-${Equipments[i].nameEqui}</p>
//         <p>Precio: $${Equipments[i].pRenEqui}</p>
//         <p>Stock: ${Equipments[i].avaEqui}</p>
//       </div>
//       <div class="buttonEquipmentLable">
//         <input type="number" min="0" max="${rest}" id="cantEqui${i}">
//         <label id="labelCantEqui${i}">/${rest}</label>
//         <button type="button" onclick="addEquipment(${i})">+</button>
//       </div>
//     </div>
//   </div>
//   `
// }
// }

function chargeEquipment(since, until, table){
  let EquipmentLables = document.getElementById("EquipmentLables");
  EquipmentLables.innerHTML=``
  for (let i = 0; i < table.length; i++) {
    let picEqui = table[i].picEqui
    if(picEqui==undefined){
      picEqui = "../img/equipamiento/noimage.jpg"
    }

    let rentalsFiltered = filterRentalsForDate(since, until); 
    let rest = table[i].avaEqui;
    for (let x = 0; x < rentalsFiltered.length; x++){
      for (let y = 0; y < rentalsFiltered[x].rentedEquipment.length; y++){
        if(rentalsFiltered[x].rentedEquipment[y].idEqui == table[i].idEqui){
          rest -=  rentalsFiltered[x].rentedEquipment[y].amount;
        }
      }
    }

    if(equipmentsRent.length>0){
      alert("Reconteo de elementos cuando hay algo prealquilado")
    }else{
      alert("no")
    }
    
    EquipmentLables.innerHTML += `
      <div class="label">
      <div class="equipmentImage">
      <img src="${picEqui}" alt="" class="imgEquipment">
        <p>${table[i].codEqui}</p>
      </div>
      <div class="EquipmentInformation">
        <div>
          <p>${table[i].idEqui}-${table[i].nameEqui}</p>
          <p>Precio: $${table[i].pRenEqui}</p>
          <p>Stock: ${table[i].avaEqui}</p>
        </div>
        <div class="buttonEquipmentLable">
          <input type="number" min="0" max="${rest}" id="cantEqui${i}">
          <label id="labelCantEqui${i}">/${rest}</label>
          <button type="button" onclick="addEquipment(${i})">+</button>
        </div>
      </div>
    </div>
    `
  }
  }

// Configuracion de fechas
function parseDate(dateString) {
  let parts = dateString.split('-');
  let year = parseInt(parts[0]);
  let month = parseInt(parts[1]);
  let day = parseInt(parts[2]);
  return DateTime.local(year, month, day);
}
//Formateo de fehcas
function formatDate(inputDate, outputFormat) {
  alert(inputDate)
  const parsedDate = DateTime.fromFormat(inputDate, [
    'yyyy-MM-dd', 'dd/MM/yyyy', 'YYYY-MM-DDTHH:MM:SS.SSSZZZZZ', 'd/M/yyyy', 'dd/MM/yyyy HH:mm:ss'
  ]);

  if (parsedDate.isValid) {
      return parsedDate.toFormat(outputFormat);
  } else {
      return null;
  }
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
    return end.toISODate()
  }else{
    return end.toISODate()
  }
}
// Carga de equipamiento alquilado
function addEquipment(id){
  let cantEqui = document.getElementById(`cantEqui${id}`);
  let avaEqui = document.getElementById(`labelCantEqui${id}`);
  let ok = false;
  let since = document.getElementById("dateStrRen").value
  let until = document.getElementById("dateEndRen").value
  let rentalsFiltered = filterRentalsForDate(since, until);
  footModal.innerHTML = "";
  let rest =0;
  let existingIndex = equipmentsRent.findIndex(item => item.idEqui === Equipments[id].idEqui);
  if(parseInt(cantEqui.value)>=1){
    if (existingIndex !== -1){
      let existAmount = parseInt(equipmentsRent[existingIndex].amount);
      existAmount += parseInt(cantEqui.value);
      rest = parseInt(Equipments[id].avaEqui) - existAmount
      for (let x = 0; x < rentalsFiltered.length; x++){
        for (let y = 0; y < rentalsFiltered[x].rentedEquipment.length; y++){
          if(rentalsFiltered[x].rentedEquipment[y].idEqui == Equipments[id].idEqui){
            rest -=  rentalsFiltered[x].rentedEquipment[y].amount;
          }
        }
      }
      if(rest>=0){
        ok= true
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
      for (let x = 0; x < rentalsFiltered.length; x++){
        for (let y = 0; y < rentalsFiltered[x].rentedEquipment.length; y++){
          if(rentalsFiltered[x].rentedEquipment[y].idEqui == Equipments[id].idEqui){
            rest -=  rentalsFiltered[x].rentedEquipment[y].amount;
          }
        }
      }
      if(rest>=0){
        ok=true
        avaEqui.innerText= `/${rest}`
        cantEqui.max= rest;
        cantEqui.value=""
      }else{
        footModal.innerHTML = "!La cantidad que desea alquilar excede el stock disponible";
      }
    }
  }else{
    footModal.innerHTML = "!Debe definir la cantidad que desea alquilar";
  }
    if(ok){
      listEquipments();
      dateStrRen.disabled = true
      dateEndRen.disabled = true
    }
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
            <th><button type="buton" title="Eliminar"   class="delBtn actionBtn" id="delEqui${i}" onclick="dellEquipment(${equipmentsRent[i].idEqui})"><i class='bx bx-trash'></i></button></th>
          </tr>
        `
        total += (parseFloat(equipmentsRent[i].sub))*amountD
        document.getElementById("total").innerText=`TOTAL:$${total}`
    }
}
// Eliminar equipamiento alquilado
function dellEquipment(id){
  let i = equipmentsRent.findIndex(equipo => equipo.idEqui === id);
  let y = Equipments.findIndex(equipo => equipo.idEqui === id);
  let avaEqui = document.getElementById(`labelCantEqui${y}`);
  let cantEqui = document.getElementById(`cantEqui${y}`);
  let rest =  parseInt(avaEqui.textContent.trim().slice(1));
  let existAmount = parseInt(equipmentsRent[i].amount);
  existAmount += parseInt(rest);
  avaEqui.innerText= `/${existAmount}`
  cantEqui.max= existAmount;
  equipmentsRent.splice(i, 1);
  listEquipments();
  if(equipmentsRent.length==0){
    dateStrRen.disabled = false
    dateEndRen.disabled = false
  }
}
//Alta
function addRents(){
  if(document.getElementById("idCusSelect").value!=""){
    if(document.getElementById("dateStrRen").value !=""){
      if(document.getElementById("dateEndRen").value != ""){
        if(equipmentsRent.length > 0){
          Rentals.push(new rental(equipmentsRent));
          listRentals();
          countRent += 1
          modal.style.display = "none";
        }else{
          footModal.innerHTML = "!Debe agregar al menos un equipo a alquilar";
        }
      }else{
        footModal.innerHTML = "!Debe informar una fecha de finalización del alquiler";
      }
    }else{
      footModal.innerHTML = "!Debe informar una fecha de inicio del alquiler";
    }
  }else{
    footModal.innerHTML = "!Debe seleccionar un cliente para el alquiler";
  }
}
// Listar
function listRentals() {
  let tabRent = document.getElementById("tableRentals");
  tabRent.innerHTML = ``
  tabRent.innerHTML += `
      <tr class="headRow">
        <th>ID</th>
        <th>Evento</th>
        <th colspan="2">Cliente</th>
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
          <td>${Customers[Rentals[i].idCus].idCus}</td>
          <td>${Customers[Rentals[i].idCus].nameCus}</td>
          <td>${Rentals[i].dateStrRen}</td>
          <td>${Rentals[i].dateEndRen}</td>
          <td>${Rentals[i].dateReturn}</td>
          <td>${Rentals[i].amountDays}</td>
          <td>$${Rentals[i].total}</td>
          <th><button title="Eliminar"   class="delBtn actionBtn" id="delEqui${i}" onclick="dellRentals(${Rentals[i].idRent})"><i class='bx bx-trash'></i></button></th>
          <th><button title="Visualizar" class="viewBtn actionBtn" id="viewEqui${i}"><i class='bx bx-spreadsheet' onclick="viewEquipment(${Rentals[i].idEqui})"></i></button></th>
          <th><button title="Editar"     class="editBtn actionBtn" id="editEqui${i}" onclick="openEditEquipment(${Rentals[i].idEqui})"><i class='bx bx-edit-alt'></i></button></th>
        </tr>
      `
    const jsonCost = JSON.stringify(Rentals);
    localStorage.setItem("Rentals", jsonCost);
  }
}
// Filtrar alquileres entre 2 fechas
function filterRentalsForDate(since, until) {
  let formatSince = DateTime.fromISO(since);
  let formatUntil = DateTime.fromISO(until);
  let filterRentals = Rentals.filter(rental => {
    let rentalDateStrRen = DateTime.fromISO(rental.dateStrRen);
    let rentalDateReturn = DateTime.fromISO(rental.dateReturn);
    return rentalDateStrRen >= formatSince && rentalDateStrRen <= formatUntil ||
           rentalDateReturn >= formatSince && rentalDateReturn <= formatUntil;
  });
  return filterRentals;
}
// Listar alquileres filtrados
function listFilterRentals(filterRentals) {
  let tabRent = document.getElementById("tableRentals");
  tabRent.innerHTML = ``
  tabRent.innerHTML += `
      <tr class="headRow">
        <th>ID</th>
        <th>Evento</th>
        <th colspan="2">Cliente</th>
        <th>Desde</th>
        <th>Hasta</th>
        <th>Devolucion</th>
        <th>Cant. dias</th>
        <th>Total</th>
        <th colspan="3">Acciones</th>
      </tr>
    `
  for (let i = 0; i < filterRentals.length; i++) {
    let rowClass = i % 2 === 0 ? "evenrow" : "oddrow";
    tabRent.innerHTML += `
      <tr class="${rowClass}">
          <td>${filterRentals[i].idRent}</td>
          <td>${filterRentals[i].nameRent}</td>
          <td>${Customers[filterRentals[i].idCus].idCus}</td>
          <td>${Customers[filterRentals[i].idCus].nameCus}</td>
          <td>${filterRentals[i].dateStrRen}</td>
          <td>${filterRentals[i].dateEndRen}</td>
          <td>${filterRentals[i].dateReturn}</td>
          <td>${filterRentals[i].amountDays}</td>
          <td>$${filterRentals[i].total}</td>
          <th><button title="Eliminar"   class="delBtn actionBtn" id="delEqui${filterRentals[i].idRent}" onclick="dellRentals(${filterRentals[i].idRent})"><i class='bx bx-trash'></i></button></th>
          <th><button title="Visualizar" class="viewBtn actionBtn" id="viewEqui${filterRentals[i].idRent}"><i class='bx bx-spreadsheet' onclick="viewEquipment(${filterRentals[i].idRent})"></i></button></th>
          <th><button title="Editar"     class="editBtn actionBtn" id="editEqui${filterRentals[i].idRent}" onclick="openEditEquipment(${filterRentals[i].idRent})"><i class='bx bx-edit-alt'></i></button></th>
        </tr>
      `
  }
}
// Eliminar
function dellRentals(id) {
  let i = Rentals.findIndex(rental => rental.idRent === id);
  Swal.fire({
    title: `Alquiler: ${id} \n Evento: ${Rentals[i].nameRent} \n Cliente: ${Customers[Rentals[i].idCus].nameCus} \n Desde: ${Rentals[i].dateStrRen} \n Hasta: ${Rentals[i].dateEndRen}`,
    text: `esta a punto de eliminar el Alquiler actual  ¿Realmente desea hacerlo?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, Eliminarlo!"
  }).then((result) => {
    if (result.isConfirmed) {
          Rentals.splice(i, 1);
          listRentals();
      Swal.fire({
        title: "Eliminado!",
        text: "El Alquiler ha sido eliminado.",
        icon: "success"
      });
    }
  });
}

//BOTONES
// Alta
let addRent = document.getElementById("addRent");
addRent.addEventListener("click", (e) => {
  e.preventDefault();
  addRents();
}
)
// Busqueda
let filter30 = document.getElementById("filter30");
filter30.addEventListener("click", (e) => {
  e.preventDefault();
  let since = DateTime.local();
  let until = since.plus({ days: 30 });
  since = since.toISODate(DateTime.local())
  until = until.toISODate()
  listFilterRentals(filterRentalsForDate(since, until));
})
let filter7 = document.getElementById("filter7");
filter7.addEventListener("click", (e) => {
  e.preventDefault();
  let since = DateTime.local();
  let until = since.plus({ days: 7 });
  since = since.toISODate(DateTime.local())
  until = until.toISODate()
  listFilterRentals(filterRentalsForDate(since, until));
})
let filterMonth = document.getElementById("filterMonth");
filterMonth.addEventListener("click", (e) => {
  e.preventDefault();
  let since = today.startOf('month').toISODate();
  let until = today.endOf('month').toISODate();
  listFilterRentals(filterRentalsForDate(since, until));
})
let filterWeek = document.getElementById("filterWeek");
filterWeek.addEventListener("click", (e) => {
  e.preventDefault();
  let since = today.startOf('week').toISODate();
  let until = today.endOf('week').toISODate();
  listFilterRentals(filterRentalsForDate(since, until));
})
// Busqueda
let findButton = document.getElementById("findButton");
findButton.addEventListener("click", (e) => {
  e.preventDefault();
  let eventFindRent = document.getElementById("eventFindRent").value;
  let cusFindRent = document.getElementById("cusFindRent").value;
  let filteredRentals = [];
  if(eventFindRent != ""){
    filteredRentals = Rentals.filter(rental => {
      return (
        rental.nameRent.toLowerCase().includes(eventFindRent.toLowerCase())
      );
    });
  }
  if(cusFindRent != ""){
    filteredRentals = Rentals.filter(rental => {
      return (
        rental.idCus === cusFindRent
      );
    });
  }
  if (eventFindRent != "" && cusFindRent != "") {
    filteredRentals = Rentals.filter(rental => {
      return (
        rental.nameRent.toLowerCase().includes(eventFindRent.toLowerCase()) &&
        rental.idCus === cusFindRent
      );
    });
  }
  listFilterRentals(filteredRentals); 
});
let unFindRent = document.getElementById("unFindButton");
unFindRent.addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("eventFindRent").value="";
  document.getElementById("cusFindRent").value="";
  listRentals();
})

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