// EmailJS Configuration
// Replace these values with your actual EmailJS credentials
const emailConfig = {
    SERVICE_ID: 'service_gmail_capital12',
    TEMPLATE_ID: 'template_capital12',
    PUBLIC_KEY: 'k2wOEJImbyOo1pLPH'
};

// Initialize EmailJS
emailjs.init(emailConfig.PUBLIC_KEY);

// Function to send email
function sendEmail(formData) {
    return emailjs.send(
        emailConfig.SERVICE_ID, 
        emailConfig.TEMPLATE_ID, 
        {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            service: formData.service,
            message: formData.message,
            to_email: 'capitalstarbridge@gmail.com'
        }
    );
}