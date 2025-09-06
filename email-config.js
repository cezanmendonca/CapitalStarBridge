// EmailJS Configuration
const emailConfig = {
    SERVICE_ID: 'service_gmail_capital12',
    TEMPLATE_ID: 'template_capital12',
    PUBLIC_KEY: 'k2wOEJImbyOo1pLPH'
};

// Initialize EmailJS
(function initializeEmailJS() {
    try {
        emailjs.init(emailConfig.PUBLIC_KEY);
        console.log('EmailJS initialized successfully');
    } catch (error) {
        console.error('EmailJS initialization failed:', error);
    }
})();

// Function to send email
function sendEmail(formData) {
    console.log('Sending email with data:', formData);
    
    return emailjs.send(
        emailConfig.SERVICE_ID, 
        emailConfig.TEMPLATE_ID, 
        {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || 'Not provided',
            service: formData.service || 'Not specified',
            message: formData.message
        }
    ).then(
        function(response) {
            console.log('Email sent successfully:', response);
            return response;
        },
        function(error) {
            console.error('Email sending failed:', error);
            throw error;
        }
    );
}
