<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim(filter_var($_POST['name'] ?? '', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
    $email = trim($_POST['email'] ?? '');
    $subject = trim(filter_var($_POST['subject'] ?? '', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
    $message = trim(filter_var($_POST['message'] ?? '', FILTER_SANITIZE_FULL_SPECIAL_CHARS));

    $to = 'theprimates.studio@gmail.com';
    // si no tienes dominio, usa una cuenta de email que controles (ej. tu Gmail)
    $from = 'theprimates.studio@gmail.com';
    $headers = "From: Primate Studio <$from>\r\n";
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $headers .= "Reply-To: $email\r\n";
    }
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $email_body = "You have received a new message from $name.\n\n".
                  "Subject: $subject\n\n".
                  "Message:\n$message";

    if (mail($to, $subject ?: 'Contact form', $email_body, $headers)) {
        echo json_encode(['success' => true, 'message' => 'Message sent successfully!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to send message.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>