const form = document.getElementById('product-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const productName = document.getElementById('product-name').value;
    const productDescription = document.getElementById('product-description').value;

    // Send the form data to a server-side API or process it locally
    // For demonstration purposes, we'll simply add the new product to the table
    addProductToTable(productName, productDescription);
  });

  function addProductToTable(productName, productDescription) {
    const tableBody = document.getElementById('immigration-table-body');
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
      <td>${productName}</td>
      <td>${productDescription}</td>
      <td>
        <div class="btn-group" role="group" aria-label="Basic example">
          <button class="btn btn-sm btn-warning" onclick="editProduct('${productName}')">Edit</button>
        </div>
      </td>
    `;
  }

  function editProduct(productName) {
    // Implement edit functionality here
    console.log(`Edit product: ${productName}`);
  }
    const eventSource = new EventSource('/dashboard');

    eventSource.onmessage = (event) => {
      if (event.data.type === 'init') {
        console.log(event.data.message);
      } else if (event.data.type === 'newSubmission') {
        const submission = event.data.data;
        const listItem = document.createElement('li');
        listItem.textContent = `ID: ${submission.id}, Name: ${submission.name}`;
        document.getElementById('submissions-list').appendChild(listItem);
      } else if (event.data.type === 'dashboardData') {
        const submissions = event.data.data;
        submissions.forEach((submission) => {
          const listItem = document.createElement('li');
          listItem.textContent = `ID: ${submission.id}, Name: ${submission.name}`;
          document.getElementById('submissions-list').appendChild(listItem);
        });
      }
    };
    // Example URL where the orders data could be fetched from
const url = 'http://147.139.192.59:3000/appointments';

// Fetch orders and log them to the console
async function fetchOrders() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const orders = await response.json();
    console.log(orders);  
    displayOrders(orders);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

// Function to display orders in the dashboard (modify as per your dashboard's structure)
function displayOrders(orders) {
  const dashboard = document.getElementById('orders-dashboard');
  
  orders.forEach(order => {
    const orderDiv = document.createElement('div');
    orderDiv.className = 'order-item';
    orderDiv.innerHTML = `
      <h3>Invoice: ${order.invoice}</h3>
      <p><strong>Date:</strong> ${order.date}</p>
      <p><strong>Sender:</strong> ${order.sender}</p>
      <p><strong>Receiver:</strong> ${order.receiver}</p>
      <p><strong>Status:</strong> ${order.status}</p>
      <h4>Tracking:</h4>
      <ul>
        ${order.tracking.map(track => `<li>${track.date}: ${track.status}</li>`).join('')}
      </ul>
    `;
    dashboard.appendChild(orderDiv);
  });
}

// Call the fetchOrders function when the page loads or when you need to refresh the data
fetchOrders();