// Inputs
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let adds = document.getElementById("adds");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let quantity = document.getElementById("quantity");
let category = document.getElementById("category");
let creatBtn = document.getElementById("create");

let mode = "create";
let tmp;

// ========  Total Calcations  ========

function getTotal() {
  if(price.value != "") {
    total.innerHTML = +price.value + +taxes.value + +adds.value - +discount.value;
    total.style.background = "green";
  }else {
    total.style.background = "red";
    total.innerHTML = "";
  }
}


// ========  Product Creation ========

let products;
if(localStorage.product) {
  products = JSON.parse(localStorage.product);
}else{
  products = [];
}

creatBtn.onclick = function() {
    let newProduct = {
      title: title.value,
      price: price.value,
      taxes: taxes.value,
      adds: adds.value,
      discount: discount.value,
      total: total.innerHTML,
      quantity: quantity.value,
      category: category.value,
    }
    
    if(title.value && price.value && category.value && newProduct.quantity <= 100) {
      if(mode === "create") {
        if(newProduct.quantity > 1) {
          for(let i=0; i < newProduct.quantity; i++) {
            products.push(newProduct);
          }
        }else {
            products.push(newProduct);
        }
      }else {
        products[tmp] = newProduct;
        creatBtn.innerHTML = "Create";
        mode = "create";
        
        quantity.style.opacity = "1";
        quantity.removeAttribute("disabled");
      }
      clearData();
    }

  localStorage.setItem("product", JSON.stringify(products));
  
  showData();
}


// ========  Clear Data ========

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  adds.value = "";
  discount.value = "";
  quantity.value = "";
  category.value = "";
  
  total.innerHTML = "";
  total.style.background = "red";
}

// ========  Read ========

function showData() {
  let table = "";
  for(let i = 0; i < products.length; i++) {
    table += `
    <tr>
      <td>${i +1}</td>
      <td>${products[i].title}</td>
      <td>${products[i].price}</td>
      <td>${products[i].taxes}</td>
      <td>${products[i].adds}</td>
      <td>${products[i].discount}</td>
      <td>${products[i].total}</td>
      <td>${products[i].category}</td>
      <td><button onclick="updateData(${i})" id="update">Update</button></td>
      <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
    </tr>
    `
  }
  
  document.getElementById("tbody").innerHTML = table;
  let deleteAll = document.getElementById("deleteAll");
  
  if(products.length > 0){
    deleteAll.innerHTML = `<button onclick="deleteProducts()">Delete All (${products.length})</button>`;
  }else {
    deleteAll.innerHTML = "";
  }
}

showData();

// ========  Delete ========

function deleteData(i) {
  products.splice(i,1);
  localStorage.product = JSON.stringify(products);
  showData();
}

function deleteProducts() {
  products = [];
  showData();
  localStorage.clear();
}

// ========  Update ========

function updateData(i) {
  title.value = products[i].title;
  price.value = products[i].price;
  taxes.value = products[i].taxes;
  adds.value = products[i].adds;
  discount.value = products[i].discount;
  category.value = products[i].category;
  
  quantity.disabled = "true";
  quantity.style.opacity = "0.4";
  
  getTotal();
  creatBtn.innerHTML = "Update";
  
  mode = "update";
  tmp = i;
  
  scroll({
    top:0,
    behavior: 'smooth',
  })
}


// ========  Search ========

let searchMode = "title";
let search = document.getElementById("search");

function getSearchMode(id) {
  if(id === "searchTitle") {
    searchMode = "title";
    search.placeholder = "Search By Title";
  }else {
    searchMode = "category";
    search.placeholder = "Search By Category";
  }
  search.focus();
  search.value = '';
  showData();
}

function searchData(value){
  let table= '';
  
  if(searchMode == "title") {
    
    for(let i =0; i<products.length;i++){
      if(products[i].title.toLowerCase().includes(value.toLowerCase())){
        table += `
          <tr>
            <td>${i +1}</td>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].taxes}</td>
            <td>${products[i].adds}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
          </tr>
          `
      }
  }
  
  } else {
    
    for(let i =0; i<products.length;i++){
      if(products[i].category.toLowerCase().includes(value.toLowerCase())){
        table += `
          <tr>
            <td>${i +1}</td>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].taxes}</td>
            <td>${products[i].adds}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
          </tr>
          `
      }
  }
    
  }
  document.getElementById("tbody").innerHTML = table;
}


// ========  Product Creation ========