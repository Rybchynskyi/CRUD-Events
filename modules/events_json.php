<?php
include 'dbconnect.php';

$result = $pdo->query("SELECT id, name, descr, place, date AS `datetime`, DATE_FORMAT( `date` , '%c-%e' ) AS `date`, DATE_FORMAT( `date` , '%e %M' ) AS `date-full`, category  FROM `events` ORDER BY datetime DESC ")->fetchAll();
echo json_encode($result);
