///DEFINICION DE VARIABLES
let Customers = new Array();
if(localStorage.getItem("Customers")){
  Customers = JSON.parse(localStorage.getItem("Customers"));
}


//DEFINICION DE CLASES
class customer{
    constructor() {
      this.nameCus = document.getElementById("nameCus").value;
      this.cuitdni = document.getElementById("cuitdni").value;
      this.telefon = document.getElementById("telCus").value;
    }
  }

//DEFINICION DE FUNCIONES
  function listCustomers(){
    let tabCos = document.getElementById("tableCustomers");
    tabCos.innerHTML = ``
    tabCos.innerHTML += `
      <tr>
        <th>D</th>
        <th>E</th>
        <th>ID</th>
        <th>CUIT/DNI</th>
        <th>Nombre</th>
        <th>Telefono</th>
      </tr>
    `
    for (let i = 0; i < Customers.length; i++) {
      tabCos.innerHTML +=`
        <tr>
          <th><button id="delCos${i}" onclick="borrarCliente(${i})">D</button></th>
          <th><button id="editCos${i}">E</button></th>
          <td>${i}</td>
          <td>${Customers[i].cuitdni}</td>
          <td>${Customers[i].nameCus}</td>
          <td>${Customers[i].telefon}</td>
          <td><input type="text" value="${Customers[i].nameCus}" /></td>
        </tr>
      `
      const jsonCost = JSON.stringify(Customers);
      localStorage.setItem("Customers", jsonCost);
    }
  }

  function  borrarCliente(id){
    if(confirm(`esta a punto de eliminar el cliente: \n ${id} -> ${Customers[id].cuitdni} - ${Customers[id].nombre} \n Realmente desea hacerlo?`)){
      Customers.splice(id, 1);
      listCustomers();
    }
  }


//BOTONES
  let addCus = document.getElementById("addCus");
  addCus.addEventListener("click", (e) => {
    e.preventDefault();
    Customers.push(new customer());
    listCustomers();
    }
  )
  

//CARGA
if(localStorage.getItem("Customers")){
  listCustomers();
}else{
  let tabCos = document.getElementById("tableCustomers");
    tabCos.innerHTML = ``
    tabCos.innerHTML += `
      <tr>
        <th>TABLA VACIA</th>
      </tr>
    `
}
  