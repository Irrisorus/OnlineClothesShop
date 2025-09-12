document.addEventListener('DOMContentLoaded', () => {
    const verificationContainer = document.getElementById('verificationInputs');
    const verification = new VerificationInput(verificationContainer);
    const timer = new ResendTimer();
    
    timer.start();
});