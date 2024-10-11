<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $companySite = $_POST['companySite'];
    $phone = $_POST['phone'];

    if (!empty($name) && !empty($companySite) && !empty($phone)) {
        $logData = "Имя: $name, Сайт компании: $companySite, Телефон: $phone\n";
        $logFile = 'logs/form-submissions.log';

        file_put_contents($logFile, $logData, FILE_APPEND | LOCK_EX);
        echo json_encode(['status' => 'success', 'message' => 'Данные успешно сохранены.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Заполните все поля!']);
    }
}
?>
