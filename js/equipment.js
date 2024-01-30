// DEFINICION DE VARIABLES
let Equipments = new Array();
let countEqui = 1;
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
      this.nameEqui = document.getElementById("nameEqui").value;
      this.pRenEqui = document.getElementById("pRenEqui").value;
      this.pRepEqui = document.getElementById("pRepEqui").value;
      this.stockEqui = document.getElementById("stockEqui").value;
      this.avaEqui = document.getElementById("avaEqui").value;

      // this.picEqui = document.getElementById("picEqui").value;
      // let pic = document.getElementById("picEqui");
      const selectedFile = document.getElementById("picEqui").files[0];
      if (selectedFile) {
        this.picEqui = URL.createObjectURL(selectedFile);
      }

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

let picEqui = document.getElementById("picEqui");
picEqui.onchange = function() {
  let viewPicEquipo = document.getElementById("viewPicEqui");
  const selectedFile = picEqui.files[0];
  if (selectedFile) {
    const imageUrl = URL.createObjectURL(selectedFile);
    viewPicEquipo.src = imageUrl;
  }
};


// DEFINICION DE FUNCIONES
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
                  Equipments.push(new equipment());
                  listEquipments();
                  countEqui += 1
                  modal.style.display = "none";
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

function listEquipments() {
  let tabEqui = document.getElementById("tableEquipment");
  tabEqui.innerHTML = ``
  tabEqui.innerHTML += `
      <tr class="headRow">
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
          <td>${Equipments[i].nameEqui}</td>
          <td>$${Equipments[i].pRenEqui}</td>
          <td>${Equipments[i].stockEqui}</td>
          <td>${Equipments[i].avaEqui}</td>
          <th><button title="Eliminar"   class="delBtn actionBtn" id="delEqui${i}" onclick="dellEquipment(${i})"><i class='bx bx-trash'></i></button></th>
          <th><button title="Visualizar" class="viewBtn actionBtn" id="viewEqui${i}"><i class='bx bx-spreadsheet' onclick="viewEquipment(${i})"></i></button></th>
          <th><button title="Editar"     class="editBtn actionBtn" id="editEqui${i}" onclick="openEditEquipment(${i})"><i class='bx bx-edit-alt'></i></button></th>
        </tr>
      `
    const jsonCost = JSON.stringify(Equipments);
    localStorage.setItem("Equipments", jsonCost);
  }
}

//BOTONES
let addEqui = document.getElementById("addEqui");
addEqui.addEventListener("click", (e) => {
  e.preventDefault();
  addEquipment();
}
)

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