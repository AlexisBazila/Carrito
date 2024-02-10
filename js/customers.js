///DEFINICION DE VARIABLES
let Customers = new Array();
let countCus = 1;
let idEditCustomer = NaN;
// if (localStorage.getItem("Customers")) {
//   Customers = JSON.parse(localStorage.getItem("Customers"));
//   countCus += Customers.length
// }
Customers = localStorage.getItem("Customers") ? JSON.parse(localStorage.getItem("Customers")) : [];
countCus += Customers.length;


//DEFINICION DE CLASES
class customer {
  constructor() {
    this.idCus = countCus;
    this.nameCus = document.getElementById("nameCus").value;
    this.cuitdni = document.getElementById("cuitdni").value;
    this.telefon = document.getElementById("telCus").value;
    document.getElementById("nameCus").value = "";
    document.getElementById("cuitdni").value = "";
    document.getElementById("telCus").value = "";
  }
}

//VENTANAS MODALES
// Alta
let openFormButton = document.getElementById("openFormButton");
let modal = document.getElementById("customerModal");
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

// Modificacion
let editModal = document.getElementById("customerEditModal");
let closeEditModal = document.getElementById("closeEditModal");
closeEditModal.onclick = function () {
  editModal.style.display = "none";
}
window.onclick = function (event) {
  if (event.target == modal) {
    editModal.style.display = "none";
  }
}

// Vista
let viewModal = document.getElementById("customerViewModal");
let closeViewModal = document.getElementById("closeViewModal");
closeViewModal.onclick = function () {
  viewModal.style.display = "none";
}
window.onclick = function (event) {
  if (event.target == modal) {
    viewModal.style.display = "none";
  }
}


//DEFINICION DE FUNCIONES
// Listar
function listCustomers() {
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
    tabCos.innerHTML += `
      <tr class="${rowClass}">
          <td>${Customers[i].idCus}</td>
          <td>${Customers[i].cuitdni}</td>
          <td>${Customers[i].nameCus}</td>
          <td>${Customers[i].telefon}</td>
          <th><button title="Eliminar"   class="delBtn actionBtn" id="delCos${Customers[i].idCus}" onclick="dellCustomer(${Customers[i].idCus})"><i class='bx bx-trash'></i></button></th>
          <th><button title="Visualizar" class="viewBtn actionBtn" id="viewCos${Customers[i].idCus}"><i class='bx bx-spreadsheet' onclick="viewCustomer(${Customers[i].idCus})"></i></button></th>
          <th><button title="Editar"     class="editBtn actionBtn" id="editCos${Customers[i].idCus}" onclick="openEditCustomer(${Customers[i].idCus})"><i class='bx bx-edit-alt'></i></button></th>
        </tr>
      `
    const jsonCost = JSON.stringify(Customers);
    localStorage.setItem("Customers", jsonCost);
  }
}
// Eliminar
function dellCustomer(id) {
  let i = Customers.findIndex(customer => customer.idCus === id);
  Swal.fire({
    title: `${id} -> ${Customers[i].cuitdni} - ${Customers[i].nameCus}`,
    text: `esta a punto de eliminar el Cliente  ¿Realmente desea hacerlo`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, Eliminarlo!"
  }).then((result) => {
    if (result.isConfirmed) {
        Customers.splice(i, 1);
        listCustomers();
      Swal.fire({
        title: "Eliminado!",
        text: "El Cliente ha sido eliminado.",
        icon: "success"
      });
    }
  });
}
// Alta
function addCustomer() {
  let footModal = document.getElementById("footModalMsg");
  if (document.getElementById("nameCus").value != "") {
    let cuitdni = document.getElementById("cuitdni").value;
    if (cuitdni.length === 7 || cuitdni.length === 8) {
      Customers.push(new customer());
      listCustomers();
      countCus += Customers.length
      modal.style.display = "none";
    } else {
      if (cuitdni.length === 11) {
        let inicioCuit = cuitdni.slice(0, 2);
        if ([20, 23, 27, 30].includes(parseInt(inicioCuit))) {
          Customers.push(new customer());
          countCus += Customers.length
          listCustomers();
          modal.style.display = "none";
        } else {
          footModal.innerHTML = `!El Cuit o DNI no tiene el formato correcto.`
        }
      } else {
        footModal.innerHTML = `!El Cuit o DNI no tiene el formato correcto.`
      }
    }
  } else {
    footModal.innerHTML = `!Debe completar el campo usuario.`
  }
}
// Buscar
function findCustomer() {
  let findNameCus = document.getElementById("nameFindCus").value
  let findDniCuit = document.getElementById("cuitdnifind").value

  if (findDniCuit !== "" && findNameCus !== "") {
    let filteredCustomers = Customers.filter(customer => {
      return (
        customer.nameCus.toLowerCase().includes(findNameCus.toLowerCase()) &&
        customer.cuitdni.includes(findDniCuit)
      );
    });
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
    for (let i = 0; i < filteredCustomers.length; i++) {
      let rowClass = i % 2 === 0 ? "evenrow" : "oddrow";
      tabCos.innerHTML += `
      <tr class="${rowClass}">
          <td>${filteredCustomers[i].idCus}</td>
          <td>${filteredCustomers[i].cuitdni}</td>
          <td>${filteredCustomers[i].nameCus}</td>
          <td>${filteredCustomers[i].telefon}</td>
          <th><button title="Eliminar"   class="delBtn actionBtn" id="delCos${filteredCustomers[i].idCus}" onclick="dellCustomer(${filteredCustomers[i].idCus})"><i class='bx bx-trash'></i></button></th>
          <th><button title="Visualizar" class="viewBtn actionBtn" id="viewCos${filteredCustomers[i].idCus}"><i class='bx bx-spreadsheet' onclick="viewCustomer(${filteredCustomers[i].idCus})"></i></button></th>
          <th><button title="Editar"     class="editBtn actionBtn" id="editCos${filteredCustomers[i].idCus}" onclick="openEditCustomer(${filteredCustomers[i].idCus})"><i class='bx bx-edit-alt'></i></button></th>
        </tr>
      `
    }
  } else if (findNameCus !== "") {
    let filteredCustomers = Customers.filter(customer => {
      return customer.nameCus.toLowerCase().includes(findNameCus.toLowerCase());
    });

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
    for (let i = 0; i < filteredCustomers.length; i++) {
      let rowClass = i % 2 === 0 ? "evenrow" : "oddrow";
      tabCos.innerHTML += `
        <tr class="${rowClass}">
            <td>${filteredCustomers[i].idCus}</td>
            <td>${filteredCustomers[i].cuitdni}</td>
            <td>${filteredCustomers[i].nameCus}</td>
            <td>${filteredCustomers[i].telefon}</td>
            <th><button title="Eliminar"   class="delBtn actionBtn" id="delCos${filteredCustomers[i].idCus}" onclick="dellCustomer(${filteredCustomers[i].idCus})"><i class='bx bx-trash'></i></button></th>
            <th><button title="Visualizar" class="viewBtn actionBtn" id="viewCos${filteredCustomers[i].idCus}"><i class='bx bx-spreadsheet' onclick="viewCustomer(${filteredCustomers[i].idCus})"></i></button></th>
            <th><button title="Editar"     class="editBtn actionBtn" id="editCos${filteredCustomers[i].idCus}" onclick="openEditCustomer(${filteredCustomers[i].idCus})"><i class='bx bx-edit-alt'></i></button></th>
          </tr>
        `
    }
  } else if (findDniCuit !== "") {
    let filteredCustomers = Customers.filter(customer => {
      return customer.cuitdni.toLowerCase().includes(findDniCuit.toLowerCase());
    });

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
    for (let i = 0; i < filteredCustomers.length; i++) {
      let rowClass = i % 2 === 0 ? "evenrow" : "oddrow";
      tabCos.innerHTML += `
        <tr class="${rowClass}">
            <td>${filteredCustomers[i].idCus}</td>
            <td>${filteredCustomers[i].cuitdni}</td>
            <td>${filteredCustomers[i].nameCus}</td>
            <td>${filteredCustomers[i].telefon}</td>
            <th><button title="Eliminar"   class="delBtn actionBtn" id="delCos${filteredCustomers[i].idCus}" onclick="dellCustomer(${filteredCustomers[i].idCus})"><i class='bx bx-trash'></i></button></th>
            <th><button title="Visualizar" class="viewBtn actionBtn" id="viewCos${filteredCustomers[i].idCus}"><i class='bx bx-spreadsheet' onclick="viewCustomer(${filteredCustomers[i].idCus})"></i></button></th>
            <th><button title="Editar"     class="editBtn actionBtn" id="editCos${filteredCustomers[i].idCus}" onclick="openEditCustomer(${filteredCustomers[i].idCus})"><i class='bx bx-edit-alt'></i></button></th>
          </tr>
        `
    }
  }
}
// Edicion
function openEditCustomer(id){
  let i = Customers.findIndex(customer => customer.idCus === id);
  editModal.style.display = "block";
  document.getElementById("editNameCus").value =Customers[i].nameCus;
  document.getElementById("EditCuitdni").value =Customers[i].cuitdni;
  document.getElementById("editTelCus").value =Customers[i].telefon;
  idEditCustomer = i;
}
function editCustomer(id){
  let nameEditCustomer = document.getElementById("editNameCus").value;
  let telEditCustomer = document.getElementById("editTelCus").value;
  let footModal = document.getElementById("footEditModalMsg");
  if (nameEditCustomer != "") {
    let cuitdni = document.getElementById("EditCuitdni").value;
    if (cuitdni.length === 7 || cuitdni.length === 8) {
      Customers[id].nameCus = nameEditCustomer;
      Customers[id].cuitdni = cuitdni;
      Customers[id].telefon = telEditCustomer;
      listCustomers();
      editModal.style.display = "none";
    } else {
      if (cuitdni.length === 11) {
        let inicioCuit = cuitdni.slice(0, 2);
        if ([20, 23, 27, 30].includes(parseInt(inicioCuit))) {
          Customers[id].nameCus = nameEditCustomer;
          Customers[id].cuitdni = cuitdni;
          Customers[id].telefon = telEditCustomer;
          listCustomers();
          editModal.style.display = "none";
        } else {
          footModal.innerHTML = `!El Cuit o DNI no tiene el formato correcto.`
        }
      } else {
        footModal.innerHTML = `!El Cuit o DNI no tiene el formato correcto.`
      }
    }
  } else {
    footModal.innerHTML = `!Debe completar el campo usuario.`
  }
  idEditCustomer= Nan;
}
// Visualizacion
function viewCustomer(id){
  let i = Customers.findIndex(customer => customer.idCus === id);
  viewModal.style.display = "block";
  document.getElementById("viewModalTitle").innerHTML=`
    CLIENTE: ${id}
  `
  document.getElementById("viewModalContent").innerHTML=`
    <p>Nombre: ${Customers[i].nameCus}</p>
    <p>Cuit/DNI: ${Customers[i].cuitdni}</p>
    <p>Telefono: ${Customers[i].telefon}</p>
  `
  idEditCustomer = id;
}

//BOTONES
// Alta
let addCus = document.getElementById("addCus");
addCus.addEventListener("click", (e) => {
  e.preventDefault();
  addCustomer();
}
)
// Busquda
let findCus = document.getElementById("findButton");
findCus.addEventListener("click", (e) => {
  e.preventDefault();
  findCustomer();
})
let unFindCus = document.getElementById("unFindButton");
unFindCus.addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("nameFindCus").value = ""
  document.getElementById("cuitdnifind").value = ""
  listCustomers();
})
// Editar
let editCus = document.getElementById("editCus");
editCus.addEventListener("click", (e) =>{
  e.preventDefault();
  editCustomer(idEditCustomer);
})
//CARGA
if (localStorage.getItem("Customers")) {
  listCustomers();
} else {
  let tabCos = document.getElementById("tableCustomers");
  tabCos.innerHTML = ``
  tabCos.innerHTML += `
      <tr>
        <th>NO EXISTEN CLIENTES PARA MOSTRAR, CARGE UN NUEVO CLIENTE DESDE EL BOTON "+ NUEVO CLIENTE"</th>
      </tr>
    `
}
