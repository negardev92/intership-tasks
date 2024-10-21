const inputUser = document.getElementById("uname");
const inputPas = document.getElementById("psw");
const btnSubmit = document.getElementById("submitbtn");
const btnSignIn = document.getElementById("singin");
const forgotPasswordLink = document.getElementById("forgotPassword");

function validateInputs() {
    const username = inputUser.value;
    const password = inputPas.value;
    const usernamePattern = /^[a-zA-Z0-9]{3,}$/;
    const passwordPattern = /^(?=.*\d)[A-Za-z\d]{6,}$/;
    inputUser.style.border = "";
    inputPas.style.border = "";


    if (!usernamePattern.test(username)) {
        inputUser.style.border = "2px solid red";
        alert("نام کاربری باید حداقل 3 کاراکتر و فقط شامل حروف و اعداد باشد.");     
    }                                                                    

    if (!passwordPattern.test(password)) {
        inputPas.style.border = "2px solid red";
        alert("رمز عبور باید حداقل 6 کاراکتر و شامل حداقل یک عدد باشد.");
        return false;
    }

    return true;
}
btnSubmit.addEventListener("click", function(e) {
    e.preventDefault();
    const username = inputUser.value;
    const password = inputPas.value;

    
    if (validateInputs()) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
            
    const foundUser = users.find(user => user.username === username && user.password === password);
    
    if (foundUser) {
        alert(`خوش آمدید ${foundUser.username}!`);
        window.location.href = "welcome.html"; 
    } else {
        alert('نام کاربری یا رمز عبور نادرست است.');
    }
       
    }
});


btnSignIn.addEventListener("click",function(e){
    e.preventDefault();
    window.location.href = "singin.html";
});


forgotPasswordLink.addEventListener("click", function(e) {
    e.preventDefault();
    alert("لطفاً با پشتیبانی تماس بگیرید تا رمز عبور خود را بازیابی کنید.");
});