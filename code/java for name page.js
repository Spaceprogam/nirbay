document.getElementById('nameForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  
  // Show certificate
  document.getElementById('certName').textContent = name;
  document.getElementById('certificate').style.display = 'block';

  // Generate certificate as an image (this is a simplified approach)
  html2canvas(document.getElementById('certificate')).then(function(canvas) {
    var dataURL = canvas.toDataURL('image/png');
    
    // Send email with the certificate (you need a backend for this)
    fetch('send_email.php', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        email: email,
        certificate: dataURL
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Certificate sent to your email!');
      } else {
        alert('There was an error sending the email.');
      }
    });
  });
});
