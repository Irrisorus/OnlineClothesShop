const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');
const resendButton = document.getElementById('resendButton');
class VerificationInput {
    constructor(container) {
        this.container = container;
        this.inputs = Array.from(container.getElementsByTagName('input'));
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.inputs.forEach((input, index) => {
            input.addEventListener('input', (e) => this.handleInput(e, index));
            input.addEventListener('keydown', (e) => this.handleKeydown(e, index));
            input.addEventListener('paste', (e) => this.handlePaste(e));
        });
    }

    handleInput(e, index) {
        const value = e.target.value;
        
        if (value.length === 1) {
            if (!/^\d$/.test(value)) {
                e.target.value = '';
                return;
            }
            
            if (index < this.inputs.length - 1) {
                this.inputs[index + 1].focus();
            }
        }

        this.checkCompletion();
    }

    handleKeydown(e, index) {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            this.inputs[index - 1].focus();
        }
    }

    handlePaste(e) {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        
        if (!/^\d+$/.test(pastedData)) return;

        this.inputs.forEach((input, index) => {
            if (pastedData[index]) {
                input.value = pastedData[index];
            }
        });

        this.checkCompletion();
    }

    checkCompletion() {
       
        
        const code = this.getCode();
        console.log(code+" --------- verif code");
        if (code.length === 6) {
            sendCode(code)
        }
    }

    getCode() {
        return this.inputs.map(input => input.value).join('');
    }

    reset() {
        this.inputs.forEach(input => input.value = '');
       
        successMessage.classList.add('hidden');
        errorMessage.classList.add("hidden")
        this.inputs[0].focus();
    }
}


async function sendCode(code) {

    let urlEmail=getUserEmailFromURL()
    console.log(urlEmail+"------------ url email");

    const response = await fetch("/brandhouse/checkCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
            usercode:code,
            userEmail:urlEmail
        })
    })
    
    if (response.ok) {
        const data = await response.json();
        errorMessage.classList.add("hidden")
        successMessage.classList.remove('hidden');
        setTimeout(() => document.location=data.path, 1000);
        
        return;
    }
    else{
        errorMessage.classList.remove("hidden")
    }
    
    
}

function getUserEmailFromURL() {
    const url = window.location.href;
    const regex = /[?&]userEmail=([^&#]*)/;
    const match = regex.exec(url);
    return match ? decodeURIComponent(match[1]) : null;
}

resendButton.addEventListener('click',()=>{
    resendCode()
})


async function resendCode() {
    const response = await fetch("/brandhouse/resendCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
            userEmail:getUserEmailFromURL(),
        })
    })
    
    
    
}