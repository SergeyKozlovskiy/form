<?php 
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru','phpmailer/language/');
$mail->isHTML(true); 

//от кого письмо
$mail->setFrom('zavulon31990@mail.ru', 'тест');
//кому отправить
$mail->addAddress('jilel75840@hafutv.com'); 
//Тема письма
$mail->Subject = 'Сообщение с сайта';

//Рука
$hand = 'Правая';
if($_POST['hand'] == 'left'){
    $hand = 'Левая';
}
//Тело письма
$body = '<h1>Новое письмо!</h1>';
$body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
$body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
$body.='<p><strong>Рука:</strong> '.$hand.'</p>';
$body.='<p><strong>Возраст:</strong> '.$_POST['age'].'</p>';
$body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';

//Прикрепить файл тут

$mail->Body = $body;

//Отправляем
if(!$mail->send()){
    $message = 'Ошибка';
}else{
    $message = 'Данные отправлены!';
}

$response = ['message' => $message];
 header('Content-type: application/json');
 echo json_encode($response);
 ?>





