<?php
$to = "andrbrezh@mail.ru"; // емайл получателя данных из формы
$tema = "Форма обратной связи"; // тема полученного емайла
$message .= "Имя: ".$_POST['name']."<br>"; //полученное из формы name=email
$message .= "Номер телефона: ".$_POST['tel']."<br>"; //полученное из формы name=phone

$headers  = 'MIME-Version: 1.0' . "\r\n"; // заголовок соответствует формату плюс символ перевода строки
  $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n"; // указывает на тип посылаемого контента
// mail($to, $tema, $message, $headers); //отправляет получателю на емайл значения переменных
if (mail($to, $tema, $message, $headers)){
    echo "Сообщение успешно отправлено";
    } else {
    echo "При отправке сообщения возникли ошибки";
    }
?>