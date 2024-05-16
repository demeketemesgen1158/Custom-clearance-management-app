<?php
$servername = "localhost";
$username = "your_user_name";
$password = "your_password";
$dbname = "maflinkcom_iccs";

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
header("Content-type:application/json");
header("Access-Control-Allow-Credentials: true");

//create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

//check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
$sql = "SELECT * FROM datatable ORDER BY no DESC";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {

    echo "[";
    $fakeId = 0;
    while ($row = mysqli_fetch_assoc($result)) {
        $data = new stdClass();
        $fakeData = new stdClass();
        $no = "no";
        $name = "name";
        $phone = "phoneNumber";
        $awb = "awb";
        $weight = "weight";
        $item = "item";
        $processingFee = "processingFee";
        $terminalFee = "terminalFee";
        $warehouseFee = "warehouseFee";
        $processedBy = "processedBy";
        $issueDate = "issueDate";
        $returnDate = "returnDate";
        $payment = "payment";
        $fsNo = "fsNo";
        $status = "status";

        $data->$no = $row['no'];
        $data->$name = ucwords(strtolower($row['name']));
        $data->$phone = $row["phoneNumber"];
        $data->$awb = $row['awb'];
        $data->$weight = $row['weight'];
        $data->$item = $row['item'];
        $data->$processingFee = $row['processingFee'];
        $data->$terminalFee = $row['terminalFee'];
        $data->$warehouseFee = $row['warehouseFee'];
        $data->$processedBy = ucwords(strtolower($row['processedBy']));
        $data->$issueDate = $row['issueDate'];
        $data->$payment = $row['payment'];
        $data->$returnDate = $row['returnDate'];
        $data->$fsNo = $row['fsNo'];
        $data->$status = $row['status'];

        $data = json_encode($data);
        echo $data . ",";
    }
    echo "{}";
    echo "]";
} else {
    echo "No results found";
}
mysqli_close($conn);
