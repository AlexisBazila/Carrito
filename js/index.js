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