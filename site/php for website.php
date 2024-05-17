<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $data = json_decode(file_get_contents('php://input'), true);
  $name = $data['name'];
  $email = $data['email'];
  $certificate = $data['certificate'];

  $to = $email;
  $subject = 'Your Space Program Certificate';
  $message = 'Hello ' . $name . ",\n\nAttached is your certificate of participation in the Space Program.";
  $headers = "From: your-email@example.com\r\n";
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .= "Content-Type: multipart/mixed; boundary=\"boundary\"\r\n";

  $attachment = chunk_split(base64_encode(file_get_contents($certificate)));
  
  $body = "--boundary\r\n";
  $body .= "Content-Type: text/plain; charset=ISO-8859-1\r\n";
  $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
  $body .= $message . "\r\n";
  $body .= "--boundary\r\n";
  $body .= "Content-Type: image/png; name=\"certificate.png\"\r\n";
  $body .= "Content-Transfer-Encoding: base64\r\n";
  $body .= "Content-Disposition: attachment; filename=\"certificate.png\"\r\n\r\n";
  $body .= $attachment . "\r\n";
  $body .= "--boundary--";

  if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true]);
  } else {
    echo json_encode(['success' => false]);
  }
}
?>
