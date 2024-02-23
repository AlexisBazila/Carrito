//IMPOTACIONES
const DateTime = luxon.DateTime;
const Interval = luxon.Interval;

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



// GRAFICOS
// Grafica alquileres por mes
const rentalsPerMonth = {};
Rentals.forEach(rental => {
    const startDate = DateTime.fromISO(rental.dateStrRen);
    const yearMonth = startDate.toFormat('yyyy-MM');

    if (rentalsPerMonth[yearMonth]) {
        rentalsPerMonth[yearMonth]++;
    } else {
        rentalsPerMonth[yearMonth] = 1;
    }
});
const months = Object.keys(rentalsPerMonth).sort();
const rentalCounts = months.map(month => rentalsPerMonth[month]);
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: months,
        datasets: [{
            label: 'Cantidad de alquileres por mes',
            data: rentalCounts,
            backgroundColor: '#32C3E4',
            borderColor: '#21889E',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
// Grafico alquileres por clientes
const rentalsPerCustomer = {};
Rentals.forEach(rental => {
    const customerId = rental.idCus;

    if (rentalsPerCustomer[customerId]) {
        rentalsPerCustomer[customerId]++;
    } else {
        rentalsPerCustomer[customerId] = 1;
    }
});
const customers = Object.keys(rentalsPerCustomer).sort((a, b) => a - b);
const rentalCountsPerCustomer = customers.map(customerId => {
    const customer = Customers.find(c => c.idCus == customerId);
    return customer ? customer.nameCus : customerId;
});
const ctxCustomer = document.getElementById('ChartCus').getContext('2d');
const myChartCustomer = new Chart(ctxCustomer, {
    type: 'bar',
    data: {
        labels: rentalCountsPerCustomer,
        datasets: [{
            label: 'Cantidad de alquileres por cliente',
            data: Object.values(rentalsPerCustomer),
            backgroundColor: '#4ab644b0',
            borderColor: '#306A2D',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});