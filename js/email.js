(function() {
    // Initialize EmailJS with your public key
    // You can find this in the EmailJS dashboard: https://dashboard.emailjs.com/admin/account
    emailjs.init({
      publicKey: "YOUR_PUBLIC_KEY", // Replace with your actual public key
    });
})();

document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent page reload

            // Replace these IDs with your actual Service ID and Template ID from EmailJS
            const serviceID = 'YOUR_SERVICE_ID';
            const templateID = 'YOUR_TEMPLATE_ID';

            // Change button text to indicate sending
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerText;
            submitButton.innerText = 'Sending...';
            submitButton.disabled = true;

            // Send the form using EmailJS
            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    alert('Message sent successfully!');
                    contactForm.reset();
                    submitButton.innerText = originalButtonText;
                    submitButton.disabled = false;
                }, (error) => {
                    alert('Failed to send the message. Error: ' + JSON.stringify(error));
                    submitButton.innerText = originalButtonText;
                    submitButton.disabled = false;
                });
        });
    }
});
