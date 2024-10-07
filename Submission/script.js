// Membuat objek untuk menyimpan data form
const formData = {
  visitPurpose: '',
  visa: '',
  service: '',
  totalPerson: '',
  referral: '',
  fullname: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  country: '',
  accomodationName: '',
  accomodationAddress: '',
  emergencyFullname: '',
  emergencyRelationship: '',
  emergencyAddress: '',
  emergencyCountry: '',
  emergencyEmail: '',
  emergencyPhone: '',
  travelDocument: '',
  documentNumber: '',
};

// Membuat fungsi untuk mengupdate data form
function updateFormData(event) {
  const { name, value } = event.target;
  formData[name] = value;
}

// Membuat fungsi untuk menampilkan data form di review submission
function displayFormData() {
  document.getElementById('document-category').textContent = formData.visitPurpose;
  document.getElementById('document-productName').textContent = formData.visa;
  document.getElementById('document-service').textContent = formData.service;
  document.getElementById('document-total-person').textContent = formData.totalPerson;
  document.getElementById('document-referral').textContent = formData.referral;
  document.getElementById('client-fullName').textContent = formData.fullname;
  document.getElementById('client-email').textContent = formData.email;
  document.getElementById('client-phoneNumber').textContent = formData.phone;
  document.getElementById('client-originalAddress').textContent = formData.address;
  document.getElementById('client-originalCity').textContent = formData.city;
  document.getElementById('client-originalProvince').textContent = formData.state;
  document.getElementById('client-zipCode').textContent = formData.zip;
  document.getElementById('client-countryId').textContent = formData.country;
  document.getElementById('client-indonesiaAccomodationName').textContent = formData.accomodationName;
  document.getElementById('client-indonesiaAddress').textContent = formData.accomodationAddress;
  document.getElementById('client-emergencyContactFullName').textContent = formData.emergencyFullname;
  document.getElementById('client-emergencyContactRelation').textContent = formData.emergencyRelationship;
  document.getElementById('client-emergencyContactAddress').textContent = formData.emergencyAddress;
  document.getElementById('client-emergencyContactCountryId').textContent = formData.emergencyCountry;
  document.getElementById('client-emergencyContactEmail').textContent = formData.emergencyEmail;
  document.getElementById('client-emergencyContactMobilePhone').textContent = formData.emergencyPhone;
  document.getElementById('client-travelDocument').textContent = formData.travelDocument;
  document.getElementById('client-documentNumber').textContent = formData.documentNumber;
}

const europeanCountries = [
  "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France",
  "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg",
  "Malta", "Netherlands", "Norway", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden",
  "Switzerland", "United Kingdom"
];

const formFields = document.querySelectorAll('input, select, textarea');
const nextButton = document.querySelector('.btn-next');

formFields.forEach(field => {
  field.addEventListener('input', checkFormFields);
});

function checkFormFields() {
  const allFieldsFilled = Array.from(formFields).every(field => field.value !== '');
  nextButton.disabled = !allFieldsFilled;
}

// Membuat fungsi untuk mengaktifkan tombol submit
function enableSubmitButton() {
  const agreementCheckbox = document.getElementById('agreement');
  const submitBtn = document.getElementById('submit-btn');
  agreementCheckbox.addEventListener('change', () => {
    submitBtn.disabled = !agreementCheckbox.checked;
  });
}

// Membuat fungsi untuk mengirimkan data form ke Midtrans
function sendFormDataToMidtrans() {
  const submitBtn = document.getElementById('submit-btn');
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const token = 'b5b40610-fd63-427d-88e8-2a4ae1cb0957'; // Replace dengan token Midtrans Anda
    payWithMidtrans(token);
  });
}

// Membuat fungsi untuk mengirimkan data form ke Midtrans
// Pastikan token Midtrans telah diatur dengan benar
const token = 'b5b40610-fd63-427d-88e8-2a4ae1cb0957'; // Replace with your Midtrans token

// Fungsi untuk melakukan pembayaran dengan Midtrans
function payWithMidtrans(token) {
  window.snap.pay(token, {
    onSuccess: function(result){
      alert("payment success!");
      console.log(result);
    },
    onPending: function(result){
      alert("waiting your payment!")
      console.log(result);
    },
    onError: function(result){
      alert("payment failed!")
      console.log(result);
    },
    onClose: function(){
      alert('you closed the popup without finishing the payment');
    }
  })
}

// Panggil fungsi payWithMidtrans saat tombol submit diklik
document.getElementById('submit-btn').addEventListener('click', (e) => {
  e.preventDefault();
  payWithMidtrans(token);
});

// Membuat fungsi untuk mengaktifkan fungsi-fungsi di atas
function init() {
  const formElements = document.querySelectorAll('input, select');
  formElements.forEach((element) => {
    element.addEventListener('change', updateFormData);
  });
  enableSubmitButton();
  sendFormDataToMidtrans();
}

// Mengaktifkan fungsi init
init();

// Membuat fungsi untuk mengaktifkan tombol next
function enableNextButton() {
  const nextButtons = document.querySelectorAll('.btn-next');
  
  nextButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Find the current visible form section
      const currentStep = button.closest('.form-section');
      const currentStepNumber = parseInt(currentStep.getAttribute('data-step'));

      // Find the next step by its data-step attribute
      const nextStep = document.querySelector(`.form-section[data-step="${currentStepNumber + 1}"]`);

      if (nextStep) {
        currentStep.classList.add('hidden');  // Hide the current step
        nextStep.classList.remove('hidden');  // Show the next step
      }
    });
  });
}

// Membuat fungsi untuk mengaktifkan tombol prev
function enablePrevButton() {
  const prevButtons = document.querySelectorAll('.btn-prev');
  
  prevButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Find the current visible form section
      const currentStep = button.closest('.form-section');
      const currentStepNumber = parseInt(currentStep.getAttribute('data-step'));

      // Find the previous step by its data-step attribute
      const prevStep = document.querySelector(`.form-section[data-step="${currentStepNumber - 1}"]`);

      if (prevStep) {
        currentStep.classList.add('hidden');  // Hide the current step
        prevStep.classList.remove('hidden');  // Show the previous step
      }
    });
  });
}

// Membuat fungsi untuk mengaktifkan tombol next dan prev
function init() {
  enableNextButton();
  enablePrevButton();
}

// Mengaktifkan fungsi init
init();

formFields.forEach(field => {
  field.addEventListener('input', checkFormFields);
});

function checkFormFields() {
  const allFieldsFilled = Array.from(formFields).every(field => field.value !== '');
  nextButton.disabled = !allFieldsFilled;
}

const visitPurposeSelect = document.getElementById('visit-purpose');
const visaSelect = document.getElementById('category');
const serviceSelect = document.getElementById('service');

visitPurposeSelect.addEventListener('change', () => {
  const visitPurpose = visitPurposeSelect.value;
  const visaOptions = visaSelect.options;

  // Hapus semua opsi visa yang tidak relevan
  for (let i = visaOptions.length - 1; i >= 0; i--) {
    if (visaOptions[i].getAttribute('data-visit-purpose') !== visitPurpose) {
      visaOptions[i].remove();
    }
  }

  // Tambahkan opsi visa yang relevan
  const visaOptionsToAdd = [];
  switch (visitPurpose) {
    case 'Business':
      visaOptionsToAdd.push({
        value: 'D2-BUSINESS MULTIPLE ENTRY VISIT VISA',
        text: 'D2-BUSINESS MULTIPLE ENTRY VISIT VISA',
        'data-visit-purpose': 'Business'
      });
      visaOptionsToAdd.push({
        value: 'C2-BUSINESS SINGLE ENTRY VISIT VISA',
        text: 'C2-BUSINESS SINGLE ENTRY VISIT VISA',
        'data-visit-purpose': 'Business'
      });
      visaOptionsToAdd.push({
        value: 'B2-BUSNIESS VISA ON ARRIVAL',
        text: 'B2-BUSNIESS VISA ON ARRIVAL', 
        'data-visit-purpose': 'Business'
      });
      break;
    case 'Internship':
      visaOptionsToAdd.push({
        value: 'C22A-ACADEMIC INTERNSHIP SINGLE ENTRY VISIT VISA',
        text: 'C22A-ACADEMIC INTERNSHIP SINGLE ENTRY VISIT VISA',
        'data-visit-purpose': 'Internship'
      });
      visaOptionsToAdd.push({
        value: 'C22B-COMPANY INTERNSHIP SINGLE ENTRY VISIT VISA',
        text: 'C22B-COMPANY INTERNSHIP SINGLE ENTRY VISIT VISA',
        'data-visit-purpose': 'Internship'
      });
      break;
    case 'Investment':
      visaOptionsToAdd.push({
        value: 'D12-PRE-INVESTMENT MULTIPLE ENTRY VISIT VISA',
        text: 'D12-PRE-INVESTMENT MULTIPLE ENTRY VISIT VISA',
        'data-visit-purpose': 'Investment'
      });
      visaOptionsToAdd.push({
        value: 'C12-PRE-INVESTMENT SINGLE ENTRY VISIT VISA',
        text: 'C12-PRE-INVESTMENT SINGLE ENTRY VISIT VISA',
        'data-visit-purpose': 'Investment'
      });
      break;
    case 'Social':
      visaOptionsToAdd.push({
        value: 'C6B-VOLUNTEER SINGLE ENTRY VISIT VISA',
        text: 'C6B-VOLUNTEER SINGLE ENTRY VISIT VISA',
        'data-visit-purpose': 'Social'
      });
      break;
    case 'Tourism':
      visaOptionsToAdd.push({
        value: 'D1-TOURIST MULTIPLE ENTRI VISIT VISA',
        text: 'D1-TOURIST MULTIPLE ENTRI VISIT VISA',
        'data-visit-purpose': 'Tourism'
      });
      visaOptionsToAdd.push({
        value: 'C1-TOURIST SINGLE ENTRY VISIT VISA',
        text: 'C1-TOURIST SINGLE ENTRY VISIT VISA',
        'data-visit-purpose': 'Tourism'
      });
      visaOptionsToAdd.push({
        value: 'B1-TOURIST VISA ON ARRIVAL',
        text: 'B1-TOURIST VISA ON ARRIVAL',
        'data-visit-purpose': 'Tourism'
      });
      break;
  }

  visaOptionsToAdd.forEach(option => {
    const newOption = document.createElement('option');
    newOption.value = option.value;
    newOption.text = option.text;
    newOption.setAttribute('data-visit-purpose', option['data-visit-purpose']);
    visaSelect.add(newOption);
  });
});

visaSelect.addEventListener('change', () => {
  const visa = visaSelect.value;
  const serviceOptions = serviceSelect.options;

  // Remove all irrelevant service options
  for (let i = serviceOptions.length - 1; i >= 0; i--) {
    if (serviceOptions[i].getAttribute('data-position') !== visa) {
      serviceOptions[i].remove();
    }
  }

  // Add relevant service options
  const serviceOptionsToAdd = [];
  switch (visa) {
    case 'D2-BUSINESS MULTIPLE ENTRY VISIT VISA':
      serviceOptionsToAdd.push({
        value: 'RD21-REGULER BUSINESS|MULTIPLE ENTRY 1 YEAR|IDR 4,500,000|Est. USD 307|14 Working day(s)',
        text: 'RD21-REGULER BUSINESS|MULTIPLE ENTRY 1 YEAR|IDR 4,500,000|Est. USD 307|14 Working day(s)',
        'data-position': 'D2-BUSINESS MULTIPLE ENTRY VISIT VISA'
      });
      serviceOptionsToAdd.push({
        value: 'RD22-EXPRESS BUSINESS|MULTIPLE ENTRY 1 YEAR|IDR 6,000,000|Est. USD 420|7 Working day(s)',
        text: 'RD22-EXPRESS BUSINESS|MULTIPLE ENTRY 1 YEAR|IDR 6,000,000|Est. USD 420|7 Working day(s)',
        'data-position': 'D2-BUSINESS MULTIPLE ENTRY VISIT VISA'
      });
      // Add more service options for D2-BUSINESS MULTIPLE ENTRY VISIT VISA
      break;
    case 'C2-BUSINESS SINGLE ENTRY VISIT VISA':
      serviceOptionsToAdd.push({
        value: 'RC21-REGULER BUSINESS|SINGLE ENTRY|IDR 2,000,000|Est. USD 140|14 Working day(s)',
        text: 'RC21-REGULER BUSINESS|SINGLE ENTRY|IDR 2,000,000|Est. USD 140|14 Working day(s)',
        'data-position': 'C2-BUSINESS SINGLE ENTRY VISIT VISA'
      });
      serviceOptionsToAdd.push({
        value: 'RC22-EXPRESS BUSINESS|SINGLE ENTRY|IDR 3,000,000|Est. USD 210|7 Working day(s)',
        text: 'RC22-EXPRESS BUSINESS|SINGLE ENTRY|IDR 3,000,000|Est. USD 210|7 Working day(s)',
        'data-position': 'C2-BUSINESS SINGLE ENTRY VISIT VISA'
      });
      // Add more service options for C2-BUSINESS SINGLE ENTRY VISIT VISA
      break;
    case 'C22A-ACADEMIC INTERNSHIP SINGLE ENTRY VISIT VISA':
      serviceOptionsToAdd.push({
        value: 'RI21-REGULER INTERNSHIP|SINGLE ENTRY|IDR 1,500,000|Est. USD 105|14 Working day(s)',
        text: 'RI21-REGULER INTERNSHIP|SINGLE ENTRY|IDR 1,500,000|Est. USD 105|14 Working day(s)',
        'data-position': 'C22A-ACADEMIC INTERNSHIP SINGLE ENTRY VISIT VISA'
      });
      serviceOptionsToAdd.push({
        value: 'RI22-EXPRESS INTERNSHIP|SINGLE ENTRY|IDR 2,500,000|Est. USD 175|7 Working day(s)',
        text: 'RI22-EXPRESS INTERNSHIP|SINGLE ENTRY|IDR 2,500,000|Est. USD 175|7 Working day(s)',
        'data-position': 'C22A-ACADEMIC INTERNSHIP SINGLE ENTRY VISIT VISA'
      });
      // Add more service options for C22A-ACADEMIC INTERNSHIP SINGLE ENTRY VISIT VISA
      break;
    case 'C12-PRE-INVESTMENT SINGLE ENTRY VISIT VISA':
      serviceOptionsToAdd.push({
        value: 'RI21-REGULER INVESTMENT|SINGLE ENTRY|IDR 2,000,000|Est. USD 140|14 Working day(s)',
        text: 'RI21-REGULER INVESTMENT|SINGLE ENTRY|IDR 2,000,000|Est. USD 140|14 Working day(s)',
        'data-position': 'C12-PRE-INVESTMENT SINGLE ENTRY VISIT VISA'
      });
      serviceOptionsToAdd.push({
        value: 'RI22-EXPRESS INVESTMENT|SINGLE ENTRY|IDR 3,500,000|Est. USD 245|7 Working day(s)',
        text: 'RI22-EXPRESS INVESTMENT|SINGLE ENTRY|IDR 3,500,000|Est. USD 245|7 Working day(s)',
        'data-position': 'C12-PRE-INVESTMENT SINGLE ENTRY VISIT VISA'
      });
      // Add more service options for C12-PRE-INVESTMENT SINGLE ENTRY VISIT VISA
      break;
    case 'D12-PRE-INVESTMENT MULTIPLE ENTRY VISIT VISA':
      serviceOptionsToAdd.push({
        value: 'RD21-REGULER INVESTMENT|MULTIPLE ENTRY 1 YEAR|IDR 4,500,000|Est. USD 307|14 Working day(s)',
        text: 'RD21-REGULER INVESTMENT|MULTIPLE ENTRY 1 YEAR|IDR 4,500,000|Est. USD 307|14 Working day(s)',
        'data-position': 'D12-PRE-INVESTMENT MULTIPLE ENTRY VISIT VISA'
      });
      serviceOptionsToAdd.push({
        value: 'RD22-EXPRESS INVESTMENT|MULTIPLE ENTRY 1 YEAR|IDR 6,500,000|Est. USD 420|7 Working day(s)',
        text: 'RD22-EXPRESS INVESTMENT|MULTIPLE ENTRY 1 YEAR|IDR 6,500,000|Est. USD 420|7 Working day(s)',
        'data-position': 'D12-PRE-INVESTMENT MULTIPLE ENTRY VISIT VISA'
      });
      // Add more service options for D12-PRE-INVESTMENT MULTIPLE ENTRY VISIT VISA
      break;
    case 'C6B-VOLUNTEER SINGLE ENTRY VISIT VISA':
      serviceOptionsToAdd.push({
        value: 'RV21-REGULER VOLUNTEER|SINGLE ENTRY|IDR 1,000,000|Est. USD 70|14 Working day(s)',
        text: 'RV21-REGULER VOLUNTEER|SINGLE ENTRY|IDR 1,000,000|Est. USD 70|14 Working day(s)',
        'data-position': 'C6B-VOLUNTEER SINGLE ENTRY VISIT VISA'
      });
  }

  serviceOptionsToAdd.forEach(option => {
    const newOption = document.createElement('option');
    newOption.value = option.value;
    newOption.text = option.text;
    newOption.setAttribute('data-position', option['data-position']);
    serviceSelect.add(newOption);
  });
});

document.getElementById('position').addEventListener('change', (e) => {
  const visa = e.target.value;
  updateServiceOptions(visa);
});

// Ambil semua elemen form
const formElements = document.querySelectorAll('form input, form select, form textarea');

// Buat fungsi untuk mengumpulkan data dari form
function collectFormData() {
  const formData = {};
  formElements.forEach((element) => {
    if (element.name) {
      formData[element.name] = element.value;
    }
  });
  return formData;
}

// Buat fungsi untuk menampilkan review submission
function displayReviewSubmission(formData) {
  const reviewSubmission = document.querySelector('.form-section[data-step="3"]');
  const tableBody = reviewSubmission.querySelector('tbody');

  // Buat baris baru untuk menampilkan data
  const row = document.createElement('tr');

  // Tambahkan kolom untuk menampilkan data
  const columns = [
    'document-visit-purpose',
    'document-visa',
    'document-service',
    'document-total-person',
    'document-referral',
    'client-fullname',
    'client-email',
    'client-phone',
    'client-address',
    'client-city',
    'client-state',
    'client-zip',
    'client-country',
    'client-accomodation-name',
    'client-accomodation-address',
    'client-emergency-fullname',
    'client-emergency-relationship',
    'client-emergency-address',
    'client-emergency-country',
    'client-emergency-email',
    'client-emergency-phone',
    'client-travel-document',
    'client-document-number',
  ];

  columns.forEach((column) => {
    const cell = document.createElement('td');
    cell.innerHTML = formData[column];
    row.appendChild(cell);
  });

  // Tambahkan baris ke tabel
  tableBody.appendChild(row);

  // Tampilkan review submission
  reviewSubmission.classList.remove('hidden');
}

// Tambahkan event listener untuk mengumpulkan data dan menampilkan review submission
document.getElementById('submit-btn').addEventListener('click', (e) => {
  e.preventDefault();
  const formData = collectFormData();
  displayReviewSubmission(formData);
});

// Get the next and previous buttons
const nextButtons = document.querySelectorAll('.btn-next');
const prevButtons = document.querySelectorAll('.btn-prev');

// Add event listeners to the next and previous buttons
nextButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    // Hide the current form section
    formSections[index].classList.add('hidden');

    // Show the next form section
    formSections[index + 1].classList.remove('hidden');
  });
});

prevButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    // Hide the current form section
    formSections[index + 1].classList.add('hidden');

    // Show the previous form section
    formSections[index].classList.remove('hidden');
  });
});

// Tambahkan event listener untuk mengumpulkan data dan menampilkan review submission
document.getElementById('submit-btn').addEventListener('click', (e) => {
  e.preventDefault();
  const formData = collectFormData();
  displayReviewSubmission(formData);
});

// Get all form sections
const formSections = document.querySelectorAll('.form-section'); 

// Add event listeners to the next and previous buttons
nextButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    // Hide the current form section
    formSections[index].classList.add('hidden');

    // Show the next form section
    formSections[index + 1].classList.remove('hidden');
  });
});

prevButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    // Hide the current form section
    formSections[index + 1].classList.add('hidden');

    // Show the previous form section
    formSections[index].classList.remove('hidden');
  });
});

// Update the displayReviewSubmission function
function displayReviewSubmission(formData) {
  const dashboardData = document.getElementById('dashboard-data');
  const row = document.createElement('tr');

  // Create table cells for each form field
  Object.keys(formData).forEach((key) => {
    const cell = document.createElement('td');
    cell.textContent = formData[key];
    row.appendChild(cell);
  });

  dashboardData.appendChild(row);
}

// Call the displayReviewSubmission function on form submission
document.getElementById('submit-btn').addEventListener('click', (e) => {
  e.preventDefault();
  const formData = collectFormData();
  displayReviewSubmission(formData);
});

const eventSource = new EventSource('/events');

eventSource.onmessage = (event) => {
  if (event.data.type === 'newSubmission') {
    const submission = event.data.data;
    const listItem = document.createElement('li');
    listItem.textContent = `New submission: ${submission.name} - ${submission.email}`;
    document.getElementById('dashboard-data').appendChild(listItem);
  }
};

fetch('/dashboard')
  .then(response => response.json())
  .then(data => {
    data.forEach((submission) => {
      const listItem = document.createElement('li');
      listItem.textContent = `Submission: ${submission.name} - ${submission.email}`;
      document.getElementById('dashboard-data').appendChild(listItem);
    });
  });

// Fetch customer data using fetch API
fetch('https://api.cbaservices.id/customers')  // Updated URL
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

// Fetch customer data using XMLHttpRequest
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.cbaservices.id/customers', true);  // Updated URL
xhr.onload = function() {
  if (xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    console.log(data);
  } else {
    console.error(xhr.statusText);
  }
};
xhr.send();

// Fetch customer data using async/await
async function fetchData() {
  try {
    const response = await fetch('https://api.cbaservices.id/customers');  // Updated URL
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

fetchData();

// Post customer data using fetch API
fetch('https://api.cbaservices.id/customers', {  // Updated URL
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    key: 'value'
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));              

async function fetchData() {
  try {
    const response = await fetch('https://api.cbaservices.id/product');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function initializeDropdowns() {
  const data = await fetchData();
  const visitPurposeSelect = document.getElementById('category');
  const visaSelect = document.getElementById('productName');
  const serviceSelect = document.getElementById('service');

  if (!data) return;

  // Populate Visit Purpose dropdown
  Object.keys(data).forEach(purpose => {
    const option = document.createElement('option');
    option.value = purpose;
    option.textContent = purpose;
    visitPurposeSelect.appendChild(option);
  });

  // Event listener for Visit Purpose change
  visitPurposeSelect.addEventListener('change', function () {
    const selectedPurpose = this.value;

    // Clear and populate Visa options
    visaSelect.innerHTML = '<option value="">Select Visa</option>';
    if (selectedPurpose && data[selectedPurpose]) {
      data[selectedPurpose].visas.forEach(visa => {
        const option = document.createElement('option');
        option.value = visa;
        option.textContent = visa;
        visaSelect.appendChild(option);
      });
      visaSelect.disabled = false;
    } else {
      visaSelect.disabled = true;
      serviceSelect.disabled = true;
    }

    // Clear Service options
    serviceSelect.innerHTML = '<option value="">Select Service</option>';
    serviceSelect.disabled = true;
  });

  // Event listener for Visa change
  visaSelect.addEventListener('change', function () {
    const selectedPurpose = visitPurposeSelect.value;
    const selectedVisa = this.value;

    // Clear and populate Service options
    serviceSelect.innerHTML = '<option value="">Select Service</option>';
    if (selectedPurpose && selectedVisa && data[selectedPurpose] && data[selectedPurpose].services[selectedVisa]) {
      data[selectedPurpose].services[selectedVisa].forEach(service => {
        const option = document.createElement('option');
        option.value = service;
        option.textContent = service;
        serviceSelect.appendChild(option);
      });
      serviceSelect.disabled = false;
    } else {
      serviceSelect.disabled = true;
    }
  });
}

// Initialize dropdowns on page load
window.onload = initializeDropdowns;

// Get data from submission.html
const data = JSON.parse(localStorage.getItem('formData'));

// Populate dashboard table with data
const tableBody = document.getElementById('dashboard-data');
Object.keys(data).forEach((key) => {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${key}</td>
    <td>${data[key]}</td>
  `;
  tableBody.appendChild(row);
});

const agreementCheckbox = document.getElementById('agreement');
const submitBtn = document.getElementById('submit-btn');

agreementCheckbox.addEventListener('change', () => {
  if (agreementCheckbox.checked) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
});

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const token = 'b5b40610-fd63-427d-88e8-2a4ae1cb0957'; // Replace with your Midtrans token
  payWithMidtrans(token);
});

function payWithMidtrans(token) {
  window.snap.pay(token, {
    onSuccess: function (result) {
      alert("payment success!");
      console.log(result);
    },
    onPending: function (result) {
      alert("waiting your payment!")
      console.log(result);
    },
    onError: function (result) {
      alert("payment failed!")
      console.log(result);
    },
    onClose: function () {
      alert('you closed the popup without finishing the payment');
    }
  })
}

const totalSteps = 4;
let currentStep = 1;

function moveToNextStep(step) {
  currentStep = step;
  updateProgressBar();
  updateSteps();
}

function updateProgressBar() {
  const progress = document.getElementById('progress');
  const progressWidth = (currentStep - 1) / (totalSteps - 1) * 100;
  progress.style.width = progressWidth + '%';
}

function updateSteps() {
  const buttons = document.querySelectorAll('.step-btn');
  buttons.forEach((button, index) => {
    if (index < currentStep - 1) {
      button.classList.add('completed');
      button.classList.remove('active');
    } else if (index === currentStep - 1) {
      button.classList.add('active');
      button.classList.remove('completed');
    } else {
      button.classList.remove('active', 'completed');
    }
  });
}

// Initialize the first step
updateProgressBar();
updateSteps();

document.addEventListener('DOMContentLoaded', function () {
  const totalPersonSelect = document.getElementById('totalPerson');
  const clientFormsContainer = document.getElementById('client-forms-container');

  totalPersonSelect.addEventListener('change', function () {
    const numberOfPersons = parseInt(this.value, 10);
    clientFormsContainer.innerHTML = ''; // Clear existing forms

    for (let i = 0; i < numberOfPersons; i++) {
      const formSection = document.createElement('div');
      formSection.className = 'form-section';
      formSection.innerHTML = `
        <h3>Client ${i + 1}</h3>
        <table>
          <tr>
            <td>
              <div class="input-group">
                <label for="fullname-${i}">Fullname</label>
                <input type="text" name="fullName-${i}" id="fullName-${i}" />
              </div>
            </td>
            <td>
              <div class="input-group">
                <label for="mothername-${i}">Mother Name</label>
                <input type="text" name="motherName-${i}" id="motherName-${i}" />
              </div>
            </td>
            <td>
              <div class="input-group">
                <label for="nationality-${i}">Nationality</label>
                <input type="text" name="nationality-${i}" id="nationality-${i}" />
              </div>
            </td>
            <td>
              <div class="input-group">
                <label for="email-${i}">Email</label>
                <input type="email" name="email-${i}" id="email-${i}" />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="input-group">
                <label for="phone-${i}">Whatsapp / Phone Number</label>
                <input type="text" name="phone-${i}" id="phoneNumber-${i}" />
              </div>
            </td>
            <td>
              <div class="input-group">
                <label for="address-${i}">Street Address</label>
                <input type="text" name="address-${i}" id="originalAddress-${i}" />
              </div>
            </td>
            <td>
              <div class="input-group">
                <label for="city-${i}">City</label>
                <input type="text" name="originalCity-${i}" id="originalCity-${i}" />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="form-group">
                <label for="country-${i}">Select Country:</label>
                <select name="countryId-${i}" id="countryId-${i}" required>
                  <option value="">Select Country</option>
                  <!-- Countries will be dynamically added here -->
                </select>
              </div>

              <div class="form-group">
                <label for="province-${i}">Province</label>
                <input type="text" name="originalProvince-${i}" id="originalProvince-${i}" />
              </div>

              <div class="input-group">
                <label for="zip-${i}">ZIP / Postal Code</label>
                <input type="text" name="zip-${i}" id="zipCode-${i}" />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="input-group">
                <label for="indonesiaAccomodationName-${i}">Accomodation Name ( Hotel, Villa, etc.)</label>
                <input type="text" name="accomodation-name-${i}" id="indonesiaAccomodationName-${i}" />
              </div>
            </td>
            <td>
              <div class="input-group">
                <label for="indonesiaAddress-${i}">Address</label>
                <input type="text" name="indonesiaAddress-${i}" id="indonesiaAddress-${i}" />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="input-group">
                <label for="emergencyContactFullname-${i}">Fullname Emergency</label>
                <input type="text" name="emergency-fullname-${i}" id="emergencyContactFullName-${i}" />
              </div>
            </td>
            <td>
              <div class="input-group">
                <label for="emergencyContactRelation-${i}">Relationship</label>
                <select name="emergencyContactRelation-${i}" id="emergencyContactRelation-${i}">
                  <option value="">Select Relationship</option>
                  <option value="Parents">Parents</option>
                  <option value="Grandparents">Grandparents</option>
                  <option value="Brother/Sister">Brother/Sister</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="input-group">
                <label for="emergency-address-${i}">Address</label>
                <input type="text" name="emergencyContactAddress-${i}" id="emergencyContactAddress-${i}" />
              </div>
            </td>
            <td>
              <div class="input-group">
                <label for="emergency-country-${i}">Country</label>
                <select name="emergencyContactCountryId-${i}" id="emergencyContactCountryId-${i}">
                  <option value="">Select a country</option>
                </select>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="input-group">
                <label for="emergency-${i}">Email</label>
                <input type="text" name="emergencyContactEmail-${i}" id="emergencyContactEmail-${i}" />
              </div>
            </td>
            <td>
              <div class="input-group">
                <label for="emergency-phone-${i}">Mobile Phone Number</label>
                <input type="integer" name="emergencyContactMobilePhone-${i}" id="emergencyContactMobilePhone-${i}" />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="input-group">
                <label for="travel-document-${i}">Select Travel Document</label>
                <select name="travelDocument-${i}" id="travelDocument-${i}">
                  <option value="">Select Travel Document</option>
                  <option value="Passport">Passport</option>
                </select>
              </div>
            </td>
            <td>
              <div class="input-group">
                <label for="document-number-${i}">Document Number</label>
                <input type="text" name="documentNumber-${i}" id="documentNumber-${i}" />
              </div>
            </td>
          </tr>
        </table>
      `;
      clientFormsContainer.appendChild(formSection);
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const visitPurposeSelect = document.getElementById('category');
  const visaSelect = document.getElementById('productName');
  const serviceSelect = document.getElementById('service');
  const totalPersonSelect = document.getElementById('totalPerson');
  const clientFormsContainer = document.getElementById('client-forms-container');

  // Structured data object for mapping purposes
  const products = {
    'Business': {
      visas: [
        'D2-BUSINESS MULTIPLE ENTRY VISIT VISA',
        'C2-BUSINESS SINGLE ENTRY VISIT VISA',
        'B2-BUSNIESS VISA ON ARRIVAL'
      ],
      services: {
        'D2-BUSINESS MULTIPLE ENTRY VISIT VISA': [
          'RD21-REGULER BUSINESS|MULTIPLE ENTRY 1 YEAR|IDR 4,500,000|Est. USD 307|14 Working day(s)',
          'ED21-PRIORITY BUSINESS|MULTIPLE ENTRY 1 YEAR|IDR 6,500,000|Est. USD 444|5 Working day(s)',
          'RD22-REGULER BUSINESS|MULTIPLE ENTRY 2 YEAR|IDR 8,000,000|Est. USD 546|14 Working day(s)',
          'ED22-PRIORITY BUSINESS|MULTIPLE ENTRY 2 YEAR|IDR 10,000,000|Est. USD 683|5 Working day(s)'
        ],
        'C2-BUSINESS SINGLE ENTRY VISIT VISA': [
          'RC2-REGULER BUSINESS|SINGLE ENTRY VISA|IDR  3,000,000|Est. USD 205|14 working day(s)',
          'EC2-PRIORITY BUSINESS|SINGLE ENTRY VISA|IDR 4,900,000|Est. USD 335|5 working day(s)'
        ],
        'B2-BUSNIESS VISA ON ARRIVAL': [
          'B2-BUSINESS (Visa On Arrival)|IDR 700,000|Est. USD 48|1 working day(s)'
        ]
      }
    },
    'Internship': {
      visas: [
        'C22A-ACADEMIC INTERNSHIP SINGLE ENTRY VISIT VISA',
        'C22B-COMPANY INTERNSHIP SINGLE ENTRY VISIT VISA'
      ],
      services: {
        'C22A-ACADEMIC INTERNSHIP SINGLE ENTRY VISIT VISA': [
          'RC22A-REGULER ACADEMIC INTERNSHIP|SINGLE ENTRY VISA|IDR 8,500,000|Est. USD 580|14 working day(s)'
        ],
        'C22B-COMPANY INTERNSHIP SINGLE ENTRY VISIT VISA': [
          'RC22B-REGULER COMPANY INTERNSHIP|SINGLE ENTRY VISA|IDR 8,500,000|Est. USD 580|14 working day(s)'
        ]
      }
    },
    'Investment': {
      visas: [
        'D12-PRE-INVESTMENT MULTIPLE ENTRY VISIT VISA',
        'C12-PRE-INVESTMENT SINGLE ENTRY VISIT VISA'
      ],
      services: {
        'D12-PRE-INVESTMENT MULTIPLE ENTRY VISIT VISA': [
          'RD12-REGULER INVESTMENT|MULTIPLE ENTRY 1 YEAR|IDR 10,000,000|Est. USD 683|14 working day(s)'
        ],
        'C12-PRE-INVESTMENT SINGLE ENTRY VISIT VISA': [
          'EC12-REGULER INVESTMENT|SINGLE ENTRY 1 YEAR|IDR 7,000,000|Est. USD 478|14 working day(s)'
        ]
      }
    },
    'Social': {
      visas: [
        'C6B-VOLUNTEER SINGLE ENTRY VISIT VISA'
      ],
      services: {
        'C6B-VOLUNTEER SINGLE ENTRY VISIT VISA': [
          'RC6B-REGULER SOCIAL|SINGLE ENTRY VISA|IDR 5,000,000|Est. USD 341|14 working day(s)'
        ]
      }
    },
    'Tourism': {
      visas: [
        'D1-TOURIST MULTIPLE ENTRY VISIT VISA',
        'C1-TOURIST SINGLE ENTRY VISIT VISA',
        'B1-TOURIST VISA ON ARRIVAL'
      ],
      services: {
        'D1-TOURIST MULTIPLE ENTRY VISIT VISA': [
                          'RD11-MULTIPLE ENTRY TOURIST VISA|REGULER 1 YEAR|IDR 6,000,000|Est. USD 410|14 working day(s)',
                          'ED11-PRIORITY TOURIST VISA|MULTIPLE ENTRY 1 YEAR|IDR 8,000,000|Est. USD 546|5 working day(s)'
                      ],
                      'C1-TOURIST SINGLE ENTRY VISIT VISA': [
                          'RC1-REGULER TOURIST|SINGLE ENTRY VISA|IDR 3,500,000|Est. USD 240|14 working day(s)',
                          'EC1-PRIORITY TOURIST|SINGLE ENTRY VISA|IDR 5,000,000|Est. USD 341|5 working day(s)'
                      ],
                      'B1-TOURIST VISA ON ARRIVAL': [
                          'B1-TOURIST (Visa On Arrival)|IDR 500,000|Est. USD 34|1 working day(s)'
                      ]
                  }
              }
          };

          // Event listener for Visit Purpose change
          visitPurposeSelect.addEventListener('change', function () {
              const selectedPurpose = this.value;
              
              // Clear and populate Visa options
              visaSelect.innerHTML = '<option value="">Select Visa</option>';
              if (selectedPurpose && products[selectedPurpose]) {
                  products[selectedPurpose].visas.forEach(visa => {
                      const option = document.createElement('option');
                      option.value = visa;
                      option.textContent = visa;
                      visaSelect.appendChild(option);
                  });
              }

              // Clear Service options
              serviceSelect.innerHTML = '<option value="">Select Service</option>';
          });

          // Event listener for Visa change
          visaSelect.addEventListener('change', function () {
              const selectedPurpose = visitPurposeSelect.value;
              const selectedVisa = this.value;

              // Clear and populate Service options
              serviceSelect.innerHTML = '<option value="">Select Service</option>';
              if (selectedPurpose && selectedVisa && products[selectedPurpose] && products[selectedPurpose].services[selectedVisa]) {
                  products[selectedPurpose].services[selectedVisa].forEach(service => {
                      const option = document.createElement('option');
                      option.value = service;
                      option.textContent = service;
                      serviceSelect.appendChild(option);
                  });
              }
          });

          // Function to generate client form fields based on the total person selection
          function generateClientFormFields(totalPerson) {
              clientFormsContainer.innerHTML = '';

              for (let i = 0; i < totalPerson; i++) {
                  const formSection = document.createElement('div');
                  formSection.className = 'form-section';
                  formSection.innerHTML = `
                      <h3>Client ${i + 1}</h3>
                      <table>
                          <tr>
                              <td>
                                  <div class="input-group">
                                      <label for="fullName-${i}">Fullname</label>
                                      <input type="text" name="fullName-${i}" id="fullName-${i}" />
                                  </div>
                              </td>
                              <!-- Add more input fields here -->
                          </tr>
                      </table>
                  `;

                  clientFormsContainer.appendChild(formSection);
              }
          }

          totalPersonSelect.addEventListener('change', function () {
              const totalPerson = parseInt(this.value, 10);
              generateClientFormFields(totalPerson);
          });
        });
        
        const totalPersons = 3; // replace with the actual total number of persons
          const clientTable = document.getElementById('totalPerson');
          const btnSaveData = document.getElementById('btn-save-data');
          const btnNextClient = document.getElementById('btn-next-client');

          // function to generate a single row for the client table
          function generateClientRow(index) {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>
                <div class="input-group">
                  <label for="fullname-${index}">Fullname</label>
                  <input type="string" name="fullName[]" id="fullName-${index}" />
                </div>
              </td>
              <td>
                <div class="input-group">
                  <label for="mothername-${index}">Mother Name</label>
                  <input type="string" name="motherName[]" id="motherName-${index}" />
                </div>
              </td>
            `;
            return row;
          }

          // generate the client table rows
          for (let i = 0; i < totalPersons; i++) {
            clientTable.appendChild(generateClientRow(i));
          }

          // add event listener to the "Next" button
          btnNextClient.addEventListener('click', (e) => {
            e.preventDefault();
            if (totalPersons > 1) {
              // save the first client form data
              const formData = new FormData();
              formData.append('fullName', document.getElementById('fullName-0').value);
              formData.append('motherName', document.getElementById('motherName-0').value);
              // send the form data to the server or process it locally
              console.log('Saving first client form data:', formData);

              // reset the client form
              clientTable.innerHTML = '';
              for (let i = 0; i < totalPersons; i++) {
                clientTable.appendChild(generateClientRow(i));
              }
            } else {
              // validate the form data here, if necessary
              // then, proceed to the next step
              alert('Form data submitted successfully!');
            }
          });

          // add event listener to the "Save Data" button
          btnSaveData.addEventListener('click', (e) => {
            e.preventDefault();
            const formData = new FormData();
            for (let i = 0; i < totalPersons; i++) {
              formData.append(`fullName[${i}]`, document.getElementById(`fullName-${i}`).value);
              formData.append(`motherName[${i}]`, document.getElementById(`motherName-${i}`).value);
            }
            // send the form data to the server or process it locally
            console.log('Saving all client form data:', formData);
          });

          // show the "Save Data" button only if total persons is more than 1
          if (totalPersons > 1) {
            btnSaveData.style.display = 'block';
          } else {
            btnSaveData.style.display = 'none';
          }

          // add event listener to the "Save Data" button
          document.getElementById('btn-save-data').addEventListener('click', (e) => {
            e.preventDefault();
            const formData = new FormData();
            for (let i = 0; i < totalPersons; i++) {
              formData.append(`fullName[${i}]`, document.getElementById(`fullName-${i}`).value);
              formData.append(`motherName[${i}]`, document.getElementById(`motherName-${i}`).value);
              formData.append(`nationality[${i}]`, document.getElementById(`nationality-${i}`).value);
              formData.append(`email[${i}]`, document.getElementById(`email-${i}`).value);
              formData.append(`phoneNumber[${i}]`, document.getElementById(`phoneNumber-${i}`).value);
              formData.append(`originalAddress[${i}]`, document.getElementById(`originalAddress-${i}`).value);
              formData.append(`originalCity[${i}]`, document.getElementById(`originalCity-${i}`).value);
              formData.append(`originalProvince[${i}]`, document.getElementById(`originalProvince-${i}`).value);
              formData.append(`zipCode[${i}]`, document.getElementById(`zipCode-${i}`).value);
              formData.append(`countryId[${i}]`, document.getElementById(`countryId-${i}`).value);
              formData.append(`indonesiaAccomodationName[${i}]`, document.getElementById(`indonesiaAccomodationName-${i}`).value);
              formData.append(`indonesiaAddress[${i}]`, document.getElementById(`indonesiaAddress-${i}`).value);
              formData.append(`emergencyContactFullName[${i}]`, document.getElementById(`emergencyContactFullName-${i}`).value);
              formData.append(`emergencyContactRelation[${i}]`, document.getElementById(`emergencyContactRelation-${i}`).value);
              formData.append(`emergencyContactAddress[${i}]`, document.getElementById(`emergencyContactAddress-${i}`).value);
              formData.append(`emergencyContactCountryId[${i}]`, document.getElementById(`emergencyContactCountryId-${i}`).value);
              formData.append(`emergencyContactEmail[${i}]`, document.getElementById(`emergencyContactEmail-${i}`).value);
              formData.append(`emergencyContactMobilePhone[${i}]`, document.getElementById(`emergencyContactMobilePhone-${i}`).value);
              formData.append(`travelDocument[${i}]`, document.getElementById(`travelDocument-${i}`).value);
              formData.append(`documentNumber[${i}]`, document.getElementById(`documentNumber-${i}`).value);
            }
            // send the form data to the server or process it locally
            console.log('Saving all client form data:', formData);
          });

        // tambahkan event listener pada button save
            document.getElementById('btn-save-data').addEventListener('click', function() {
              // cek jika semua field telah terisi
              if (validateForm()) {
                // tampilkan notifikasi
                alert('Data telah disimpan!');
                // reset form client
                resetForm();
                // cek jika total person lebih dari 1
                if (totalPersons > 1) {
                  // tampilkan notifikasi untuk mengisi kembali
                  alert('Silakan isi kembali form client untuk person selanjutnya!');
                }
                // tampilkan pop up notifikasi
                Swal.fire({
                  title: 'Data Berhasil Disimpan!',
                  text: 'Data Anda telah berhasil disimpan dan akan di review di review submission.',
                  icon: 'success',
                  confirmButtonText: 'OK'
                });
              } else {
                alert('Silakan isi semua field!');
              }
            });

            // fungsi untuk memvalidasi form
            function validateForm() {
              var fullname = document.getElementById('fullName-0').value;
              var mothername = document.getElementById('motherName-0').value;
              // tambahkan validasi untuk field lainnya

              if (fullname !== '' && mothername !== '') {
                // tambahkan kondisi lainnya
                return true;
              } else {
                return false;
              }
            }

            // fungsi untuk reset form client
            function resetForm() {
              document.getElementById('fullName-0').value = '';
              document.getElementById('motherName-0').value = '';
              // tambahkan reset untuk field lainnya
            }

            // tambahkan event listener pada button next
            document.getElementById('btn-next-review').addEventListener('click', function() {
              // cek jika semua field telah terisi
              if (validateForm()) {
                // tampilkan notifikasi
                alert('Data telah disimpan!');
                // reset form client
                resetForm();
                // cek jika total person lebih dari 1
                if (totalPersons > 1) {
                  // tampilkan notifikasi untuk mengisi kembali
                  alert('Silakan isi kembali form client untuk person selanjutnya!');
                }
                // tampilkan pop up notifikasi
                Swal.fire({
                  title: 'Data Berhasil Disimpan!',
                  text: 'Data Anda telah berhasil disimpan dan akan di review di review submission.',
                  icon: 'success',
                  confirmButtonText: 'OK'
                });
              } else {
                alert('Silakan isi semua field!');
              }
            });
            document.getElementById('category').addEventListener('change', function() {
              var visitPurpose = this.value;
              var visaSelect = document.getElementById('productName');
              var serviceSelect = document.getElementById('service');

              visaSelect.innerHTML = '<option value="">Select Visa</option>';
              serviceSelect.innerHTML = '<option value="">Select Service</option>';

              if (visitPurpose === 'Business') {
                  visaSelect.innerHTML += '<option value="D2-BUSINESS MULTIPLE ENTRY VISIT VISA" data-visit-purpose="Business">D2-BUSINESS MULTIPLE ENTRY VISIT VISA</option>';
                  visaSelect.innerHTML += '<option value="C2-BUSINESS SINGLE ENTRY VISIT VISA" data-visit-purpose="Business">C2-BUSINESS SINGLE ENTRY VISIT VISA</option>';
                  visaSelect.innerHTML += '<option value="B2-BUSNIESS VISA ON ARRIVAL" data-visit-purpose="Business">B2-BUSNIESS VISA ON ARRIVAL</option>';
              } else if (visitPurpose === 'Internship') {
                  visaSelect.innerHTML += '<option value="C22A-ACADEMIC INTERNSHIP SINGLE ENTRY VISIT VISA" data-visit-purpose="Internship">C22A-ACADEMIC INTERNSHIP SINGLE ENTRY VISIT VISA</option>';
                  visaSelect.innerHTML += '<option value="C22B-COMPANY INTERNSHIP SINGLE ENTRY VISIT VISA" data-visit-purpose="Internship">C22B-COMPANY INTERNSHIP SINGLE ENTRY VISIT VISA</option>';
              } else if (visitPurpose === 'Investment') {
                  visaSelect.innerHTML += '<option value="D12-PRE-INVESTMENT MULTIPLE ENTRY VISIT VISA" data-visit-purpose="Investment">D12-PRE-INVESTMENT MULTIPLE ENTRY VISIT VISA</option>';
                  visaSelect.innerHTML += '<option value="C12-PRE-INVESTMENT SINGLE ENTRY VISIT VISA" data-visit-purpose="Investment">C12-PRE-INVESTMENT SINGLE ENTRY VISIT VISA</option>';
              } else if (visitPurpose === 'Social') {
                  visaSelect.innerHTML += '<option value="C6B-VOLUNTEER SINGLE ENTRY VISIT VISA" data-visit-purpose="Social">C6B-VOLUNTEER SINGLE ENTRY VISIT VISA</option>';
              } else if (visitPurpose === 'Tourism') {
                  visaSelect.innerHTML += '<option value="D1-TOURIST MULTIPLE ENTRI VISIT VISA" data-visit-purpose="Tourism">D1-TOURIST MULTIPLE ENTRI VISIT VISA</option>';
                  visaSelect.innerHTML += '<option value="C1-TOURIST SINGLE ENTRY VISIT VISA" data-visit-purpose="Tourism">C1-TOURIST SINGLE ENTRY VISIT VISA</option>';
                  visaSelect.innerHTML += '<option value="B1-TOURIST VISA ON ARRIVAL" data-visit-purpose="Tourism">B1-TOURIST VISA ON ARRIVAL</option>';
              }
          });

          document.getElementById('productName').addEventListener('change', function() {
              var visa = this.value;
              var serviceSelect = document.getElementById('service');

              serviceSelect.innerHTML = '<option value="">Select Service</option>';

              if (visa === 'D2-BUSINESS MULTIPLE ENTRY VISIT VISA') {
                  serviceSelect.innerHTML += '<option value="RD21-REGULER BUSINESS|MULTIPLE ENTRY 1 YEAR|IDR 4,500,000|Est. USD 307|14 Working day(s)" data-position="D2-BUSINESS MULTIPLE ENTRY VISIT VISA">RD21-REGULER BUSINESS|MULTIPLE ENTRY 1 YEAR|IDR 4,500,000|Est. USD 307|14 Working day(s)</option>';
                  serviceSelect.innerHTML += '<option value="ED21-PRIORITY BUUSINESS|MULTIPLE ENTRY 1 YEAR|IDR 6,500,000|Est. USD 444|5 Working day(s)" data-position="D2-BUSINESS MULTIPLE ENTRY VISIT VISA">ED21-PRIORITY BUUSINESS|MULTIPLE ENTRY 1 YEAR|IDR 6,500,000|Est. USD 444|5 Working day(s)</option>';
                  serviceSelect.innerHTML += '<option value="RD22-REGULER BUSINESS|MULTIPLE ENTRY 2 YEAR|IDR 8,000,000|Est. USD 546|14 Working day(s)" data-position="D2-BUSINESS MULTIPLE ENTRY VISIT VISA">RD22-REGULER BUSINESS|MULTIPLE ENTRY 2 YEAR|IDR 8,000,000|Est. USD 546|14 Working day(s)</option>';
                  serviceSelect.innerHTML += '<option value="ED22-PRIORITY BUSINESS|MULTIPLE ENTRY 2 YEAR|IDR 10,000,000|Est. USD 683|5 Working day(s)" data-position="D2-BUSINESS MULTIPLE ENTRY VISIT VISA">ED22-PRIORITY BUSINESS|MULTIPLE ENTRY 2 YEAR|IDR 10,000,000|Est. USD 683|5 Working day(s)</option>';
              } else if (visa === 'C2-BUSINESS SINGLE ENTRY VISIT VISA') {
                  serviceSelect.innerHTML += '<option value="RC2-REGULER BUSINESS|SINGLE ENTRY VISA|IDR 3,000,000|Est. USD 205|14 working day(s)" data-position="C2-BUSINESS SINGLE ENTRY VISIT VISA">RC2-REGULER BUSINESS|SINGLE ENTRY VISA|IDR 3,000,000|Est. USD 205|14 working day(s)</option>';
                  serviceSelect.innerHTML += '<option value="EC2-PRIORITY BUSINESS|SINGLE ENTRY VISA|IDR 4,900,000|Est. USD 335|5 working day(s)" data-position="C2-BUSINESS SINGLE ENTRY VISIT VISA">EC2-PRIORITY BUSINESS|SINGLE ENTRY VISA|IDR 4,900,000|Est. USD 335|5 working day(s)</option>';
              } else if (visa === 'B2-BUSNIESS VISA ON ARRIVAL') {
                  serviceSelect.innerHTML += '<option value="B2-BUSINESS (Visa On Arrival)|IDR 700,000|Est. USD 48|1 working day(s)" data-position="B2-BUSNIESS VISA ON ARRIVAL">B2-BUSINESS (Visa On Arrival)|IDR 700,000|Est. USD 48|1 working day(s)</option>';
              } else if (visa === 'C22A-ACADEMIC INTERNSHIP SINGLE ENTRY VISIT VISA') {
                  serviceSelect.innerHTML += '<option value="RC22A-REGULER ACADEMIC INTERNSHIP|SINGLE ENTRY VISA|IDR 8,500,000|Est. USD 580|14 working day(s)" data-visit-purpose="Internship" data-position="C22A-ACADEMIC INTERNSHIP SINGLE ENTRY VISIT VISA">RC22A-REGULER ACADEMIC INTERNSHIP|SINGLE ENTRY VISA|IDR 8,500,000|Est. USD 580|14 working day(s)</option>';
              } else if (visa === 'C22B-COMPANY INTERNSHIP SINGLE ENTRY VISIT VISA') {
                  serviceSelect.innerHTML += '<option value="RC22B-REGULER COMPANY INTERNSHIP|SINGLE ENTRY VISA|IDR 8,500,000|Est. USD 580|14 working day(s)" data-visit-purpose="Internship" data-position="C22B-COMPANY INTERNSHIP SINGLE ENTRY VISIT VISA">RC22B-REGULER COMPANY INTERNSHIP|SINGLE ENTRY VISA|IDR 8,500,000|Est. USD 580|14 working day(s)</option>';
              } else if (visa === 'D12-PRE-INVESTMENT MULTIPLE ENTRY VISIT VISA') {
                  serviceSelect.innerHTML += '<option value="RD21-REGULER INVESTMENT|MULTIPLE ENTRY 1 YEAR|IDR 4,500,000|Est. USD 307|14 Working day(s)" data-position="D12-PRE-INVESTMENT MULTIPLE ENTRY VISIT VISA">RD21-REGULER INVESTMENT|MULTIPLE ENTRY 1 YEAR|IDR 4,500,000|Est. USD 307|14 Working day(s)</option>';
                  serviceSelect.innerHTML += '<option value="RD22-EXPRESS INVESTMENT|MULTIPLE ENTRY 1 YEAR|IDR 6,500,000|Est. USD 420|7 Working day(s)" data-position="D12-PRE-INVESTMENT MULTIPLE ENTRY VISIT VISA">RD22-EXPRESS INVESTMENT|MULTIPLE ENTRY 1 YEAR|IDR 6,500,000|Est. USD 420|7 Working day(s)</option>';
              } else if (visa === 'C12-PRE-INVESTMENT SINGLE ENTRY VISIT VISA') {
                  serviceSelect.innerHTML += '<option value="RC12-REGULER INVESTMENT|SINGLE ENTRY VISA|IDR 3,000,000|Est. USD 205|14 working day(s)" data-position="C12-PRE-INVESTMENT SINGLE ENTRY VISIT VISA">RC12-REGULER INVESTMENT|SINGLE ENTRY VISA|IDR 3,000,000|Est. USD 205|14 working day(s)</option>';
                  serviceSelect.innerHTML += '<option value="EC12-PRIORITY INVESTMENT|SINGLE ENTRY VISA|IDR 4,900,000|Est. USD 335|5 working day(s)" data-position="C12-PRE-INVESTMENT SINGLE ENTRY VISIT VISA">EC12-PRIORITY INVESTMENT|SINGLE ENTRY VISA|IDR 4,900,000|Est. USD 335|5 working day(s)</option>';
              } else if (visa === 'C6B-VOLUNTEER SINGLE ENTRY VISIT VISA') {
                  serviceSelect.innerHTML += '<option value="RV21-REGULER VOLUNTEER|SINGLE ENTRY|IDR 1,000,000|Est. USD 70|14 Working day(s)" data-position="C6B-VOLUNTEER SINGLE ENTRY VISIT VISA">RV21-REGULER VOLUNTEER|SINGLE ENTRY|IDR 1,000,000|Est. USD 70|14 Working day(s)</option>';
              } else if (visa === 'D1-TOURIST MULTIPLE ENTRI VISIT VISA') {
                  serviceSelect.innerHTML += '<option value="RD1-REGULER TOURIST|MULTIPLE ENTRY 1 YEAR|IDR 4,500,000|Est. USD 307|14 Working day(s)" data-position="D1-TOURIST MULTIPLE ENTRI VISIT VISA">RD1-REGULER TOURIST|MULTIPLE ENTRY 1 YEAR|IDR 4,500,000|Est. USD 307|14 Working day(s)</option>';
                  serviceSelect.innerHTML += '<option value="ED1-PRIORITY TOURIST|MULTIPLE ENTRY 1 YEAR|IDR 6,500,000|Est. USD 444|5 Working day(s)" data-position="D1-TOURIST MULTIPLE ENTRI VISIT VISA">ED1-PRIORITY TOURIST|MULTIPLE ENTRY 1 YEAR|IDR 6,500,000|Est. USD 444|5 Working day(s)</option>';
              } else if (visa === 'C1-TOURIST SINGLE ENTRY VISIT VISA') {
                  serviceSelect.innerHTML += '<option value="RC1-REGULER TOURIST|SINGLE ENTRY VISA|IDR 3,000,000|Est. USD 205|14 working day(s)" data-position="C1-TOURIST SINGLE ENTRY VISIT VISA">RC1-REGULER TOURIST|SINGLE ENTRY VISA|IDR 3,000,000|Est. USD 205|14 working day(s)</option>';
                  serviceSelect.innerHTML += '<option value="EC1-PRIORITY TOURIST|SINGLE ENTRY VISA|IDR 4,900,000|Est. USD 335|5 working day(s)" data-position="C1-TOURIST SINGLE ENTRY VISIT VISA">EC1-PRIORITY TOURIST|SINGLE ENTRY VISA|IDR 4,900,000|Est. USD 335|5 working day(s)</option>';
              } else if (visa === 'B1-TOURIST VISA ON ARRIVAL') {
                  serviceSelect.innerHTML += '<option value="B1-TOURIST (Visa On Arrival)|IDR 700,000|Est. USD 48|1 working day(s)" data-position="B1-TOURIST VISA ON ARRIVAL">B1-TOURIST (Visa On Arrival)|IDR 700,000|Est. USD 48|1 working day(s)</option>';
              }
          });       