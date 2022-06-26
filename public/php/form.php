<?php
// $_POST = json_decode(file_get_contents('php://input'), true);

// var_dump($_POST);

// $log = date('Y-m-d H:i:s') . '\n' . print_r($_POST, true);
// file_put_contents(__DIR__ . '/log.txt', $log . PHP_EOL, FILE_APPEND);

// $test = "test";
// $log = date('Y-m-d H:i:s') . '\n' . print_r($test, true);
// file_put_contents(__DIR__ . '/log.txt', $log . PHP_EOL, FILE_APPEND);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once $_SERVER['DOCUMENT_ROOT'] . '/php/PHPMailer/src/Exception.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/php/PHPMailer/src/PHPMailer.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/php/PHPMailer/src/SMTP.php';

// $inputJSON = file_get_contents('php://input');
// $input = json_decode($inputJSON, TRUE);



$name = "не определено";
$phone = "не определен";
$email = "не определен";
$address = "не определен";
$comment = "не определен";
$cartSum = "не определен";
$cart = "не определен";


if (isset($_POST["name"])) $name = $_POST["name"];
if (isset($_POST["phone"])) $phone = $_POST["phone"];
if (isset($_POST["email"])) $email = $_POST["email"];
if (isset($_POST["address"])) $address = $_POST["address"];
if (isset($_POST["comment"])) $comment = $_POST["comment"];
if (isset($_POST["cartSum"])) $cartSum = $_POST["cartSum"];
if (isset($_POST["cart"])) $cart = $_POST["cart"];


// // echo $name;
// // echo $phone;
// // echo $email;
// // echo $address;
// // echo $comment;
// // echo $cart;





$mail = new PHPMailer;
$mail->CharSet = 'UTF-8';

// Настройки SMTP
$mail->isSMTP();
$mail->SMTPAuth = true;
$mail->SMTPDebug = 0;

$mail->SMTPOptions = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);

$mail->Host = 'ssl://smtp.yandex.ru';
$mail->Port = 465;
$mail->Username = 'codekeepers.studio@yandex.ru';
$mail->Password = 'BZWD5ZAH^biz*51A';

// От кого
$mail->setFrom('codekeepers.studio@yandex.ru', 'Интернет-магазин часов Attache');

// Кому
$mail->addAddress('aigulaidarovna@mail.ru', 'Айгуль Матвеева');

// Тема письма
$mail->Subject = "Новый заказ в интернет-магазине Attache";

// Тело письма
$body = '<p><strong>Новый заказ в интернет-магазине Attache</strong></p>';

$body = $body . "<br>Имя: " . $name;
$body = $body . "<br>Телефон: " . $phone;
$body = $body . "<br>e-mail: " . $email;
$body = $body . "<br>Адрес: " . $address;
$body = $body . "<br>Комментарии: " . $comment;
$body = $body . "<br>Сумма заказа: " . $cartSum;
$body = $body . "<br>Корзина:";
$body = $body . "<br>" . $cart;

$mail->msgHTML($body);

$mail->send();

header("Location: /order-success");
die();
// echo "hello";
//Отправка сообщения
// if (!$mail->send()) {
//     echo 'Ошибка при отправке. Ошибка: ' . $mail->ErrorInfo;
// } else {
//     echo 'Сообщение успешно отправлено';
// }
