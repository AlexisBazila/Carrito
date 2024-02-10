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
countCus.innerHTML=`${Customers.length}`

let countEqui = document.getElementById("countEqui");
countEqui.innerHTML=`${Equipments.length}`

let countRent = document.getElementById("countRent");
countRent.innerHTML=`${Rentals.length}`

let demo = document.getElementById("demo");
demo.addEventListener("click", async (e) => {
  e.preventDefault();
  await traerDatos("https://alexisbazila.github.io/Carrito/json/customers.json", Customers, "Customers");
  await traerDatos("https://alexisbazila.github.io/Carrito/json/equipments.json", Equipments, "Equipments");
  await traerDatos("https://alexisbazila.github.io/Carrito/json/rentals.json", Rentals, "Rentals");
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