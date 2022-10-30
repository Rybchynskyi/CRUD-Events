<?php
include 'dbconnect.php';

$events = $pdo->query("SELECT DISTINCT DATE_FORMAT( `date` , '%c-%e' ) AS `date`, category FROM `events`")->fetchAll();
echo json_encode($events);
