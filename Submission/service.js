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

        // POST customer data and get customerId
        const customerResponse = await postCustomerData(customerData);
        const customerId = customerResponse.id;

        // Collect transaction data from form
        const transactionData = {
            quantity: 1,
            subtotal: 100000,
            productId: 3,
            customerId: customerId, // Link the transaction to the customer
        };

        // POST transaction data
        await postTransactionData(transactionData);

        // Fetch the customer data for review
        const fetchedCustomerData = await fetchCustomerData(customerId);

        // Populate the review section with fetched customer data
        populateReviewSubmission(fetchedCustomerData);
    } catch (error) {
        alert(`Failed to submit form. Please try again. Error: ${error.message}`);
        console.error(error);
    }
}

// Function to populate the review submission step
function populateReviewSubmission(data) {
    const visitPurpose = $("#category").val();
    const position = $("#productName").val();
    const service = $("#service").val();
    const totalPerson = $("#total-person").val();
    const referral = $("#referral").val();

    // Populate document requirement information
    $("#document-category").text(visitPurpose);
    $("#document-productName").text(position);
    $("#document-service").text(service);
    $("#document-total-person").text(totalPerson);
    $("#document-referral").text(referral);

    // Populate client information
    $("#client-fullName").text(data.fullName);
    $("#client-motherName").text(data.motherName);
    $("#client-nationality").text(data.nationality);
    $("#client-email").text(data.email);
    $("#client-phoneNumber").text(data.phoneNumber);
    $("#client-originalAddress").text(data.originalAddress);
    $("#client-originalProvince").text(data.originalProvince); // Use originalProvince for state
    $("#client-originalCity").text(data.originalCity); // Use originalProvince for state
    $("#client-zipCode").text(data.zipCode);
    $("#client-countryId").text(data.countryId); // Display country ID, change to country name if necessary
    $("#client-indonesiaAccomodationName").text(data.indonesiaAccomodationName);
    $("#client-accomodation-indonesiaAddress").text(data.indonesiaAddress); // Display Accomodation Address
    $("#client-emergency-emergencyContactFullName").text(data.emergencyContactFullName);
    $("#client-emergencyContactRelation").text(data.emergencyContactRelation);
    $("#client-emergencyContactAddress").text(data.emergencyContactAddress);
    $("#client-emergencyContactCountryId").text(data.emergencyContactCountryId); // Display emergency country ID
    $("#client-emergencyContactEmail").text(data.emergencyContactEmail);
    $("#client-emergencyContactMobilePhone").text(data.emergencyContactMobilePhone);
    $("#client-travelDocument").text(data.travelDocument);
    $("#client-documentNumber").text(data.documentNumber);
}

// Attach form submission handler to the 'Next' button in the statement section
document.getElementById("btn-next-review").addEventListener("click", function (e) {
    e.preventDefault();
    handleFormSubmission();
});

// Call initializeCountries and initializeAgents once the DOM content is loaded
document.addEventListener('DOMContentLoaded', async () => {
    await initializeCountries();
    await initializeAgents();
});
