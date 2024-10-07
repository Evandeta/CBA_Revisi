<?php
// Connect to the database
$conn = mysqli_connect("localhost", "username", "password", "database");
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Retrieve the form data from the database
$sql = "SELECT * FROM appointments";
$result = mysqli_query($conn, $sql);

// Display the form data in a table
echo "<table>";
echo "<tr><th>Name</th><th>Email</th><th>Phone</th><th>Datetime</th><th>Services</th><th>Consultation Type</th><th>Message</th><th>Proposal</th></tr>";
while ($row = mysqli_fetch_assoc($result)) {
    echo "<tr>";
    echo "<td>" . $row['name'] . "</td>";
    echo "<td>" . $row['email'] . "</td>";
    echo "<td>" . $row['phone'] . "</td>";
    echo "<td>" . $row['datetime'] . "</td>";
    echo "<td>" . $row['services'] . "</td>";
    echo "<td>" . $row['consultation_type'] . "</td>";
    echo "<td>" . $row['message'] . "</td>";
    echo "<td>" . $row['proposal'] . "</td>";
    echo "</tr>";
}
echo "</table>";

// Close the database connection
mysqli_close($conn);
?>