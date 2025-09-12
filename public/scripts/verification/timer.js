class ResendTimer {
    constructor(duration = 60) {
        this.duration = duration;
        this.remainingTime = duration;
        this.timerElement = document.getElementById('seconds');
        this.timerContainer = document.getElementById('timer');
        this.resendButton = document.getElementById('resendButton');
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.resendButton.addEventListener('click', () => this.handleResend());
    }

    start() {
        this.remainingTime = this.duration;
        this.timerContainer.classList.remove('hidden');
        this.resendButton.classList.add('hidden');
        
        this.interval = setInterval(() => {
            this.remainingTime--;
            this.timerElement.textContent = this.remainingTime;
            
            if (this.remainingTime <= 0) {
                this.stop();
            }
        }, 1000);
    }

    stop() {
        clearInterval(this.interval);
        this.timerContainer.classList.add('hidden');
        this.resendButton.classList.remove('hidden');
    }

    handleResend() {
        this.start();
    }
}