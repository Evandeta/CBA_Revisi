// script.js
const addProductBtn = document.getElementById('add-product-btn');
const popupPage = document.getElementById('popup-page');
const productForm = document.getElementById('product-form');
const saveBtn = document.getElementById('save-btn');
const cancelBtn = document.getElementById('cancel-btn');
const productList = document.getElementById('product-list');

let products = [];

addProductBtn.addEventListener('click', () => {
  popupPage.style.display = 'block';
  document.getElementById('popup-title').innerHTML = 'Add Product';
});

cancelBtn.addEventListener('click', () => {
  popupPage.style.display = 'none';
});

saveBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const productType = document.getElementById('product-type').value;
  const price = document.getElementById('price').value;
  const visaType = document.getElementById('visa-type').value;
  const service = document.getElementById('service').value;

  const product = {
    productType,
    price,
    visaType,
    service
  };

  products.push(product);

  popupPage.style.display = 'none';

  renderProductList();
});

function renderProductList() {
  const productListHtml = products.map((product, index) => {
    return `
      <div>
        <h3>${product.productType}</h3>
        <p>Price: ${product.price}</p>
        <p>Visa Type: ${product.visaType}</p>
        <p>Service: ${product.service}</p>
        <button class="edit-btn" data-index="${index}">Edit</button>
      </div>
    `;
  }).join('');

  productList.innerHTML = productListHtml;

  const editBtns = document.querySelectorAll('.edit-btn');

  editBtns.forEach((editBtn) => {
    editBtn.addEventListener('click', () => {
      const index = editBtn.getAttribute('data-index');
      const product = products[index];

      popupPage.style.display = 'block';
      document.getElementById('popup-title').innerHTML = 'Edit Product';

      document.getElementById('product-type').value = product.productType;
      document.getElementById('price').value = product.price;
      document.getElementById('visa-type').value = product.visaType;
      document.getElementById('service').value = product.service;

      saveBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const updatedProduct = {
          productType: document.getElementById('product-type').value,
          price: document.getElementById('price').value,
          visaType: document.getElementById('visa-type').value,
          service: document.getElementById('service').value
        };

        products[index] = updatedProduct;

        popupPage.style.display = 'none';

        renderProductList();
      });
    });
  });
}