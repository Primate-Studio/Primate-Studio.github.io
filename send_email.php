<?php
require 'vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    exit;
}

$name = trim(filter_var($_POST['name'] ?? '', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
$email = trim($_POST['email'] ?? '');
$subject = trim(filter_var($_POST['subject'] ?? '', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
$message = trim(filter_var($_POST['message'] ?? '', FILTER_SANITIZE_FULL_SPECIAL_CHARS));

$to = getenv('RECIPIENT_EMAIL') ?: 'theprimates.studio@gmail.com';
$email_body = "You have received a new message from $name.\n\nSubject: $subject\n\nMessage:\n$message";

$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host = getenv('SMTP_HOST') ?: 'smtp.sendgrid.net';
    $mail->SMTPAuth = true;

    // Leer credenciales desde variables de entorno (no usar valores hardcodeados)
    $smtpUser   = getenv('SMTP_USER') ?: 'apikey'; // para SendGrid dejar "apikey"
    $smtpPass   = getenv('SMTP_PASS') ?: null;     // la API key o contraseña SMTP
    $senderEmail = getenv('SENDER_EMAIL') ?: null; // remitente verificado en SendGrid

    if (!$smtpPass || !$senderEmail) {
        echo json_encode([
            'success' => false,
            'message' => 'Missing SMTP configuration. Set SMTP_PASS and SENDER_EMAIL environment variables.'
        ]);
        exit;
    }

    $mail->Username = $smtpUser;
    $mail->Password = $smtpPass;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = intval(getenv('SMTP_PORT') ?: 587);

    $mail->CharSet = 'UTF-8';
    $mail->setFrom($senderEmail, 'Primate Studio'); // debe ser remitente verificado en SendGrid
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $mail->addReplyTo($email);
    }
    $mail->addAddress($to);

    $mail->Subject = $subject ?: 'Contact form';
    $mail->Body = $email_body;
    $mail->AltBody = $email_body;
    $mail->isHTML(false);

    $mail->send();
    echo json_encode(['success' => true, 'message' => 'Message sent successfully!']);
} catch (Exception $e) {
    $err = $e->getMessage();
    $info = $mail->ErrorInfo ?? '';
    echo json_encode(['success' => false, 'message' => 'Mailer Error: ' . ($err ?: $info)]);
}
?>