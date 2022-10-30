<?php include 'modules/create_calendar.php' ?>
<!doctype html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>BusinessSreda Task</title>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@100;200;300;400;600&display=swap" rel="stylesheet">
</head>
<body>
<div class="container">
    <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container-fluid d-flex justify-content-between align-items-center">
            <a class="navbar-brand" href="#"><b>LOGO</b></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Переключатель навигации">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="#">Main</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="#">Events</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Calendar</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="#">FAQ</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="row">
        <h2>Calendar</h2>
    </div>
    <div class="row my-3">
        <div class="col-sm">
            <button id="allCategories" class="events transparent">All</button>
            <button id="redCategories" class="events red">Meeting with an expert</button>
            <button id="greenCategories" class="events green">Question-answer</button>
            <button id="yellowCategories" class="events yellow">Conference</button>
            <button id="blueCategories" class="events blue">Webinar</button>
        </div>
    </div>
    <div class="row calendars">
        <?php
        createCalendar(7,5, 31);
        createCalendar(8, 1, 31);
        createCalendar(9,4, 30);

        createCalendar(10, 6, 31);
        createCalendar(11, 2, 30);
        createCalendar(12, 4, 31);
        ?>
    </div>
</div>

<div class="footer">
    <div class="row">
        <div class="col-sm text-center mt-3">
            <h2>LOGO</h2>
        </div>
    </div>
    <div class="d-flex justify-content-center footerContent my-1">
        <span>Main</span>
        <span>Events</span>
        <span>Calendar</span>
        <span>FAQ</span>
    </div>
    <div class="d-flex justify-content-center allRights my-3">
        <span>© 2022 All rights reserved</span>
    </div>
</div>

<!--Slider with event-->
<?php include 'view/event_slider.php' ?>

<!--Modal for adding new event-->
<?php include 'view/popup_add.php' ?>
<?php include 'view/popup_edit.php' ?>
<?php include 'view/popup_delete.php' ?>

<script src="js/bootstrap.bundle.min.js"></script>
<script src="js/show_events.js"></script>
</body>
</html>