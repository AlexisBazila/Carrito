let Customers = new Array();
if (localStorage.getItem("Customers")) {
  Customers = JSON.parse(localStorage.getItem("Customers"));
}

let countCus = document.getElementById("countCus");
countCus.innerHTML=`${Customers.length}`