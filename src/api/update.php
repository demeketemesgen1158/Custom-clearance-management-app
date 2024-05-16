<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
header("Content-type:application/json");
header("Access-Control-Allow-Credentials: true");

$servername = "localhost";
$username = "your_user_name";
$password = "your_password";
$dbname = "maflinkcom_iccs";

if (isset($_POST)) {
    $data = json_decode(file_get_contents("php://input"), true);
    $arrData = json_encode($data);


    $no = htmlspecialchars(preg_replace("/\r?\n/", "\\n", addslashes($data['no'])));
    $fName = htmlspecialchars(preg_replace("/\r?\n/", "\\n", addslashes($data['fullName'])));
    $phoneNumber = htmlspecialchars(preg_replace("/\r?\n/", "\\n", addslashes($data['phoneNumber'])));
    $awb = htmlspecialchars(preg_replace("/\r?\n/", "\\n", addslashes($data['awb'])));
    $weight = htmlspecialchars(preg_replace("/\r?\n/", "\\n", addslashes($data['weight'])));
    $item = htmlspecialchars(preg_replace("/\r?\n/", "\\n", addslashes($data['item'])));
    $terminalFee = htmlspecialchars(preg_replace("/\r?\n/", "\\n", addslashes($data['terminalFee'])));
    $processingFee = htmlspecialchars(preg_replace("/\r?\n/", "\\n", addslashes($data['processingFee'])));
    $warehouseFee = htmlspecialchars(preg_replace("/\r?\n/", "\\n", addslashes($data['warehouseFee'])));
    $processedBy = htmlspecialchars(preg_replace("/\r?\n/", "\\n", addslashes($data['processedBy'])));
    $issueDate = htmlspecialchars(preg_replace("/\r?\n/", "\\n", addslashes($data['issueDate'])));
    $returnDate = htmlspecialchars(preg_replace("/\r?\n/", "\\n", addslashes($data['returnDate'])));
    $fsNo = htmlspecialchars(preg_replace("/\r?\n/", "\\n", addslashes($data['fsNo'])));
    $status = htmlspecialchars(preg_replace("/\r?\n/", "\\n", addslashes($data['status'])));

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $sql = "UPDATE datatable SET name='$fName', phoneNumber = '$phoneNumber', awb='$awb', weight = '$weight', item = '$item', processingFee = '$processingFee', terminalFee = '$terminalFee', warehouseFee = '$warehouseFee', processedBy = '$processedBy', issueDate = '$issueDate', returnDate = '$returnDate', fsNo = '$fsNo', status='$status' WHERE no=$no";
    if ($conn->query($sql) === TRUE) {
        echo $arrData;
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
    $conn->close();
}
