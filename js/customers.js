///DEFINICION DE VARIABLES
let Customers = new Array();
if(localStorage.getItem("Customers")){
  Customers = JSON.parse(localStorage.getItem("Customers"));
}


//DEFINICION DE CLASES
class customer{
    constructor() {
      this.nameCus = document.getElementById("nameCus").value;
      this.cuitdni = document.getElementById("cuitdni").value;
      this.telefon = document.getElementById("telCus").value;
      document.getElementById("nameCus").value = "";
      document.getElementById("cuitdni").value = "";
      document.getElementById("telCus").value = "";
    }
  }

//DEFINICION DE FUNCIONES
  function listCustomers(){
    let tabCos = document.getElementById("tableCustomers");
    tabCos.innerHTML = ``
    tabCos.innerHTML += `
      <tr class="headRow">
        <th>Codigo</th>
        <th>CUIT/DNI</th>
        <th>Nombre</th>
        <th>Telefono</th>
        <th colspan="3">Acciones</th>
      </tr>
    `
    for (let i = 0; i < Customers.length; i++) {
      let rowClass = i % 2 === 0 ? "evenrow" : "oddrow";
      tabCos.innerHTML +=`
      <tr class="${rowClass}">
          <td>${i}</td>
          <td>${Customers[i].cuitdni}</td>
          <td>${Customers[i].nameCus}</td>
          <td>${Customers[i].telefon}</td>
          <th><button  class="delBtn actionBtn" id="delCos${i}" onclick="borrarCliente(${i})"><i class='bx bx-trash'></i></button></th>
          <th><button class="viewBtn actionBtn" id="viewCos${i}"><i class='bx bx-spreadsheet'></i></button></th>
          <th><button class="editBtn actionBtn" id="editCos${i}"><i class='bx bx-edit-alt'></i></button></th>
        </tr>
      `
      const jsonCost = JSON.stringify(Customers);
      localStorage.setItem("Customers", jsonCost);
    }
  }

  function  borrarCliente(id){
    if(confirm(`esta a punto de eliminar el cliente: \n ${id} -> ${Customers[id].cuitdni} - ${Customers[id].nombre} \n Realmente desea hacerlo?`)){
      Customers.splice(id, 1);
      listCustomers();
    }
  }


//BOTONES
  let addCus = document.getElementById("addCus");
  addCus.addEventListener("click", (e) => {
    e.preventDefault();
    Customers.push(new customer());
    listCustomers();
    modal.style.display = "none";
    }
  )
  
//VENTANA EMERGENTE DE ALTA
var openFormButton = document.getElementById("openFormButton");
var modal = document.getElementById("customerModal");
var closeModal = document.getElementById("closeModal");
openFormButton.onclick = function() {
  modal.style.display = "block";
}
closeModal.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


//CARGA
if(localStorage.getItem("Customers")){
  listCustomers();
}else{
  let tabCos = document.getElementById("tableCustomers");
    tabCos.innerHTML = ``
    tabCos.innerHTML += `
      <tr>
        <th>TABLA VACIA</th>
      </tr>
    `
}
  