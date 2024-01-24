///DEFINICION DE VARIABLES
let Customers = new Array();
if (localStorage.getItem("Customers")) {
  Customers = JSON.parse(localStorage.getItem("Customers"));
}


//DEFINICION DE CLASES
class customer {
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
          <td>${i}</td>
          <td>${Customers[i].cuitdni}</td>
          <td>${Customers[i].nameCus}</td>
          <td>${Customers[i].telefon}</td>
          <th><button title="Eliminar"   class="delBtn actionBtn" id="delCos${i}" onclick="dellCustomer(${i})"><i class='bx bx-trash'></i></button></th>
          <th><button title="Visualizar" class="viewBtn actionBtn" id="viewCos${i}"><i class='bx bx-spreadsheet'></i></button></th>
          <th><button title="Editar"     class="editBtn actionBtn" id="editCos${i}"><i class='bx bx-edit-alt'></i></button></th>
        </tr>
      `
    const jsonCost = JSON.stringify(Customers);
    localStorage.setItem("Customers", jsonCost);
  }
}

function dellCustomer(id) {
  if (confirm(`esta a punto de eliminar el cliente: \n ${id} -> ${Customers[id].cuitdni} - ${Customers[id].nombre} \n Realmente desea hacerlo?`)) {
    Customers.splice(id, 1);
    listCustomers();
  }

}

function addCustomer() {
  let footModal = document.getElementById("footModalMsg");
  if (document.getElementById("nameCus").value != "") {
    let cuitdni = document.getElementById("cuitdni").value;
    if (cuitdni.length === 7 || cuitdni.length === 8) {
      Customers.push(new customer());
      listCustomers();
      modal.style.display = "none";
    } else {
      if (cuitdni.length === 11) {
        let inicioCuit = cuitdni.slice(0, 2);
        if ([20, 23, 27, 30].includes(parseInt(inicioCuit))) {
          Customers.push(new customer());
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
          <td>${i}</td>
          <td>${filteredCustomers[i].cuitdni}</td>
          <td>${filteredCustomers[i].nameCus}</td>
          <td>${filteredCustomers[i].telefon}</td>
          <th><button title="Eliminar"   class="delBtn actionBtn" id="delCos${i}" onclick="dellCustomer(${i})"><i class='bx bx-trash'></i></button></th>
          <th><button title="Visualizar" class="viewBtn actionBtn" id="viewCos${i}"><i class='bx bx-spreadsheet'></i></button></th>
          <th><button title="Editar"     class="editBtn actionBtn" id="editCos${i}"><i class='bx bx-edit-alt'></i></button></th>
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
            <td>${i}</td>
            <td>${filteredCustomers[i].cuitdni}</td>
            <td>${filteredCustomers[i].nameCus}</td>
            <td>${filteredCustomers[i].telefon}</td>
            <th><button title="Eliminar"   class="delBtn actionBtn" id="delCos${i}" onclick="dellCustomer(${i})"><i class='bx bx-trash'></i></button></th>
            <th><button title="Visualizar" class="viewBtn actionBtn" id="viewCos${i}"><i class='bx bx-spreadsheet'></i></button></th>
            <th><button title="Editar"     class="editBtn actionBtn" id="editCos${i}"><i class='bx bx-edit-alt'></i></button></th>
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
            <td>${i}</td>
            <td>${filteredCustomers[i].cuitdni}</td>
            <td>${filteredCustomers[i].nameCus}</td>
            <td>${filteredCustomers[i].telefon}</td>
            <th><button title="Eliminar"     class="delBtn actionBtn" id="delCos${i}" onclick="dellCustomer(${i})"><i class='bx bx-trash'></i></button></th>
            <th><button title="Visualizar"  class="viewBtn actionBtn" id="viewCos${i}"><i class='bx bx-spreadsheet'></i></button></th>
            <th><button title="Editar"      class="editBtn actionBtn" id="editCos${i}"><i class='bx bx-edit-alt'></i></button></th>
          </tr>
        `
    }
  }
}

//VENTANA EMERGENTE DE ALTA
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

//BOTONES
let addCus = document.getElementById("addCus");
addCus.addEventListener("click", (e) => {
  e.preventDefault();
  addCustomer();
}
)

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
