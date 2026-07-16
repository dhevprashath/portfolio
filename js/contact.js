document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    
    if(!contactForm) return;

    // Initialize EmailJS (Replace with your actual public key)
    // emailjs.init("YOUR_PUBLIC_KEY");

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const originalText = btnText.textContent;
        
        // Disable button & show loading state
        submitBtn.disabled = true;
        btnText.textContent = "Sending...";
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Mock submission since no keys are provided
        // In production, use: emailjs.send("SERVICE_ID", "TEMPLATE_ID", templateParams)
        setTimeout(() => {
            // Success animation
            btnText.textContent = "Sent Successfully!";
            submitBtn.style.backgroundColor = "var(--accent-electric-blue)";
            submitBtn.style.color = "var(--bg-primary)";
            
            // Reset form
            this.reset();
            
            // Revert button after 3 seconds
            setTimeout(() => {
                submitBtn.disabled = false;
                btnText.textContent = originalText;
                submitBtn.style.backgroundColor = "";
                submitBtn.style.color = "";
            }, 3000);
            
        }, 1500);
        
        /* 
        // Actual EmailJS Code Example
        emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
            from_name: name,
            reply_to: email,
            message: message
        }).then(
            (response) => {
                btnText.textContent = "Sent Successfully!";
                submitBtn.style.backgroundColor = "var(--accent-electric-blue)";
                submitBtn.style.color = "var(--bg-primary)";
                contactForm.reset();
                setTimeout(() => {
                    submitBtn.disabled = false;
                    btnText.textContent = originalText;
                    submitBtn.style.backgroundColor = "";
                    submitBtn.style.color = "";
                }, 3000);
            },
            (error) => {
                btnText.textContent = "Failed to send";
                submitBtn.style.backgroundColor = "#ff3333";
                setTimeout(() => {
                    submitBtn.disabled = false;
                    btnText.textContent = originalText;
                    submitBtn.style.backgroundColor = "";
                }, 3000);
            }
        );
        */
    });
});
