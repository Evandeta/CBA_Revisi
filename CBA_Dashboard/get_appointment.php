<?php
// Koneksi ke database
$servername = "localhost";
$username = "root";  // Sesuaikan dengan username MySQL Anda
$password = "";      // Sesuaikan dengan password MySQL Anda
$dbname = "cba_appointments";

// Buat koneksi
$conn = new mysqli($servername, $username, $password, $dbname);

// Cek koneksi
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query untuk mendapatkan semua data appointments
$sql = "SELECT * FROM appointments";
$result = $conn->query($sql);

$appointments = [];

if ($result->num_rows > 0) {
    // Loop melalui semua baris dan masukkan ke dalam array
    while($row = $result->fetch_assoc()) {
        $appointments[] = [
            'name' => $row['name'],
            'email' => $row['email'],
            'phoneNumber' => $row['phoneNumber'],
            'date' => $row['date'],
            'services' => explode(',', $row['services']),  // Mengubah string services menjadi array
            'consultant' => $row['consultant'],
            'messages' => json_decode($row['messages']),  // Jika messages disimpan sebagai JSON
            'uploadFile' => $row['uploadFile'],
            'status' => $row['status']
        ];
    }
} 

// Mengembalikan data sebagai JSON
header('Content-Type: application/json');
echo json_encode($appointments);

// Tutup koneksi
$conn->close();
?>
