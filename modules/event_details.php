<?php
$date = $_GET['date'];
$fullDate = DateTime::createFromFormat('n-j', $date)->format('Y-m-d');

include 'dbconnect.php';

$result = $pdo->query("SELECT * FROM `events` WHERE DATE(`date`) = '$fullDate' ORDER BY id DESC ")->fetchAll();
echo json_encode($result);
