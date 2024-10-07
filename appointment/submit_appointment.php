<?php
// Koneksi ke database
$servername = "localhost";
$username = "root"; // Sesuaikan dengan username MySQL Anda
$password = ""; // Sesuaikan dengan password MySQL Anda
$dbname = "cba_appointments";

$conn = new mysqli($servername, $username, $password, $dbname);

// Cek koneksi
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Mendapatkan data dari form
$caseNumber = 'CASE' . str_pad(rand(1, 1000), 3, '0', STR_PAD_LEFT);
$name = $_POST['name'];
$email = $_POST['email'];
$phoneNumber = $_POST['phoneNumber'];
$date = $_POST['date'];
$serviceAppoint = $_POST['services'];
$consultationType = $_POST['consultant'];
$messageAppoint = $_POST['messages'];
$uploadFile = "";

// Jika ada file yang di-upload
if (isset($_FILES['proposal']) && $_FILES['proposal']['error'] === UPLOAD_ERR_OK) {
    $fileTmpPath = $_FILES['proposal']['tmp_name'];
    $fileName = $_FILES['proposal']['name'];
    $fileSize = $_FILES['proposal']['size'];
    $fileType = $_FILES['proposal']['type'];
    
    $uploadDir = 'uploads/';
    $dest_path = $uploadDir . $fileName;

    // Pindahkan file yang di-upload ke folder 'uploads'
    if(move_uploaded_file($fileTmpPath, $dest_path)) {
        $uploadFile = $fileName;
    } else {
        echo "There was an error uploading the file.";
        exit;
    }
}

// Masukkan data ke tabel appointments
$sql = "INSERT INTO appointments (caseNumber, name, email, phoneNumber, appointmentDate, serviceAppoint, consultationType, messageAppoint, uploadFile)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssssss", $caseNumber, $name, $email, $phoneNumber, $date, $serviceAppoint, $consultationType, $messageAppoint, $uploadFile);

if ($stmt->execute()) {
    echo "Appointment has been successfully submitted!";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
