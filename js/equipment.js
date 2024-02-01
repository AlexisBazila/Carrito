// DEFINICION DE VARIABLES
let Equipments = new Array();
let countEqui = 1;
let idEditEquipment= NaN;
if (localStorage.getItem("Equipments")) {
  Equipments = JSON.parse(localStorage.getItem("Equipments"));
  countEqui += Equipments.length
}

// Equipments[0] = { nombre: "Mesa", precioAlquiler: 3000, precioReposicion: 30000, stock: 50, Disponible: 50 };
// Equipments[1] = { nombre: "Silla", precioAlquiler: 1000, precioReposicion: 10000, stock: 500, Disponible: 500 };
// Equipments[2] = { nombre: "Mantel", precioAlquiler: 500, precioReposicion: 5000, stock: 500, Disponible: 500 };
// Equipments[3] = { nombre: "Plato", precioAlquiler: 150, precioReposicion: 1500, stock: 5000, Disponible: 500 };
// Equipments[4] = { nombre: "Cubiertos", precioAlquiler: 100, precioReposicion: 1000, stock: 50, Disponible: 50 };

//DEFINICION DE CLASES
class equipment {
    constructor() {
      this.idEqui = countEqui;
      this.codEqui = document.getElementById("codEqui").value;
      this.nameEqui = document.getElementById("nameEqui").value;
      this.pRenEqui = document.getElementById("pRenEqui").value;
      this.pRepEqui = document.getElementById("pRepEqui").value;
      this.stockEqui = document.getElementById("stockEqui").value;
      this.avaEqui = document.getElementById("avaEqui").value;
      const selectedFile = document.getElementById("picEqui").files[0];
      if (selectedFile) {
        this.picEqui = URL.createObjectURL(selectedFile);
      }
      document.getElementById("codEqui").value= "";
      document.getElementById("nameEqui").value = "";
      document.getElementById("pRenEqui").value = "";
      document.getElementById("pRepEqui").value = "";
      document.getElementById("stockEqui").value = "";
      document.getElementById("avaEqui").value = "";
    }
  }

//VENTANAS MODALES
// Alta
let openFormButton = document.getElementById("openFormButton");
let modal = document.getElementById("EquipamentModal");
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
// Revisar como mejorar!
let picEqui = document.getElementById("picEqui");
picEqui.onchange = function() {
  let viewPicEquipo = document.getElementById("viewPicEqui");
  const selectedFile = picEqui.files[0];
  if (selectedFile) {
    const imageUrl = URL.createObjectURL(selectedFile);
    viewPicEquipo.src = imageUrl;
  }
};
// Vista
let viewModal = document.getElementById("equipmentViewModal");
let closeViewModal = document.getElementById("closeViewModal");
closeViewModal.onclick = function () {
  viewModal.style.display = "none";
}
window.onclick = function (event) {
  if (event.target == modal) {
    viewModal.style.display = "none";
  }
}
// Modificacion
let editModal = document.getElementById("equipmentEditModal");
let closeEditModal = document.getElementById("closeEditModal");
closeEditModal.onclick = function () {
  editModal.style.display = "none";
}
window.onclick = function (event) {
  if (event.target == modal) {
    editModal.style.display = "none";
  }
}

// DEFINICION DE FUNCIONES
// Alta
function addEquipment() {
  let footModal = document.getElementById("footModalMsg");
  if (document.getElementById("nameEqui").value != "") {
    if (document.getElementById("pRenEqui").value != "") {
      if (document.getElementById("pRepEqui").value != "") {
        let pRepEquiValue = parseFloat(document.getElementById("pRepEqui").value);
        let pRenEquiValue = parseFloat(document.getElementById("pRenEqui").value);
        if (!isNaN(pRepEquiValue) && !isNaN(pRenEquiValue)) {
          if (pRepEquiValue > pRenEquiValue) {
            if (document.getElementById("stockEqui").value != "") {
              if (document.getElementById("avaEqui").value != "") {
                if(parseInt(document.getElementById("stockEqui").value) >= parseInt(document.getElementById("avaEqui").value)){
                  if(document.getElementById("codEqui").value !=""){
                    if (!Equipments.find(equipo => equipo.codEqui === document.getElementById("codEqui").value)){
                      Equipments.push(new equipment());
                      listEquipments();
                      countEqui += 1
                      modal.style.display = "none";
                    }else{
                      footModal.innerHTML = "!Ya existe otro equipamiento con el codigo ingresado";
                    }
                  }else{
                    footModal.innerHTML = "!Debe ingresar un codigo para el equipamiento";
                  }
                }else {
                  footModal.innerHTML = "!El stock disponible no puede ser mayor al stock total";
                }
              } else {
                footModal.innerHTML = "!Debe completar el campo Stock disponible del equipo";
              }
            } else {
              footModal.innerHTML = "!Debe completar el campo Stock total del equipo";
            }
          } else {
            footModal.innerHTML = "!El precio de reposición no puede ser menor al precio del alquiler del equipamiento";
          }
        } else {
          footModal.innerHTML = "!Los campos de precio deben contener valores numéricos";
        }
      } else {
        footModal.innerHTML = "!Debe completar el campo Precio de reposición del equipo";
      }
    } else {
      footModal.innerHTML = "!Debe completar el campo Precio de alquiler del equipo";
    }
  } else {
    footModal.innerHTML = "!Debe completar el campo nombre del equipo";
  }
}
// Listar
function listEquipments() {
  let tabEqui = document.getElementById("tableEquipment");
  tabEqui.innerHTML = ``
  tabEqui.innerHTML += `
      <tr class="headRow">
        <th>ID</th>
        <th>Codigo</th>
        <th>Nombre</th>
        <th>Precio Alquiler</th>
        <th>Stock tot.</th>
        <th>Disponible</th>
        <th colspan="3">Acciones</th>
      </tr>
    `
  for (let i = 0; i < Equipments.length; i++) {
    let rowClass = i % 2 === 0 ? "evenrow" : "oddrow";
    tabEqui.innerHTML += `
      <tr class="${rowClass}">
          <td>${Equipments[i].idEqui}</td>
          <td>${Equipments[i].codEqui}</td>
          <td>${Equipments[i].nameEqui}</td>
          <td>$${Equipments[i].pRenEqui}</td>
          <td>${Equipments[i].stockEqui}</td>
          <td>${Equipments[i].avaEqui}</td>
          <th><button title="Eliminar"   class="delBtn actionBtn" id="delEqui${i}" onclick="dellEquipment(${Equipments[i].idEqui})"><i class='bx bx-trash'></i></button></th>
          <th><button title="Visualizar" class="viewBtn actionBtn" id="viewEqui${i}"><i class='bx bx-spreadsheet' onclick="viewEquipment(${Equipments[i].idEqui})"></i></button></th>
          <th><button title="Editar"     class="editBtn actionBtn" id="editEqui${i}" onclick="openEditEquipment(${Equipments[i].idEqui})"><i class='bx bx-edit-alt'></i></button></th>
        </tr>
      `
    const jsonCost = JSON.stringify(Equipments);
    localStorage.setItem("Equipments", jsonCost);
  }
}
// Eliminar
function dellEquipment(id) {
  let i = Equipments.findIndex(equipo => equipo.idEqui === id);
  if (confirm(`esta a punto de eliminar el Equipamiento: \n ${i} -> ${Equipments[i].codEqui} - ${Equipments[i].nameEqui} \n Realmente desea hacerlo?`)) {
    Equipments.splice(i, 1);
    listEquipments();
  }

}

// Visualizacion
function viewEquipment(id){
  let equiFil = Equipments.find(equipo => equipo.idEqui === id);
  viewModal.style.display = "block";
  document.getElementById("viewModalTitle").innerHTML=`
  ${equiFil.codEqui} - ${equiFil.nameEqui}
  `
  // Revisar como visualizar la imagen correctamente.
  
  document.getElementById("viewModalContent").innerHTML=`
    <p>ID: ${equiFil.idEqui}</p>
    <p>Codigo: ${equiFil.codEqui}</p>
    <p>Nombre: ${equiFil.nameEqui}</p>
    <p>Precio de alquiler: $${equiFil.pRenEqui}</p>
    <p>Precio de repocición: $${equiFil.pRepEqui}</p>
    <p>Stock total: ${equiFil.stockEqui}</p>
    <p>Stock disponible: ${equiFil.avaEqui}</p>
    <img src="${equiFil.picEqui}"  alt="">
  `
  idEditEquipment = id;
}

// edicion
function openEditEquipment(id){
  editModal.style.display = "block";
  let footModal = document.getElementById("footEditModalMsg");
  footModal.innerHTML = "";
  let i = Equipments.findIndex(equipo => equipo.idEqui === id);
  document.getElementById("editCodEqui").value = Equipments[i].codEqui;
  document.getElementById("editNameEqui").value = Equipments[i].nameEqui;
  document.getElementById("editPRenEqui").value = Equipments[i].pRenEqui;
  document.getElementById("editPRepEqui").value = Equipments[i].pRepEqui;
  document.getElementById("editStockEqui").value = Equipments[i].stockEqui;
  document.getElementById("editAvaEqui").value = Equipments[i].avaEqui;
  
  idEditEquipment = i;
}
function editEquipment(id){
  let footModal = document.getElementById("footEditModalMsg");
  if (document.getElementById("editNameEqui").value != "") {
    if (document.getElementById("editPRenEqui").value != "") {
      if (document.getElementById("editPRepEqui").value != "") {
        let pRepEquiValue = parseFloat(document.getElementById("editPRepEqui").value);
        let pRenEquiValue = parseFloat(document.getElementById("editPRenEqui").value);
        if (!isNaN(pRepEquiValue) && !isNaN(pRenEquiValue)) {
          if (pRepEquiValue > pRenEquiValue) {
            if (document.getElementById("editStockEqui").value != "") {
              if (document.getElementById("editAvaEqui").value != "") {
                if(parseInt(document.getElementById("editStockEqui").value) >= parseInt(document.getElementById("editAvaEqui").value)){
                  if(document.getElementById("editCodEqui").value !=""){
                    if (!Equipments.find(equipo => equipo.codEqui === document.getElementById("editCodEqui").value)){
                      Equipments[id].codEqui = document.getElementById("editCodEqui").value;
                      Equipments[id].nameEqui = document.getElementById("editNameEqui").value;
                      Equipments[id].pRenEqui = document.getElementById("editPRenEqui").value;
                      Equipments[id].pRepEqui = document.getElementById("editPRepEqui").value;
                      Equipments[id].stockEqui = document.getElementById("editStockEqui").value;
                      Equipments[id].avaEqui = document.getElementById("editAvaEqui").value;
                      listEquipments();
                      editModal.style.display = "none";
                    }else{
                      footModal.innerHTML = "!Ya existe otro equipamiento con el codigo ingresado";
                    }
                  }else{
                    footModal.innerHTML = "!Debe ingresar un codigo para el equipamiento";
                  }
                }else {
                  footModal.innerHTML = "!El stock disponible no puede ser mayor al stock total";
                }
              } else {
                footModal.innerHTML = "!Debe completar el campo Stock disponible del equipo";
              }
            } else {
              footModal.innerHTML = "!Debe completar el campo Stock total del equipo";
            }
          } else {
            footModal.innerHTML = "!El precio de reposición no puede ser menor al precio del alquiler del equipamiento";
          }
        } else {
          footModal.innerHTML = "!Los campos de precio deben contener valores numéricos";
        }
      } else {
        footModal.innerHTML = "!Debe completar el campo Precio de reposición del equipo";
      }
    } else {
      footModal.innerHTML = "!Debe completar el campo Precio de alquiler del equipo";
    }
  } else {
    footModal.innerHTML = "!Debe completar el campo nombre del equipo";
  }
  idEditCustomer= Nan;
}
// Buscar
function findEquipment() {
  let findNameEqui = document.getElementById("nameFindEqui").value
  let findCodEqui = document.getElementById("codFindEqui").value

  if (findCodEqui !== "" && findNameEqui !== "") {
    let filteredEquipments = Equipments.filter(equipment => {
      return (
        equipment.nameEqui.toLowerCase().includes(findNameEqui.toLowerCase()) &&
        equipment.codEqui.includes(findCodEqui.toLowerCase())
      );
    });

    let tabEqui = document.getElementById("tableEquipment");
    tabEqui.innerHTML = ``
    tabEqui.innerHTML += `
        <tr class="headRow">
          <th>ID</th>
          <th>Codigo</th>
          <th>Nombre</th>
          <th>Precio Alquiler</th>
          <th>Stock tot.</th>
          <th>Disponible</th>
          <th colspan="3">Acciones</th>
        </tr>
      `
    for (let i = 0; i < filteredEquipments.length; i++) {
      let rowClass = i % 2 === 0 ? "evenrow" : "oddrow";
      tabEqui.innerHTML += `
        <tr class="${rowClass}">
            <td>${filteredEquipments[i].idEqui}</td>
            <td>${filteredEquipments[i].codEqui}</td>
            <td>${filteredEquipments[i].nameEqui}</td>
            <td>$${filteredEquipments[i].pRenEqui}</td>
            <td>${filteredEquipments[i].stockEqui}</td>
            <td>${filteredEquipments[i].avaEqui}</td>
            <th><button title="Eliminar"   class="delBtn actionBtn" id="delEqui${i}" onclick="dellEquipment(${filteredEquipments[i].idEqui})"><i class='bx bx-trash'></i></button></th>
            <th><button title="Visualizar" class="viewBtn actionBtn" id="viewEqui${i}"><i class='bx bx-spreadsheet' onclick="viewEquipment(${filteredEquipments[i].idEqui})"></i></button></th>
            <th><button title="Editar"     class="editBtn actionBtn" id="editEqui${i}" onclick="openEditEquipment(${filteredEquipments[i].idEqui})"><i class='bx bx-edit-alt'></i></button></th>
          </tr>
        `
    }
  } else if (findNameEqui !== "") {
      let filteredEquipments = Equipments.filter(equipment => {
      return equipment.nameEqui.toLowerCase().includes(findNameEqui.toLowerCase());
      });

      let tabEqui = document.getElementById("tableEquipment");
      tabEqui.innerHTML = ``
      tabEqui.innerHTML += `
          <tr class="headRow">
            <th>ID</th>
            <th>Codigo</th>
            <th>Nombre</th>
            <th>Precio Alquiler</th>
            <th>Stock tot.</th>
            <th>Disponible</th>
            <th colspan="3">Acciones</th>
          </tr>
        `
      for (let i = 0; i < filteredEquipments.length; i++) {
        let rowClass = i % 2 === 0 ? "evenrow" : "oddrow";
        tabEqui.innerHTML += `
          <tr class="${rowClass}">
              <td>${filteredEquipments[i].idEqui}</td>
              <td>${filteredEquipments[i].codEqui}</td>
              <td>${filteredEquipments[i].nameEqui}</td>
              <td>$${filteredEquipments[i].pRenEqui}</td>
              <td>${filteredEquipments[i].stockEqui}</td>
              <td>${filteredEquipments[i].avaEqui}</td>
              <th><button title="Eliminar"   class="delBtn actionBtn" id="delEqui${i}" onclick="dellEquipment(${filteredEquipments[i].idEqui})"><i class='bx bx-trash'></i></button></th>
              <th><button title="Visualizar" class="viewBtn actionBtn" id="viewEqui${i}"><i class='bx bx-spreadsheet' onclick="viewEquipment(${filteredEquipments[i].idEqui})"></i></button></th>
              <th><button title="Editar"     class="editBtn actionBtn" id="editEqui${i}" onclick="openEditEquipment(${filteredEquipments[i].idEqui})"><i class='bx bx-edit-alt'></i></button></th>
            </tr>
          `
      }
  } else if (findCodEqui !== "") {
    let filteredEquipments = Equipments.filter(equipment => {
      return equipment.codEqui.toLowerCase().includes(findCodEqui.toLowerCase());
    });

    let tabEqui = document.getElementById("tableEquipment");
    tabEqui.innerHTML = ``
    tabEqui.innerHTML += `
        <tr class="headRow">
          <th>ID</th>
          <th>Codigo</th>
          <th>Nombre</th>
          <th>Precio Alquiler</th>
          <th>Stock tot.</th>
          <th>Disponible</th>
          <th colspan="3">Acciones</th>
        </tr>
      `
    for (let i = 0; i < filteredEquipments.length; i++) {
      let rowClass = i % 2 === 0 ? "evenrow" : "oddrow";
      tabEqui.innerHTML += `
        <tr class="${rowClass}">
            <td>${filteredEquipments[i].idEqui}</td>
            <td>${filteredEquipments[i].codEqui}</td>
            <td>${filteredEquipments[i].nameEqui}</td>
            <td>$${filteredEquipments[i].pRenEqui}</td>
            <td>${filteredEquipments[i].stockEqui}</td>
            <td>${filteredEquipments[i].avaEqui}</td>
            <th><button title="Eliminar"   class="delBtn actionBtn" id="delEqui${i}" onclick="dellEquipment(${filteredEquipments[i].idEqui})"><i class='bx bx-trash'></i></button></th>
            <th><button title="Visualizar" class="viewBtn actionBtn" id="viewEqui${i}"><i class='bx bx-spreadsheet' onclick="viewEquipment(${filteredEquipments[i].idEqui})"></i></button></th>
            <th><button title="Editar"     class="editBtn actionBtn" id="editEqui${i}" onclick="openEditEquipment(${filteredEquipments[i].idEqui})"><i class='bx bx-edit-alt'></i></button></th>
          </tr>
        `
    }
  }
}

//BOTONES
// Agregar
let addEqui = document.getElementById("addEqui");
addEqui.addEventListener("click", (e) => {
  e.preventDefault();
  addEquipment();
}
)
// Editar
let editEqui = document.getElementById("editEqui");
editEqui.addEventListener("click", (e) =>{
  e.preventDefault();
  editEquipment(idEditEquipment);
})
// Busquda
let findEqui = document.getElementById("findButton");
findEqui.addEventListener("click", (e) => {
  e.preventDefault();
  findEquipment();
})
let unFindEqui= document.getElementById("unFindButton");
unFindEqui.addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("nameFindEqui").value = ""
  document.getElementById("codFindEqui").value = ""
  listEquipments();
})

//CARGA
if (localStorage.getItem("Equipments")) {
  listEquipments();
} else {
  let tabEqui = document.getElementById("tableEquipment");
  tabEqui.innerHTML = ``
  tabEqui.innerHTML += `
      <tr>
        <th>NO EXISTEN EQUIPAMIENTOS PARA MOSTRAR, CARGE UN NUEVO EQUIPAMIENTO DESDE EL BOTON "+ NUEVO EQUIPAMIENTO"</th>
      </tr>
    `
}