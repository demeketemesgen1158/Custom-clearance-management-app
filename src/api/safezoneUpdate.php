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
    $issueDate = htmlspecialchars(preg_replace("/\r?\n/", "\\n", addslashes($data['issueDate'])));
    $awb = htmlspecialchars(preg_replace("/\r?\n/", "\\n", addslashes($data['awb'])));
    $aed = htmlspecialchars(preg_replace("/\r?\n/", "\\n", addslashes($data['aed'])));
    $rate = htmlspecialchars(preg_replace("/\r?\n/", "\\n", addslashes($data['rate'])));
    $etb = htmlspecialchars(preg_replace("/\r?\n/", "\\n", addslashes($data['etb'])));
    $paymentDate = htmlspecialchars(preg_replace("/\r?\n/", "\\n", addslashes($data['paymentDate'])));
    $withholding = htmlspecialchars(preg_replace("/\r?\n/", "\\n", addslashes($data['withholding'])));
    $status = htmlspecialchars(preg_replace("/\r?\n/", "\\n", addslashes($data['status'])));

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $sql = "UPDATE safezone SET issueDate='$issueDate', awb='$awb', aed = '$aed', rate = '$rate', etb = '$etb', paymentDate = '$paymentDate', withholding = '$withholding', status = '$status' WHERE no=$no";
    if ($conn->query($sql) === TRUE) {
        echo $arrData;
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
    $conn->close();
}
