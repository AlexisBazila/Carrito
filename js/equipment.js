// DEFINICION DE VARIABLES
let Equipaments = new Array();

Equipaments[0] = { nombre: "Mesa", precioAlquiler: 3000, precioReposicion: 30000, stock: 50, Disponible: 50 };
Equipaments[1] = { nombre: "Silla", precioAlquiler: 1000, precioReposicion: 10000, stock: 500, Disponible: 500 };
Equipaments[2] = { nombre: "Mantel", precioAlquiler: 500, precioReposicion: 5000, stock: 500, Disponible: 500 };
Equipaments[3] = { nombre: "Plato", precioAlquiler: 150, precioReposicion: 1500, stock: 5000, Disponible: 500 };
Equipaments[4] = { nombre: "Cubiertos", precioAlquiler: 100, precioReposicion: 1000, stock: 50, Disponible: 50 };

//DEFINICION DE CLASES
class equipment {
    constructor() {
      this.idEqui = document.getElementById("idEqui").value;
      this.nameEqui = document.getElementById("nameEqui").value;
      this.pRenEqui = document.getElementById("pRenEqui").value;
      this.pRepEqui = document.getElementById("pRepEqui").value;
      this.stockEqui = document.getElementById("stockEqui").value;
      this.avaEqui = document.getElementById("avaEqui").value;
      this.picEqui = document.getElementById("picEqui").value;
      document.getElementById("idEqui").value = "";
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

let picEqui = document.getElementById("picEqui")
picEqui.onchange = function(){
  prompt("dato");
}