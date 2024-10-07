<?php
// upload.php

// Handle the form data
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$datetime = $_POST['datetime'];
$services = $_POST['services'];
$consultation_type = $_POST['consultation-type'];
$message = $_POST['message'];
$proposal = $_FILES['proposal'];

// Validate the data
if (empty($name) || empty($email) || empty($phone) || empty($datetime) || empty($services)) {
    // Handle validation errors
    echo "Please fill in all required fields.";
    exit;
}

// Store the data in a database
$conn = mysqli_connect("localhost", "username", "password", "database");
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "INSERT INTO appointments (name, email, phone, datetime, services, consultation_type, message, proposal) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "ssssssss", $name, $email, $phone, $datetime, $services, $consultation_type, $message, $proposal);
mysqli_stmt_execute($stmt);

// Perform any other necessary actions
// ...

// Close the database connection
mysqli_close($conn);

// Redirect the user to a success page
header("Location: success.html");
exit;
?>