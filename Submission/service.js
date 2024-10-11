// Service function to fetch country list from the API
async function fetchCountries() {
    try {
        const response = await $.ajax({
            url: "https://api.cbaservices.id/countries", // Updated API URL
            method: "GET",
            dataType: "json",
        });
        if (response && response.length > 0) {
            return response; // Return the fetched countries
        } else {
            throw new Error("No countries found.");
        }
    } catch (error) {
        console.error("Error fetching countries:", error);
        throw error; // Throw the error to be handled outside
    }
}

async function fetchAgents() {
    try {
        const response = await $.ajax({
            url: "https://api.cbaservices.id/agents", // Updated API URL
            method: "GET",
            dataType: "json",
        });
        if (response && response.length > 0) {
            return response; // Return the fetched agents
        } else {
            throw new Error("No agents found.");
        }
    } catch (error) {
        console.error("Error fetching agents:", error);
        throw error; // Throw the error to be handled outside
    }
}

// Service to POST customer data
async function postCustomerData(customerData) {
    try {
        const response = await $.ajax({
            url: "https://api.cbaservices.id/customers", // Updated API URL for customer
            method: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(customerData), // Send customer data as JSON
        });
        return response; // Return response from the server
    } catch (error) {
        console.error("Error posting customer data:", error);
        throw error; // Throw the error to be handled outside
    }
}

// Service to POST transaction data
async function postTransactionData(transactionData) {
    try {
        const response = await $.ajax({
            url: "https://api.cbaservices.id/transaction-detail", // Updated API URL for transaction
            method: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(transactionData), // Send transaction data as JSON
        });
        return response; // Return response from the server
    } catch (error) {
        console.error("Error posting transaction data:", error);
        throw error; // Throw the error to be handled outside
    }
}

// Service to GET customer data for review
async function fetchCustomerData(customerId) {
    try {
        const response = await $.ajax({
            url: `https://api.cbaservices.id/customers/${customerId}`, // Updated API URL
            method: "GET",
            dataType: "json",
        });
        return response; // Return customer data
    } catch (error) {
        console.error("Error fetching customer data:", error);
        throw error; // Throw the error to be handled outside
    }
}

let productData = []; // Global variable to store the fetched data

// Function to fetch product data once from the API
async function fetchProductData() {
    try {
        const response = await $.ajax({
            url: "https://api.cbaservices.id/product", // Updated API URL
            method: "GET",
            dataType: "json",
        });

        productData = response; // Store the fetched data in a global variable
        return productData;
    } catch (error) {
        console.error("Error fetching product data:", error);
        throw error; // Throw the error to be handled outside
    }
}


// Function to populate the country dropdowns
function populateCountryOptions(countries) {
    const countrySelect = $("#countryId");
    const emergencyCountrySelect = $("#emergencyContactCountryId");

    // Clear existing options
    countrySelect.empty();
    emergencyCountrySelect.empty();

    // Add default option
    const defaultOption = $('<option value="">Select Country</option>');
    countrySelect.append(defaultOption.clone());
    emergencyCountrySelect.append(defaultOption.clone());

    // Add countries as options
    countries.forEach(function (country) {
        const option = $("<option></option>")
            .val(country.id)
            .text(country.country);

        countrySelect.append(option.clone());
        emergencyCountrySelect.append(option.clone());
    });
}

// Initialize function to fetch and render country options
async function initializeCountries() {
    try {
        const countries = await fetchCountries(); // Fetch countries using the service function
        populateCountryOptions(countries); // Populate the dropdowns with the fetched data
    } catch (error) {
        alert("Failed to load countries. Please try again.");
    }
}

function populateAgentOptions(agents) {
    const referralSelect = $("#referral");

    // Clear existing options
    referralSelect.empty();

    // Add default option
    const defaultOption = $('<option value="">Pilih Referral</option>');
    referralSelect.append(defaultOption.clone());

    // Add agents as options
    agents.forEach(function (agent) {
        const option = $("<option></option>")
            .val(agent.id)
            .text(agent.name);

        referralSelect.append(option.clone());
    });
}

async function initializeAgents() {
    try {
        const agents = await fetchAgents();
        populateAgentOptions(agents); // Populate the dropdowns with the fetched data
    } catch (error) {
        alert("Failed to load agents. Please try again.");
    }
}

let currentPerson = 1; // Track the current person number being added
let totalPerson = 1; // Track the total number of people
let allPersonsData = []; // Array to hold data for all persons

// Function to handle the visibility of the Save Data and Next buttons
function handleTotalPersonVisibility() {
    totalPerson = parseInt($("#total-person").val()) || 1;

    console.log("Total person:", totalPerson);

    // Show or hide buttons based on the number of people
    if (totalPerson === 1) {
        $("#btn-save-data").addClass("hidden"); // Hide the save data button for one person
        $("#btn-next-review").removeClass("hidden"); // Show the next button for single person
    } else {
        $("#btn-save-data").removeClass("hidden").text(`Add Person ${currentPerson}`); // Show and rename button
        $("#btn-next-review").addClass("hidden"); // Hide the next button until last person
    }
}

// Event listener to trigger the logic when the total person dropdown changes
$("#total-person").on("change", function () {
    currentPerson = 1; // Reset to the first person when total changes
    allPersonsData = []; // Reset data collection when total changes
    handleTotalPersonVisibility();
});

// Handle the save button logic for multiple people
$("#btn-save-data").on("click", async function (e) {
    e.preventDefault();
    await handleFormSubmission();

    // Increment the person counter
    if (currentPerson < totalPerson) {
        currentPerson++;
        $("#btn-save-data").text(`Add Person ${currentPerson}`); // Update button text to next person
        resetForm(); // Reset the form fields for the next person
    }

    // If it's the last person, hide the "Add Person" button and show the "Next" button
    if (currentPerson === totalPerson) {
        $("#btn-save-data").addClass("hidden");
        $("#btn-next-review").removeClass("hidden");
    }
});

function validateCustomerData(customerData) {
    const missingFields = [];
    const errors = [];

    // Check for missing fields
    Object.entries(customerData).forEach(([key, value]) => {
        if (!value) {
            missingFields.push(key);
        }
    });

    // Specific validation for email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (customerData.email && !emailRegex.test(customerData.email)) {
        errors.push('Invalid email format');
    }

    // Validate emergency contact email
    if (customerData.emergencyContactEmail && !emailRegex.test(customerData.emergencyContactEmail)) {
        errors.push('Invalid email format for Emergency Contact Email');
    }


    // Specific validation for phone number (only digits are allowed)
    const phoneRegex = /^\d+$/;


    if (customerData.phoneNumber && !phoneRegex.test(customerData.phoneNumber)) {
        errors.push('Phone number must contain only digits');
    }

    if (customerData.emergencyContactMobilePhone && !phoneRegex.test(customerData.emergencyContactMobilePhone)) {
        errors.push('Emergency contact phone number must contain only digits');
    }

    // Display error message if validation fails
    if (missingFields.length > 0 || errors.length > 0) {
        const alertText = `
            ${missingFields.length ? `Missing fields: ${missingFields.join(', ')}` : ''}
            ${missingFields.length && errors.length ? '\n' : ''}
            ${errors.length ? `Errors: ${errors.join(', ')}` : ''}
        `.trim();

        Swal.fire({
            icon: 'warning',
            title: 'Validation Error',
            text: alertText,
        });

        return false; // Validation failed
    }

    return true; // Validation passed
}

// Function to handle form submission
async function handleFormSubmission() {
    try {
        // Collect customer data from form
        const customerData = {
            fullName: $("#fullName").val(),
            motherName: $("#motherName").val(),
            nationality: $("#nationality").val(),
            email: $("#email").val(),
            phoneNumber: $("#phoneNumber").val(),
            originalAddress: $("#originalAddress").val(),
            originalCity: $("#originalCity").val(),
            countryId: $("#countryId").val(),
            originalProvince: $("#originalProvince").val(),
            zipCode: $("#zipCode").val(),
            indonesiaAccomodationName: $("#indonesiaAccomodationName").val(), // Accomodation Name
            indonesiaAddress: $("#indonesiaAddress").val(), // Accomodation Address
            emergencyContactFullName: $("#emergencyContactFullName").val(),
            emergencyContactRelation: $("#emergencyContactRelation").val(),
            emergencyContactAddress: $("#emergencyContactAddress").val(),
            emergencyContactCountryId: $("#emergencyContactCountryId").val(),
            emergencyContactEmail: $("#emergencyContactEmail").val(),
            emergencyContactMobilePhone: $("#emergencyContactMobilePhone").val(),
            travelDocument: $("#travelDocument").val(),
            documentNumber: $("#documentNumber").val(),
            agentId: $("#referral").val(), // Referral agent ID
        };

        // Validate the customer data using the validateCustomerData function
        const isValid = validateCustomerData(customerData);
        if (!isValid) {
            // Stop the submission process if validation fails
            return;
        }

        // POST customer data and get customerId
        const customerResponse = await postCustomerData(customerData);

        allPersonsData.push(customerResponse);

        // Display a success message with Swal.fire after data is saved
        await Swal.fire({
            title: 'Success!',
            text: 'Your data has been saved successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
        });

        populateReviewSubmission();
    } catch (error) {
        await Swal.fire({
            title: 'Error!',
            text: `Failed to save data for person ${currentPerson}. Please try again. Error: ${error.message}`,
            icon: 'error',
            confirmButtonText: 'OK',
        });
        console.error(error);
    }
}

function resetForm() {
    $("#fullName, #motherName, #nationality, #email, #phoneNumber, #originalAddress, #originalCity, #countryId, #originalProvince, #zipCode, #indonesiaAccomodationName, #indonesiaAddress, #emergencyContactFullName, #emergencyContactRelation, #emergencyContactAddress, #emergencyContactCountryId, #emergencyContactEmail, #emergencyContactMobilePhone, #travelDocument, #documentNumber").val('');
}

// Function to populate the review submission step
function populateReviewSubmission() {
    const visitPurpose = $("#category").val();
    const selectedProductId = $("#productName").val();  // This is the productId now
    const service = $("#service").val();
    const totalPerson = $("#total-person").val();
    const referral = $("#referral").val();

    // Find the productName from the productData using the productId
    const selectedProduct = productData.find(product => product.id === parseInt(selectedProductId));

    // Ensure the selected product exists before proceeding
    if (!selectedProduct) {
        console.error("Selected product not found.");
        return;
    }

    // Populate document requirement information with productName
    $("#document-visit-purpose").text(visitPurpose);
    $("#document-productName").text(selectedProduct.productName);  // Use productName here
    $("#document-service").text(service);
    $("#document-total-person").text(totalPerson);
    $("#document-referral").text(referral);

    console.log("All persons data:", allPersonsData);

    // Clear the existing client information content to refresh with the updated details
    const clientInfoContainer = $("#client-info");
    clientInfoContainer.empty(); // Clear any existing data

    // Loop through each person's data and append the information to the review section
    allPersonsData.forEach((data, index) => {
        console.log(`Appending data for person ${index + 1}`);

        // Create dynamic HTML content for each person's information
        const personInfoHTML = `
              <h3 class="font-bold text-lg mb-2">Client Information ${index + 1}</h3>
              <table class="table-auto w-full border-collapse border border-gray-300">
                  <thead>
                      <tr class="bg-gray-200">
                          <th class="w-1/2 border border-gray-300 py-2 px-4">Field</th>
                          <th class="w-1/2 border border-gray-300 py-2 px-4">Value</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr><td class="border border-gray-300 py-2 px-4">Fullname</td><td class="border border-gray-300 py-2 px-4">${data.fullName}</td></tr>
                      <tr><td class="border border-gray-300 py-2 px-4">Mother Name</td><td class="border border-gray-300 py-2 px-4">${data.motherName}</td></tr>
                      <tr><td class="border border-gray-300 py-2 px-4">Nationality</td><td class="border border-gray-300 py-2 px-4">${data.nationality}</td></tr>
                      <tr><td class="border border-gray-300 py-2 px-4">Email</td><td class="border border-gray-300 py-2 px-4">${data.email}</td></tr>
                      <tr><td class="border border-gray-300 py-2 px-4">Phone</td><td class="border border-gray-300 py-2 px-4">${data.phoneNumber}</td></tr>
                      <tr><td class="border border-gray-300 py-2 px-4">Address</td><td class="border border-gray-300 py-2 px-4">${data.originalAddress}</td></tr>
                      <tr><td class="border border-gray-300 py-2 px-4">City</td><td class="border border-gray-300 py-2 px-4">${data.originalCity}</td></tr>
                      <tr><td class="border border-gray-300 py-2 px-4">Province</td><td class="border border-gray-300 py-2 px-4">${data.originalProvince}</td></tr>
                      <tr><td class="border border-gray-300 py-2 px-4">ZIP Code</td><td class="border border-gray-300 py-2 px-4">${data.zipCode}</td></tr>
                      <tr><td class="border border-gray-300 py-2 px-4">Country</td><td class="border border-gray-300 py-2 px-4">${data.countryId}</td></tr>
                      <tr><td class="border border-gray-300 py-2 px-4">Accommodation Name</td><td class="border border-gray-300 py-2 px-4">${data.indonesiaAccomodationName}</td></tr>
                      <tr><td class="border border-gray-300 py-2 px-4">Accommodation Address</td><td class="border border-gray-300 py-2 px-4">${data.indonesiaAddress}</td></tr>
                      <tr><td class="border border-gray-300 py-2 px-4">Emergency Fullname</td><td class="border border-gray-300 py-2 px-4">${data.emergencyContactFullName}</td></tr>
                      <tr><td class="border border-gray-300 py-2 px-4">Emergency Relationship</td><td class="border border-gray-300 py-2 px-4">${data.emergencyContactRelation}</td></tr>
                      <tr><td class="border border-gray-300 py-2 px-4">Emergency Address</td><td class="border border-gray-300 py-2 px-4">${data.emergencyContactAddress}</td></tr>
                      <tr><td class="border border-gray-300 py-2 px-4">Emergency Country</td><td class="border border-gray-300 py-2 px-4">${data.emergencyContactCountryId}</td></tr>
                      <tr><td class="border border-gray-300 py-2 px-4">Emergency Email</td><td class="border border-gray-300 py-2 px-4">${data.emergencyContactEmail}</td></tr>
                      <tr><td class="border border-gray-300 py-2 px-4">Emergency Phone</td><td class="border border-gray-300 py-2 px-4">${data.emergencyContactMobilePhone}</td></tr>
                      <tr><td class="border border-gray-300 py-2 px-4">Travel Document</td><td class="border border-gray-300 py-2 px-4">${data.travelDocument}</td></tr>
                      <tr><td class="border border-gray-300 py-2 px-4">Document Number</td><td class="border border-gray-300 py-2 px-4">${data.documentNumber}</td></tr>
                  </tbody>
              </table>
          `;

        // Append the dynamically created person info to the client info container
        clientInfoContainer.append(personInfoHTML);

    });
}

// Function to populate the visit purpose dropdown
function populateVisitPurposeOptions(selectedVisitPurpose) {
    const visitPurposeSelect = $("#category");
    const excludedCategories = ['Company Formation', 'Legal Document', 'Document Licensing'];

    // Clear existing options
    visitPurposeSelect.empty();

    // Add default option
    visitPurposeSelect.append('<option value="">Select Visit Purpose</option>');

    // Extract unique visit purposes and populate the dropdown
    const visitPurposes = [...new Set(productData
        .map(product => product.category.category)
        .filter(category => !excludedCategories.includes(category))
    )];

    visitPurposes.forEach(function (purpose) {
        const option = $("<option></option>")
            .val(purpose)
            .text(purpose);
        visitPurposeSelect.append(option);
    });

    // If the URL has a pre-selected visit purpose, set it
    if (selectedVisitPurpose) {
        visitPurposeSelect.val(selectedVisitPurpose);
    }
}

// Function to populate the visa dropdown (productName dropdown)
function populateVisaOptions(selectedCategory, selectedVisa) {
    const visaSelect = $("#productName");

    // Clear existing options
    visaSelect.empty();

    // Add default option
    visaSelect.append('<option value="">Select Visa</option>');

    // Filter and add visas based on the selected category
    const filteredVisas = productData.filter(product => product.category.category === selectedCategory);

    // Add each visa to the dropdown, including productId in the value attribute
    filteredVisas.forEach(function (visa) {
        const option = $("<option></option>")
            .val(visa.id)  // Use product id as the value
            .text(visa.productName);  // Show productName
        visaSelect.append(option);
    });

    // If the URL has a pre-selected visa, set it
    if (selectedVisa) {
        visaSelect.find("option").filter(function () {
            return $(this).text() === selectedVisa;
        }).attr('selected', 'selected');
    }
}

// Function to populate the service dropdown based on the selected product ID
function populateServiceOptions(selectedProductId) {
    const serviceSelect = $("#service");

    // Clear existing options
    serviceSelect.empty();

    // Add default option
    serviceSelect.append('<option value="">Select Service</option>');

    // Filter and add services based on the selected product ID
    const filteredServices = productData.filter(product => product.id === selectedProductId);

    filteredServices.forEach(function (service) {
        const option = $("<option></option>")
            .val(service.service)  // Use the service as value
            .text(service.service);  // Show service description
        serviceSelect.append(option);
    });
}

// Event listener for productName (visa) change to populate services dynamically based on productId
$("#productName").on("change", function () {
    const selectedProductId = parseInt($(this).val()); // Get the selected product's id from dropdown

    if (selectedProductId) {
        populateServiceOptions(selectedProductId);  // Populate services based on product id
    } else {
        // If no valid selection, clear service options
        $("#service").empty().append('<option value="">Select Service</option>');
    }
});

// Event listener for category change to populate visa (productName) dropdown
$("#category").on("change", function () {
    const selectedCategory = $(this).val();
    populateVisaOptions(selectedCategory);  // Populate the visa dropdown based on selected category
});

function getUrlParameter(paramName) {
    const params = new URLSearchParams(window.location.search);
    return params.get(paramName);
}


async function initializeProduct() {
    const visitPurpose = getUrlParameter('visit-purpose'); // Get 'visit-purpose' from the URL
    const visa = decodeURIComponent(getUrlParameter('visa')); // Get 'visa' from the URL, decode for spaces

    try {
        await fetchProductData(); // Fetch product data using the service function
        populateVisitPurposeOptions(visitPurpose);
        if (visitPurpose && visa) {
            populateVisaOptions(visitPurpose, visa);

            // Find the product ID that matches the pre-selected visa
            const selectedVisaOption = productData.find(product => product.productName === visa);
            if (selectedVisaOption) {
                // Pre-select the service dropdown based on the pre-selected visa
                populateServiceOptions(selectedVisaOption.id); // Use the product ID to populate services
            }
        }
    } catch (error) {
        alert("Failed to load product. Please try again.");
    }
}

// Attach form submission handler to the 'Next' button in the statement section
document.getElementById("btn-next-review").addEventListener("click", async function (e) {
    e.preventDefault();
    handleFormSubmission();

    // Retrieve quantity from total-person dropdown
    const quantity = parseInt($("#total-person").val(), 10) || 1;

    // Retrieve product details based on the selected visa
    const selectedVisa = $("#productName").val();
    // Find the selected product from productData using the productId
    const selectedProduct = productData.find(product => product.id === selectedProductId);

    // Ensure product details are available before proceeding
    if (!selectedProduct) {
        alert("Please select a valid visa.");
        return;
    }

    // Collect transaction data from the form
    const transactionData = {
        quantity: quantity, // Quantity from the total-person dropdown
        subtotal: selectedProduct.price * quantity, // Calculate subtotal based on product price and quantity
        productId: selectedProduct.id, // Retrieve productId from the selected product
    };
    console.log("Transaction data:", transactionData);

    // POST transaction data
    await postTransactionData(transactionData);
});

// configuration for step
async function handleStepNavigation(currentStep, steps) {
    const nextButtons = $('.btn-next');
    const prevButtons = $('.btn-prev');

    nextButtons.on('click', async (e) => {
        e.preventDefault();

        // Perform specific validation for step 2 if required
        if (currentStep === 2) {
            const customerData = collectCustomerData(); // Collect customer data for validation
            const isValid = validateCustomerData(customerData);

            if (!isValid) {
                console.log("Validation failed on step 2");
                return; // Stop navigation if validation fails
            }
        }

        // General step validation
        const isStepValid = validateStep(currentStep, steps);
        if (isStepValid) {
            if (currentStep < steps.length) {
                currentStep++; // Increment the step only if validation passes
                moveToNextStep(currentStep, steps);
                console.log("Moved to next step:", currentStep);
            }
        } else {
            focusOnInvalidField(currentStep, steps); // Focus on the first invalid input
        }
    });

    prevButtons.on('click', (e) => {
        e.preventDefault();
        if (currentStep > 1) {
            moveToNextStep(currentStep - 1, steps);
        }
    });
}

// Function to collect customer data from the form fields
function collectCustomerData() {
    return {
        fullName: $("#fullName").val(),
        motherName: $("#motherName").val(),
        nationality: $("#nationality").val(),
        email: $("#email").val(),
        phoneNumber: $("#phoneNumber").val(),
        originalAddress: $("#originalAddress").val(),
        originalCity: $("#originalCity").val(),
        countryId: $("#countryId").val(),
        originalProvince: $("#originalProvince").val(),
        zipCode: $("#zipCode").val(),
        indonesiaAccomodationName: $("#indonesiaAccomodationName").val(),
        indonesiaAddress: $("#indonesiaAddress").val(),
        emergencyContactFullName: $("#emergencyContactFullName").val(),
        emergencyContactRelation: $("#emergencyContactRelation").val(),
        emergencyContactAddress: $("#emergencyContactAddress").val(),
        emergencyContactCountryId: $("#emergencyContactCountryId").val(),
        emergencyContactEmail: $("#emergencyContactEmail").val(),
        emergencyContactMobilePhone: $("#emergencyContactMobilePhone").val(),
        travelDocument: $("#travelDocument").val(),
        documentNumber: $("#documentNumber").val(),
        agentId: $("#referral").val()
    };
}

// Function to focus on the first invalid input field
function focusOnInvalidField(step, steps) {
    const currentSection = steps[step - 1];
    const firstInvalidInput = currentSection.querySelector('input, select.border-red-500');
    if (firstInvalidInput) {
        firstInvalidInput.focus();
    }
}

// Function to move to the next or previous step
function moveToNextStep(step, steps) {
    steps.forEach((section, index) => {
        console.log("Checking section:", index + 1);
        console.log("Current step:", step);
        if (index + 1 === step) {
            console.log("Displaying section:", index + 1);
            section.classList.remove('hidden');
        } else {
            section.classList.add('hidden');
        }
    });
    updateProgressBar(step, steps);
}

// Function to validate the step fields
function validateStep(step, steps) {
    const currentSection = steps[step - 1];
    const inputs = currentSection.querySelectorAll('input, select');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value) {
            input.classList.add('border-red-500');
            isValid = false;
        } else {
            input.classList.remove('border-red-500');
        }
    });

    if (!isValid) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'All fields are required!',
        });
    }

    return isValid;
}

// Function to update the progress bar based on the current step
function updateProgressBar(step, steps) {
    const progress = document.getElementById('progress');
    const progressPercentage = ((step - 1) / (steps.length - 1)) * 100;
    progress.style.width = progressPercentage + '%';
}


// Call initializeCountries and initializeAgents once the DOM content is loaded
document.addEventListener('DOMContentLoaded', async () => {
    await initializeCountries();
    await initializeAgents();
    await initializeProduct();

    const steps = document.querySelectorAll('.form-section');
    let currentStep = 1;

    // Call the step navigation function from service.js
    await handleStepNavigation(currentStep, steps);
});
