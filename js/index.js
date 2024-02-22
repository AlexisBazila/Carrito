let Customers = new Array();
if (localStorage.getItem("Customers")) {
  Customers = JSON.parse(localStorage.getItem("Customers"));
}
let Equipments = new Array();
if (localStorage.getItem("Equipments")) {
  Equipments = JSON.parse(localStorage.getItem("Equipments"));
}
let Rentals = new Array();
if (localStorage.getItem("Rentals")){
  Rentals = JSON.parse(localStorage.getItem("Rentals"));
}

let countCus = document.getElementById("countCus");
for (let i = 0; i < Customers.length; i++){
  setTimeout(function() {
    countCus.innerHTML=`${i}`
  }, i * 50);
}

let countEqui = document.getElementById("countEqui");
for (let i = 0; i < Equipments.length; i++){
  setTimeout(function() {
    countEqui.innerHTML=`${i}`
  }, i * 50);
}


let countRent = document.getElementById("countRent");
for (let i = 0; i < Rentals.length; i++){
  setTimeout(function() {
    countRent.innerHTML=`${i}`
  }, i * 50);
}


let demo = document.getElementById("demo");
demo.addEventListener("click", async (e) => {
  e.preventDefault();
  await traerDatos("https://raw.githubusercontent.com/AlexisBazila/Carrito/main/json/customers.json", Customers, "Customers");
  await traerDatos("https://raw.githubusercontent.com/AlexisBazila/Carrito/main/json/equipments.json", Equipments, "Equipments");
  await traerDatos("https://raw.githubusercontent.com/AlexisBazila/Carrito/main/json/rentals.json", Rentals, "Rentals");
  location.reload();
});

const traerDatos = async (ruta, array, table) => {
  try {
    const response = await fetch(ruta);
    array = await response.json();
    localStorage.setItem(table, JSON.stringify(array));
  } catch (error) {
    console.log(error);
  }
};