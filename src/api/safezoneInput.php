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

    $awb = htmlspecialchars(preg_replace("/\r?\n/", "\\n", addslashes($data['awb'])));
    $aed = htmlspecialchars(preg_replace("/\r?\n/", "\\n", addslashes($data['aed'])));
    $rate = htmlspecialchars(preg_replace("/\r?\n/", "\\n", addslashes($data['rate'])));
    $etb = htmlspecialchars(preg_replace("/\r?\n/", "\\n", addslashes($data['etb'])));
    $withholding = htmlspecialchars(preg_replace("/\r?\n/", "\\n", addslashes($data['withholding'])));
    $issueDate = htmlspecialchars(preg_replace("/\r?\n/", "\\n", addslashes($data['issueDate'])));
    $paymentDate = htmlspecialchars(preg_replace("/\r?\n/", "\\n", addslashes($data['paymentDate'])));
    $status = htmlspecialchars(preg_replace("/\r?\n/", "\\n", addslashes($data['status'])));

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    if ($awb) {
        $sql = "INSERT INTO safezone (issueDate, awb, aed, rate, etb, paymentDate, withholding, status)
        VALUES ('$issueDate', '$awb', '$aed', '$rate', '$etb', '$paymentDate', '$withholding', '$status')";

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
