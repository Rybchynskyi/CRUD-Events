<?php
include 'dbconnect.php';

$eventName = htmlspecialchars($_POST['eventName']);
$eventDescr = htmlspecialchars($_POST['eventDescr']);
$eventLocation = htmlspecialchars($_POST['eventLocation']);
$eventDate = htmlspecialchars($_POST['eventDate']);
$eventTime = htmlspecialchars($_POST['eventTime']);
$eventType = htmlspecialchars($_POST['eventType']);

$eventDateTime = "22-". $eventDate . " " . $eventTime;

$sql_new_event = "INSERT INTO `events` (
                      `id`,
                      `name`,
                      `descr`,
                      `place`,
                      `date`,
                      `category`)
              VALUES (
                      NULL,
                      '$eventName',
                      '$eventDescr',
                      '$eventLocation',
                      '$eventDateTime',
                      '$eventType')";

$count = $pdo->query($sql_new_event);
if ($count==true) {
    header('Location: ../index.php?info=addSuccess');
}
else {
    header('Location: ../index.php?info=addWrong');
}
