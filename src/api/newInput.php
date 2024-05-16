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

    // $fName = $data['fullNyame'];
    // $phoneNumber = $data['phoneNumber'];
    // $awb = $data['awb'];
    // $weight = $data['weight'];
    // $item = $data['item'];
    // $processingFee = $data['processingFee'];
    // $terminalFee = $data['terminalFee'];
    // $warehouseFee = $data['warehouseFee'];
    // $processedBy = $data['processedBy'];
    // $issueDate = $data['issueDate'];
    // $returnDate = $data['returnDate'];
    // $payment = $data['payment'];
    // $fsNo = $data['fsNo'];
    // $status = "Received";

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
    $status = "Delivered";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    if ($fName) {
        $sql = "INSERT INTO datatable (name, phoneNumber, awb, weight, item, processingFee, terminalFee, warehouseFee, processedBy, issueDate, returnDate, fsNo, status)
        VALUES ('$fName', '$phoneNumber', '$awb', '$weight', '$item', '$processingFee', '$terminalFee', '$warehouseFee', '$processedBy', '$issueDate', '$returnDate', '$fsNo', '$status')";

        if ($conn->query($sql) === TRUE) {
            echo $arrData;
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
        $conn->close();
    } else {
        echo "Full name is required";
    }
} else {
    echo "Access denied";
}
