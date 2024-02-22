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




function parseDate(dateString) {
  let parts = dateString.split('-');
  let year = parseInt(parts[0]);
  let month = parseInt(parts[1]);
  let day = parseInt(parts[2]);
  return DateTime.local(year, month, day);
}
// Paso 1: Calcular la cantidad de alquileres por semana
const rentalsPerWeek = {};
Rentals.forEach(rental => {
  
  const startDate = DateTime.fromISO(rental.dateStrRen);
    const weekNumber = startDate.weekNumber;

    if (rentalsPerWeek[weekNumber]) {
        rentalsPerWeek[weekNumber]++;
    } else {
        rentalsPerWeek[weekNumber] = 1;
    }
});

// Paso 2: Preparar los datos para el gráfico
const weeks = Object.keys(rentalsPerWeek).sort((a, b) => a - b);
const rentalCounts = weeks.map(week => rentalsPerWeek[week]);



// Paso 3: Crear el gráfico con Chart.js
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar', // Puedes cambiar el tipo de gráfico según tu preferencia
    data: {
        labels: weeks,
        datasets: [{
            label: 'Cantidad de alquileres por semana',
            data: rentalCounts,
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de fondo de las barras
            borderColor: 'rgba(75, 192, 192, 1)', // Color del borde de las barras
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true // Comienza el eje Y en cero
            }
        }
    }
});