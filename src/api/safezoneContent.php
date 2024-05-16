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
$sql = "SELECT * FROM safezone ORDER BY no DESC";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {

    echo "[";
    $fakeId = 0;
    while ($row = mysqli_fetch_assoc($result)) {
        $data = new stdClass();
        $fakeData = new stdClass();
        $no = "no";
        $issueDate = "issueDate";
        $awb = "awb";
        $aed = "aed";
        $rate = "rate";
        $etb = "etb";
        $paymentDate = "paymentDate";
        $withholding = "withholding";
        $status = "status";

        $data->$no = $row['no'];
        $data->$issueDate = $row['issueDate'];
        $data->$awb = $row["awb"];
        $data->$aed = $row['aed'];
        $data->$rate = $row['rate'];
        $data->$etb = $row['etb'];
        $data->$paymentDate = $row['paymentDate'];
        $data->$withholding = $row['withholding'];
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
