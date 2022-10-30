<?php
include 'dbconnect.php';
$sqlDots = $pdo->query('SELECT * FROM `events` ORDER BY id ASC ')->fetchAll();

function createCalendar ($monthNumber, $prevDays, $days) {
    $monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    $monthName = $monthNames[$monthNumber - 1];
    include 'dbconnect.php';

    //    First row
    echo '<div class="col-md-4 col-sm-6 py-2 calendarBorder">
            <table class="calendar">
                <tr>
                    <td class="monthContainer" colspan="7">
                        <div class="calendarName text-start my-2">' . $monthName . '</div>
                    </td>
                </tr>
                <tr class="weekDays">
                    <th>Sun</th>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                </tr>
                ';

    //    Second row
    echo '<tr>';
    for ($fd = (32 - $prevDays); $fd<=31; $fd++) {
        echo '<td class="inactive">'. $fd .'</td>';
    }
    for ($d = 1; $d<=(7-$prevDays); $d++) {
        echo '<td data-date="' . $monthNumber . '-' . $d . '">' . $d . '<div class="dotsContainer d-flex justify-content-center">';
        echo '</div></td>';
    }
    echo '</tr>';

    //    other rows
    for ($od = (7-$prevDays+1); $od<=31; $od=($od+7)) {
        echo '<tr>';
        $daysEnd = 1;
        for ($i=0; $i<7; $i++)
            if (($od+$i)<=$days) {
                echo '<td data-date="' . $monthNumber . '-' . ($od + $i) . '">' . ($od + $i) . '<div class="dotsContainer d-flex justify-content-center">';
                echo '</div></td>';
            }
            else {
                echo '<td class="inactive">'. $daysEnd .'</td>';
                $daysEnd++;
            }
        }
    echo '</tr>';
    echo '</table></div>';
}

?>
