<?php
    $host = 'localhost';
    $db = 'bSreda';
    $user = 'root';
    $pass = 'root';
    $charset = 'UTF8MB4';

    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $options = array(
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    );
    $pdo = new PDO($dsn, $user, $pass, $options);